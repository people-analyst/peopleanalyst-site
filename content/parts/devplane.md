# DevPlane — Reusable Engineering Patterns

Production-validated patterns from the devplane codebase, stripped of business context, written to be dropped into any new system.

Each pattern is **copy-paste-ready TypeScript**. Domain-specific terminology has been removed. Citations at the bottom of each entry point to the concrete implementation in this repo.

---

## Pattern Index

| # | Pattern Name | Core Technology | Problem Solved |
|---|---|---|---|
| P01 | Load–Modify–Save State File | Node fs + JSON | Persist small aggregates to disk without a database |
| P02 | Server-Sent Events with Debounced Client Refresh | SSE + vanilla JS | Push server state changes to many browser tabs cheaply |
| P03 | Pull-Mode Event Source via Log Polling | child_process + interval | React to events produced by a system that has no push API |
| P04 | Discriminated-Union State Machine with Two-Phase Commit | TypeScript unions + validators | Route work items through a multi-stage lifecycle with mandatory human checkpoint |
| P05 | Validator-at-the-Boundary for Untrusted Input | Result type + narrowing | Accept structured input from untrusted actors without crashing and without leaking malformed data |
| P06 | Context-Driven Urgency Triage | Pure computation | Re-rank a to-do list by live system state instead of static priority |
| P07 | Batch with Auto-Generated Consolidation Prompt | Group metadata + template | Kick off a summarising step only when every item in a batch finishes |
| P08 | Sequential Subprocess Dispatcher with Lenient Success Heuristic | child_process.spawn + buffering | Run external CLI commands as "workers" and judge success beyond exit code |
| P09 | Runtime Provider Registry with Lazy Secret Resolution | Map + factory functions | Plug concrete OAuth / webhook / integration providers into a generic flow engine |
| P10 | Whole-Store Encrypted Credential Vault | libsodium secretbox + auto-key | Encrypt an entire small credential store at rest with zero ceremony |
| P11 | Layered .env Loading with Sensitivity Catalog | dotenv + curated metadata | Load environment from multiple directories and expose safely to a UI |
| P12 | Typed-Core + JSON-Tail Record Schema | TypeScript interfaces | Evolve persisted records without a migration system |
| P13 | Server-Rendered Page with Injected Initial State | Hono + inline `<script>` | Ship a live dashboard without a bundler or SPA framework |
| P14 | Parallel API Surfaces (REST + MCP + CLI) Over a Shared Core | Shared module imports | Expose the same capabilities to humans, agents, and scripts |
| P15 | Public-Route Allowlist in an Auth-First Middleware | Regex array + match-exit | Run an "everything protected" middleware while excepting specific public endpoints |
| P16 | File Watcher → Extractor → Queue Pipeline | fs.watch + parse + dedupe | Turn artifacts dropped in a folder into structured work items |
| P17 | Signed Webhook with Narrow Event Dispatcher | Raw-body route + signature verify | Accept events from a third party and translate to local state changes |
| P18 | Dependency-Graph Dispatch Gate | In-memory graph check | Only start work on items whose prerequisites are already done |
| P19 | Two-Phase Actor Handoff (Builder → Reviewer) | Same endpoint, different state shape | Enforce a review step by making the final transition require an artifact only the reviewer can produce |
| P20 | Long-Lived Subprocess Session Cache | Map<key, ChildProcess> | Keep an interactive CLI warm per project instead of spawning per message |

---

## Patterns

### P01. Load–Modify–Save State File

**Problem**
You need to persist small collections of domain records without running a database. The collection fits comfortably in memory, it's mutated by one process at a time, and you want the state file to be human-inspectable and portable (versionable by the user, copyable between machines).

**The Pattern**
```ts
import fs from "node:fs";
import path from "node:path";

type Record = { id: string; /* ...other fields... */ };

const statePath = (dir: string) => path.join(dir, ".state", "records.json");

function load(dir: string): Record[] {
  const file = statePath(dir);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as Record[];
  } catch {
    // Corruption fallback: never throw on read, always return a usable value.
    return [];
  }
}

function save(dir: string, records: Record[]): void {
  const file = statePath(dir);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  // Atomic write: temp + rename avoids half-written files on crash.
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(records, null, 2));
  fs.renameSync(tmp, file);
}

// Every mutation reloads first; never hold in-memory state across calls.
export function upsert(dir: string, record: Record): Record {
  const all = load(dir);
  const idx = all.findIndex((r) => r.id === record.id);
  if (idx >= 0) all[idx] = record;
  else all.push(record);
  save(dir, all);
  return record;
}
```

**Key Design Decisions**
- **Always reload before write.** Callers never cache state; they re-read on every mutation. This prevents lost writes when two sequential calls would otherwise clobber each other.
- **Atomic rename on write.** A partial write on crash would corrupt the store; writing to `.tmp` and renaming gives you all-or-nothing semantics on POSIX filesystems.
- **Read failures return empty, not throw.** Boot must not die because a state file is corrupt. Corruption is logged/visible; writes will overwrite on next mutation.
- **One JSON blob per aggregate.** Not one file per record — that invites directory-listing races and dead-file garbage. One blob keeps invariants simple.

**This Codebase**
- `src/kanban.ts` (board records), `src/actions.ts` (action queue), `src/inbox.ts`, `src/agents.ts`, `src/waves.ts`, `src/health-checks.ts`, `src/vault.ts`.
- **Known limitation:** no file lock. Two *processes* mutating the same file concurrently (e.g., server + `dp` CLI at the same instant) can lose a write. Fine for solo operation; add `proper-lockfile` or switch to SQLite if sharing.

**Tradeoffs**
| Pro | Con |
|---|---|
| Zero dependencies; zero ops | No concurrent-writer safety |
| Human-inspectable, git-diffable | Unbounded growth — no pagination |
| Portable across machines | Rewrites full file on any change (I/O cost grows with collection size) |
| No migrations needed when fields change | No query language; every read is full-table scan |

---

### P02. Server-Sent Events with Debounced Client Refresh

**Problem**
Multiple browser tabs are viewing server state that mutates from many sources (user actions, background jobs, webhooks). You want changes to appear in every tab within a second, without paying the complexity cost of WebSockets, and without hammering the server if twenty mutations land at once.

**The Pattern**
```ts
// --- Server side (Hono / Express — sketch) ---
const clients = new Set<WritableStreamDefaultWriter<Uint8Array>>();

export function handleEventStream(req: Request): Response {
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  const enc = new TextEncoder();

  clients.add(writer);
  // Keepalive: some proxies drop idle streams at 30s.
  const ping = setInterval(() => {
    writer.write(enc.encode(`: ping\n\n`)).catch(() => {});
  }, 25_000);

  req.signal.addEventListener("abort", () => {
    clearInterval(ping);
    clients.delete(writer);
    writer.close().catch(() => {});
  });

  return new Response(readable, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  });
}

// Call this after any mutation.
export function broadcast(event: string, data: unknown = {}) {
  const enc = new TextEncoder();
  const payload = enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  for (const w of clients) {
    w.write(payload).catch(() => clients.delete(w)); // prune dead clients
  }
}

// --- Client side (vanilla JS, embedded in the page) ---
const es = new EventSource("/api/events");
let t: number | undefined;
es.addEventListener("refresh", () => {
  // Debounce: multiple mutations within a tick collapse to one fetch.
  if (t) clearTimeout(t);
  t = window.setTimeout(() => reloadEverything(), 100);
});
```

**Key Design Decisions**
- **SSE, not WebSockets.** Payload is one-way (server → browser). SSE works over plain HTTP, survives CDN buffering with `cache-control: no-cache`, and auto-reconnects in the browser for free.
- **Broadcast is fire-and-forget.** No per-client delivery guarantees. A dropped event just means that client re-syncs on next event (or next refresh).
- **Keepalive every 25 seconds.** Corporate proxies and some cloud load balancers drop idle connections at 30s. Comments (`: ping\n\n`) are ignored by EventSource.
- **Client-side debounce (~100ms).** Server emits on every mutation; client collapses bursts. Cheaper than server-side batching and easier to reason about.
- **Dead-writer pruning on write failure.** No explicit disconnect handling needed — the next broadcast catches it.

**This Codebase**
- Server broadcast + `/api/events` route: `src/server.ts` (search for `broadcast(`).
- Client debounce + `reloadEverything`: inline dashboard JS in `src/server.ts`.
- **Limitation:** in-memory `clients` set. Doesn't work across multiple server instances. For failover, replace with Redis pub/sub.

**Tradeoffs**
| Pro | Con |
|---|---|
| Works over plain HTTP; survives proxies | One-way only (server → client) |
| Auto-reconnect built into the browser EventSource | Doesn't scale across instances without pub/sub |
| No library; ~20 lines of code | Every refresh re-fetches everything (no diffs) |
| Works with CDN and reverse proxies | Higher idle cost than long-polling for very large client counts |

---

### P03. Pull-Mode Event Source via Log Polling

**Problem**
You want to react to events in a system that doesn't push (git commits, file creations, external APIs without webhooks). Polling a log — git log, a filesystem, a remote endpoint — gives you retroactive detection. You must deduplicate seen events across restarts.

**The Pattern**
```ts
import { execSync } from "node:child_process";

type Tick = { seenKeys: Set<string>; lastCursor: string | null };

const state: Tick = { seenKeys: new Set(), lastCursor: null };

async function poll() {
  // Pull the "log" — commits since cursor, files newer than cursor, etc.
  const entries = fetchEntries(state.lastCursor);
  for (const entry of entries) {
    // Key combines content identity so restart doesn't re-fire.
    for (const key of extractKeys(entry)) {
      const dedupeKey = `${entry.id}:${key}`;
      if (state.seenKeys.has(dedupeKey)) continue;
      state.seenKeys.add(dedupeKey);
      try {
        await handle(entry, key);
      } catch (e) {
        // Never let a handler error crash the watcher.
        console.error("[watcher]", e);
      }
    }
  }
  state.lastCursor = advanceCursor(entries, state.lastCursor);
}

export function start(intervalMs = 8000) {
  const tick = () => poll().catch(() => {}).finally(() => setTimeout(tick, intervalMs));
  tick();
}

function fetchEntries(since: string | null): { id: string; body: string }[] {
  const arg = since ? `--since=${since}` : "-n 50";
  const out = execSync(`git log ${arg} --format='%H|%s'`).toString();
  return out.trim().split("\n").filter(Boolean).map((line) => {
    const [id, ...rest] = line.split("|");
    return { id, body: rest.join("|") };
  });
}

function extractKeys(entry: { body: string }): string[] {
  const re = /\b(ASN-\d+|TASK-\d+)\b/g;
  return [...entry.body.matchAll(re)].map((m) => m[1]);
}
```

**Key Design Decisions**
- **Dedupe key = identity + extracted token.** Same commit might reference multiple task IDs; each pair fires independently. Same pair never fires twice.
- **Cursor advances per tick, not per entry.** If a handler fails mid-tick, the next tick re-runs only the entries the dedupe set didn't cover. Cheap retry.
- **Try/catch inside the loop, not around `poll()`.** One bad entry should not skip the rest of the tick.
- **Setinterval-free scheduling.** `setTimeout` after await guarantees no overlapping ticks if a handler runs slow.

**This Codebase**
- `src/git-watcher.ts` — git log poll, extracts issue tokens, triggers completion handler.
- `src/watcher.ts` — fs.watch-based variant for session-report files (push-mode for local FS).
- **Limitation:** 8s polling latency. `seenKeys` grows unbounded over server lifetime; trim it at a known horizon (e.g., last 1000 keys).

**Tradeoffs**
| Pro | Con |
|---|---|
| Works for any system you can list-query | Latency = poll interval |
| No webhook setup or third-party plumbing | Wasted calls when nothing's happening |
| Easy to dedupe: in-memory set survives intra-session | Dedupe set unbounded; restart re-processes window |
| Handler failures isolated to one entry | Slow handler blocks subsequent entries in same tick |

---

### P04. Discriminated-Union State Machine with Two-Phase Commit

**Problem**
A work item needs to pass through several named stages — some advanced automatically, others requiring human or second-agent action. Storing status as an open string type invites typos and invalid transitions. You want invalid moves to fail at compile time and at runtime.

**The Pattern**
```ts
type Column =
  | "backlog"
  | "ready"
  | "in-progress"
  | "review"
  | "done"
  | "rework"
  | "blocked";

type Card = {
  id: string;
  column: Column;
  activity: ActivityEntry[];
};

// Valid transitions — keys lead; values are allowed next columns.
const TRANSITIONS: Record<Column, Column[]> = {
  backlog: ["ready"],
  ready: ["in-progress", "blocked"],
  "in-progress": ["review", "blocked", "rework"],
  review: ["done", "rework"],
  done: [],
  rework: ["in-progress"],
  blocked: ["ready", "rework"],
};

export function moveCard(card: Card, to: Column, reason: string): Card {
  const allowed = TRANSITIONS[card.column];
  if (!allowed.includes(to)) {
    throw new Error(`Illegal move ${card.column} → ${to}`);
  }
  return {
    ...card,
    column: to,
    activity: [...card.activity, { at: Date.now(), from: card.column, to, reason }],
  };
}

// --- Two-phase commit: "complete" is not really done until an artifact arrives. ---

type CompletionBlock =
  | { status: "complete"; commitSha: "UNCOMMITTED"; summary: string }
  | { status: "complete"; commitSha: string; summary: string }
  | { status: "partial" | "blocked"; summary: string; blockers?: string };

export function processCompletion(card: Card, block: CompletionBlock): Card {
  if (block.status === "blocked" || block.status === "partial") {
    return moveCard(card, "rework", block.summary);
  }
  // Two-phase: first complete-call parks the card in review.
  if (block.commitSha === "UNCOMMITTED") return moveCard(card, "review", block.summary);
  // Second call, from the reviewer, supplies a real SHA → card finishes.
  return moveCard(card, "done", `commit=${block.commitSha}`);
}
```

**Key Design Decisions**
- **Discriminated union for status**, not string. TypeScript catches `"doen"` at compile time.
- **Transition table is data, not code.** One object defines what's legal; `moveCard` enforces it. Adding a new column + edges is one object mutation.
- **Two-phase commit on the "final" transition.** Going to `done` requires a non-sentinel SHA — an artifact that only a second actor (reviewer) can produce. This makes human/second-agent review structurally mandatory, not a convention.
- **Activity log is append-only.** Every transition logs `from → to` plus reason. Log never needs to be mutated.

**This Codebase**
- `src/kanban.ts` — column union + `moveCard`.
- `src/completion.ts:processCompletionBlock` — two-phase commit around `status=complete` with `commit_sha=UNCOMMITTED` sentinel.
- **Limitation:** activity log grows unbounded per card. Archival needed at scale.

**Tradeoffs**
| Pro | Con |
|---|---|
| Invalid transitions fail at compile and runtime | Verbose transition table |
| Two-phase commit enforces review without a workflow engine | Two network calls per completion |
| Audit trail free via append-only log | Log grows; no built-in archival |
| Status changes always explicit | Transitions are hard-coded; config-driven flows need a step up |

---

### P05. Validator-at-the-Boundary for Untrusted Input

**Problem**
A structured blob arrives from an untrusted actor (agent, webhook, CLI user). If you `JSON.parse` and trust it, a single missing or mistyped field can corrupt persistent state. You want one validator that runs at every entry point and returns an explicit success-or-error value — never throws, never leaks partial data.

**The Pattern**
```ts
export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

type FollowUp =
  | { type: "manual_action"; description: string }
  | { type: "new_assignment"; id: string }
  | { type: "verify"; command: string };

export type Block = {
  id: string;
  status: "complete" | "partial" | "blocked";
  commitSha: string;
  summary: string;
  followUp: FollowUp[];
};

export function validateBlock(raw: unknown): Result<Block> {
  if (typeof raw !== "object" || raw === null) return { ok: false, error: "expected object" };
  const b = raw as Record<string, unknown>;

  if (typeof b.id !== "string") return { ok: false, error: "id must be string" };
  if (!["complete", "partial", "blocked"].includes(b.status as string))
    return { ok: false, error: "invalid status" };
  if (typeof b.commitSha !== "string") return { ok: false, error: "commitSha required" };
  if (typeof b.summary !== "string") return { ok: false, error: "summary required" };

  // followUp is optional. Filter in — don't throw out the whole block for one bad item.
  const followUp: FollowUp[] = Array.isArray(b.followUp) ? b.followUp.flatMap(coerceFollowUp) : [];

  return {
    ok: true,
    value: {
      id: b.id,
      status: b.status as Block["status"],
      commitSha: b.commitSha,
      summary: b.summary,
      followUp,
    },
  };
}

function coerceFollowUp(x: unknown): FollowUp[] {
  if (typeof x !== "object" || x === null) return [];
  const f = x as Record<string, unknown>;
  switch (f.type) {
    case "manual_action":
      return typeof f.description === "string" ? [{ type: "manual_action", description: f.description }] : [];
    case "new_assignment":
      return typeof f.id === "string" ? [{ type: "new_assignment", id: f.id }] : [];
    case "verify":
      return typeof f.command === "string" ? [{ type: "verify", command: f.command }] : [];
    default:
      return [];
  }
}
```

**Key Design Decisions**
- **Result type, not exceptions.** Callers can't forget to handle validation failures; there's no implicit crash path.
- **Validate at every ingress.** Same validator is called from HTTP route, CLI, and MCP tool — one source of truth for the schema.
- **Filter-in, don't reject-whole.** A bad follow-up item gets dropped; the rest of the block still commits. This is usually what you want: partial success over total rejection.
- **No external library.** Zod/io-ts are great, but for a stable schema you own, hand-written validators are readable and dependency-free.

**This Codebase**
- `src/completion.ts:validateCompletionBlock` with the full shape (migrations_staged, env_vars_needed, blockers, etc.).
- Called from: `/api/completion/log`, `/api/agent/completion/log`, MCP `devplane_log_completion`, `/api/completion/parse-session-report`, git-watcher fallback.
- **Limitation:** error messages are strings, not structured. For a public API, return `{ path, reason }` pairs.

**Tradeoffs**
| Pro | Con |
|---|---|
| Zero dependencies; TypeScript-native | Hand-maintained — schema drift possible |
| Errors are explicit Result objects | Verbose compared to Zod |
| One validator, many call sites | No automatic JSON schema export (unless you write it) |
| Partial success is possible | Harder to diff schema across versions |

---

### P06. Context-Driven Urgency Triage

**Problem**
You have a list of action items, each with a title, category, and age. Sorting by priority field alone ignores reality: a migration item is moot if the migration has already been applied. A review item is urgent today but stale in a week. You want the sort order to reflect live system state, not author intent at creation time.

**The Pattern**
```ts
type Bucket = "now" | "today" | "this-week" | "backlog" | "stale";

type Action = {
  id: string;
  title: string;
  category: "bug" | "migration" | "review" | "follow-up" | "question" | "other";
  createdAt: number;
  status: "new" | "in-progress" | "done";
};

type Context = {
  appliedMigrationVersions: Set<string>;
  unrelatedKnownFacts: unknown; // add whatever live signals matter
};

export function triage(actions: Action[], ctx: Context): Array<Action & { bucket: Bucket; reason?: string }> {
  const now = Date.now();
  return actions
    .filter((a) => a.status !== "done")
    .map((a) => classify(a, ctx, now));
}

function classify(a: Action, ctx: Context, now: number): Action & { bucket: Bucket; reason?: string } {
  // Check for staleness first — don't waste a slot on a resolved item.
  if (a.category === "migration") {
    const version = /(\d{14})/.exec(a.title)?.[1];
    if (version && ctx.appliedMigrationVersions.has(version))
      return { ...a, bucket: "stale", reason: `migration ${version} already applied` };
  }

  const ageDays = (now - a.createdAt) / 86_400_000;

  if (a.category === "bug") return { ...a, bucket: "now" };
  if (a.category === "migration") return { ...a, bucket: "now" };
  if (a.category === "review" && ageDays < 2) return { ...a, bucket: "today" };
  if (ageDays < 2) return { ...a, bucket: "today" };
  if (ageDays < 7) return { ...a, bucket: "this-week" };
  return { ...a, bucket: "backlog" };
}
```

**Key Design Decisions**
- **Pure function, called on each request.** No background reclassifier to go out of date. Latency cost is linear in the list — fine for <10k items.
- **Stale detection first.** Items that no longer apply aren't just low-priority — they're off the live list. The `reason` field lets the UI explain why.
- **Thresholds hardcoded.** Tuning is an operator concern; premature config flags lead to drift. Fork the file if your domain needs different cutoffs.
- **Never delete stale items — mark them.** Deletion loses audit trail; marking lets operators see "yes, this got caught."

**This Codebase**
- `src/triage.ts`. Called live from `GET /api/triage` and the dashboard.

**Tradeoffs**
| Pro | Con |
|---|---|
| Always current — no stale ranks | Cost scales linearly per request |
| Pure function; trivial to test | Thresholds aren't per-user configurable |
| Stale reason is human-readable | Relies on titles matching a pattern for stale detection |
| Adding a new bucket is local to one file | Multiple categories with different rules accumulate conditions |

---

### P07. Batch with Auto-Generated Consolidation Prompt

**Problem**
You dispatch N pieces of related work in parallel. Each produces a separate output (session report, artifact, review). Once *all* of them complete, a downstream step should summarize across them — not before, not after each one. You want the summariser to be auto-prepared with all the metadata it needs to run without human wiring.

**The Pattern**
```ts
type ItemStatus = "pending" | "complete" | "failed";

type Batch = {
  id: string;
  createdAt: number;
  items: { id: string; status: ItemStatus; artifactRef?: string; error?: string }[];
  consolidationPrompt?: string; // generated when ready
  consolidationResult?: string; // filled by downstream worker
};

export function markItemComplete(b: Batch, itemId: string, artifactRef: string): Batch {
  const items = b.items.map((i) => (i.id === itemId ? { ...i, status: "complete" as const, artifactRef } : i));
  const next = { ...b, items };
  return maybePrepareConsolidation(next);
}

function maybePrepareConsolidation(b: Batch): Batch {
  const unfinished = b.items.filter((i) => i.status === "pending").length;
  if (unfinished > 0) return b;
  if (b.consolidationPrompt) return b; // already prepared
  return { ...b, consolidationPrompt: buildPrompt(b) };
}

function buildPrompt(b: Batch): string {
  const ok = b.items.filter((i) => i.status === "complete");
  const bad = b.items.filter((i) => i.status === "failed");
  return [
    `Batch ${b.id} finished. ${ok.length} succeeded, ${bad.length} failed.`,
    ``,
    `Succeeded artifacts:`,
    ...ok.map((i) => `- ${i.id}: ${i.artifactRef}`),
    bad.length ? `\nFailed items:\n${bad.map((i) => `- ${i.id}: ${i.error ?? "no detail"}`).join("\n")}` : "",
    ``,
    `Write one consolidated summary: key findings, cross-cutting issues, next steps.`,
  ].join("\n");
}
```

**Key Design Decisions**
- **"Ready for consolidation" is a derived state.** Not a flag you set; computed from `items` every time an item completes. Safer than tracking both.
- **Prompt is generated once, then frozen.** Enriches with all relevant refs at readiness time. Downstream worker picks it up directly.
- **Failed items included in the prompt.** Don't hide them — the summariser should mention them so the reader isn't misled.
- **No timer.** If an item stalls, the batch stalls. Add a per-batch timeout if indefinite blocking is unacceptable.

**This Codebase**
- `src/waves.ts` — wave concept: batch of assignments, `consolidationPrompt` generated when all complete.

**Tradeoffs**
| Pro | Con |
|---|---|
| Downstream worker needs no orchestration logic | A stuck item stalls the whole batch |
| Prompt snapshot captures batch state at readiness | No auto-retry on item failure |
| Simple state machine (pending → ready → summarised) | Extending beyond 1 consolidation step needs generalisation |

---

### P08. Sequential Subprocess Dispatcher with Lenient Success Heuristic

**Problem**
You want to run an external CLI tool as a worker: hand it a prompt, get output, act on success or failure. The tool's exit codes are noisy (writes to stderr during normal operation, returns non-zero for recoverable warnings). You need a success judgement that trusts meaningful stdout even when the exit code disagrees.

**The Pattern**
```ts
import { spawn } from "node:child_process";

type RunResult = { ok: boolean; stdout: string; stderr: string; exitCode: number | null };

export async function runWorker(cmd: string, args: string[], cwd: string, timeoutMs = 10 * 60_000): Promise<RunResult> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const kill = setTimeout(() => {
      child.kill("SIGTERM");
      if (!settled) {
        settled = true;
        resolve({ ok: false, stdout, stderr: stderr + "\n[timeout]", exitCode: null });
      }
    }, timeoutMs);

    child.stdout.on("data", (b) => (stdout += b.toString()));
    child.stderr.on("data", (b) => (stderr += b.toString()));
    child.on("exit", (code) => {
      clearTimeout(kill);
      if (settled) return;
      settled = true;
      // Lenient heuristic: exit 0 is success; non-zero is success if stdout is substantial.
      const ok = code === 0 || (stdout.length > 200);
      resolve({ ok, stdout, stderr, exitCode: code });
    });
  });
}

// Sequential queue: one at a time, next only after previous completes.
export async function dispatchAll<T>(items: T[], run: (t: T) => Promise<void>) {
  for (const item of items) {
    try {
      await run(item);
    } catch (e) {
      console.error("[dispatch]", e);
    }
  }
}
```

**Key Design Decisions**
- **Sequential, not parallel.** External workers may touch the same files (git, a project dir). Parallel invocations risk conflicts. Sequential is slow but safe; parallelise only when you've proven no contention.
- **Timeout is mandatory.** An interactive CLI can hang on a prompt forever. A `SIGTERM` at T+10min is a safety rail.
- **Lenient success heuristic.** A tool that writes useful output to stdout and exits non-zero is *usually* a success with warnings. Relying on exit code alone miscategorises recoverable states.
- **Buffer stdout/stderr in full.** Stream processing is complex; for short tasks, `stdout` in memory is simpler. Watch for OOM on truly long outputs.

**This Codebase**
- `src/dispatch.ts` — dispatches `claude --print` per card, sequential, 10-min timeout.
- `src/reflection.ts` — same pattern for the reflection agent.
- **Limitation:** no parallelism even when cards touch disjoint files.

**Tradeoffs**
| Pro | Con |
|---|---|
| No file-ownership contention | Slow for large queues |
| Simple exit path; easy to reason about | Stdout in memory OOMs for huge outputs |
| Lenient heuristic rescues noisy CLIs | Lenient heuristic can mis-call some real failures as successes |
| Timeout prevents indefinite hangs | Timeout length is guesswork per tool |

---

### P09. Runtime Provider Registry with Lazy Secret Resolution

**Problem**
You have a generic integration flow (OAuth, webhook signing, API calls) that works the same way for many providers (GitHub, Vercel, Supabase, your own). Each provider differs in URLs, scopes, auth method, and client secret location. You want to add a new provider without touching the flow engine.

**The Pattern**
```ts
type Provider = {
  name: string;
  authUrl: string;
  tokenUrl: string;
  scopes: string[];
  clientId: () => string | undefined; // lazy — env may load later
  clientSecret: () => string | undefined;
  pkce?: boolean;
  tokenTransform?: (raw: unknown) => Record<string, unknown>;
};

const registry = new Map<string, Provider>();

export function registerProvider(p: Provider) {
  registry.set(p.name, p);
}

export function getProvider(name: string): Provider {
  const p = registry.get(name);
  if (!p) throw new Error(`no provider: ${name}`);
  return p;
}

// Flow engine — provider-agnostic.
export async function startFlow(providerName: string, state: string): Promise<string> {
  const p = getProvider(providerName);
  const clientId = p.clientId();
  if (!clientId) throw new Error(`${providerName}: CLIENT_ID not set`);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: "https://host/callback",
    scope: p.scopes.join(" "),
    state,
    response_type: "code",
  });
  return `${p.authUrl}?${params}`;
}

// Somewhere else — concrete providers register themselves at import time.
registerProvider({
  name: "github",
  authUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  scopes: ["repo", "read:user"],
  clientId: () => process.env.GITHUB_CLIENT_ID,
  clientSecret: () => process.env.GITHUB_CLIENT_SECRET,
});
```

**Key Design Decisions**
- **Registry is a `Map`, populated at import.** New providers = new import = auto-registered. No JSON config file to maintain in parallel.
- **Client ID/secret are thunks, not values.** Env vars may load after import order is decided, and thunks also let you rotate keys without re-registering.
- **Optional hooks (`pkce`, `tokenTransform`) default to "off."** Most providers don't need them; the few that do opt in.
- **Registry is in-memory, single instance.** For a stateless HTTP server, this is fine. For multi-instance, each instance re-populates at boot.

**This Codebase**
- `src/oauth.ts` — flow engine + registry functions.
- `src/integrations.ts` — concrete provider registrations (GitHub, Vercel, Supabase).

**Tradeoffs**
| Pro | Con |
|---|---|
| Add a provider in one file, no core changes | Registry is tied to import order |
| Lazy secret resolution survives late env loading | No validation until a flow is tried |
| Provider-specific quirks (PKCE, transforms) stay local | In-memory — no persistence needed, but also no dynamic enablement |

---

### P10. Whole-Store Encrypted Credential Vault

**Problem**
You need to store small numbers of secrets (OAuth tokens, API keys) at rest. You don't want to operate a secrets manager. You need auto-key-generation for local development and a well-defined path for production-level key management — without the code branching on which mode it's in.

**The Pattern**
```ts
import sodium from "libsodium-wrappers";
import fs from "node:fs";
import path from "node:path";

export type Credential = { id: string; kind: "oauth_token" | "api_key"; data: Record<string, unknown> };

const VAULT = (dir: string) => path.join(dir, ".state", "vault.enc");
const KEYFILE = (dir: string) => path.join(dir, ".state", "vault.key");

async function ensureKey(dir: string): Promise<Uint8Array> {
  await sodium.ready;
  if (process.env.VAULT_KEY) return sodium.from_hex(process.env.VAULT_KEY);
  const kf = KEYFILE(dir);
  if (fs.existsSync(kf)) return sodium.from_hex(fs.readFileSync(kf, "utf8").trim());
  const k = sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
  fs.mkdirSync(path.dirname(kf), { recursive: true });
  fs.writeFileSync(kf, sodium.to_hex(k), { mode: 0o600 });
  return k;
}

export async function loadVault(dir: string): Promise<Credential[]> {
  await sodium.ready;
  const vf = VAULT(dir);
  if (!fs.existsSync(vf)) return [];
  const key = await ensureKey(dir);
  const blob = new Uint8Array(fs.readFileSync(vf));
  const nonce = blob.slice(0, sodium.crypto_secretbox_NONCEBYTES);
  const cipher = blob.slice(sodium.crypto_secretbox_NONCEBYTES);
  try {
    const plain = sodium.crypto_secretbox_open_easy(cipher, nonce, key);
    return JSON.parse(new TextDecoder().decode(plain));
  } catch {
    // Tamper / wrong key: treat as empty. Caller can surface via UI if needed.
    return [];
  }
}

export async function saveVault(dir: string, creds: Credential[]): Promise<void> {
  await sodium.ready;
  const key = await ensureKey(dir);
  const plain = new TextEncoder().encode(JSON.stringify(creds));
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const cipher = sodium.crypto_secretbox_easy(plain, nonce, key);
  const blob = new Uint8Array(nonce.length + cipher.length);
  blob.set(nonce, 0);
  blob.set(cipher, nonce.length);
  fs.mkdirSync(path.dirname(VAULT(dir)), { recursive: true });
  fs.writeFileSync(VAULT(dir), blob, { mode: 0o600 });
}
```

**Key Design Decisions**
- **libsodium's `crypto_secretbox`** (XSalsa20 + Poly1305) gives authenticated encryption out of the box — tampering fails the `open` call cleanly. No MAC wiring.
- **Whole-vault encryption.** Every credential write re-encrypts the file. Simple and fine for <1000 credentials.
- **Key resolution order: env → keyfile → generate.** Production sets `VAULT_KEY`; dev auto-generates at 0600. Same code, different posture.
- **Tamper = empty vault, not throw.** Losing your credentials on a disk corruption is bad; crashing the server every boot is worse. Surface via UI/log instead.

**This Codebase**
- `src/vault.ts` + tests in `src/vault.test.ts`.

**Tradeoffs**
| Pro | Con |
|---|---|
| Zero operational overhead | Whole file re-encrypts on any change |
| Auto-generated keys in dev = no setup friction | Key-in-file is a significant trust boundary |
| Authenticated encryption catches tamper | Single key = all credentials leak together on key compromise |
| Same API whether env-key or file-key | Rotating the key requires decrypt-then-re-encrypt dance |

---

### P11. Layered .env Loading with Sensitivity Catalog

**Problem**
A developer tool runs against another directory. The tool has its own `.env` (OPENAI_API_KEY, STRIPE keys). The target project has its own `.env` (database URL, feature flags). Operators want both loaded, with the project's values winning. The UI needs to show "what env is active," safely — no leaking secret values.

**The Pattern**
```ts
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";

export function loadLayered(projectDir: string) {
  const locations = [
    process.cwd(),            // where you invoked from
    projectDir,               // target project (wins — loaded last)
  ];
  const seen = new Set<string>();
  for (const loc of locations) {
    for (const f of [".env", ".env.local"]) {
      const full = path.resolve(loc, f);
      if (seen.has(full) || !fs.existsSync(full)) continue;
      seen.add(full);
      dotenv.config({ path: full, override: true });
    }
  }
}

// Metadata catalogue — hand-curated.
const CATALOG: { name: string; description: string; sensitive: boolean; showValue?: boolean }[] = [
  { name: "OPENAI_API_KEY", description: "OpenAI model access", sensitive: true },
  { name: "STRIPE_SECRET_KEY", description: "Stripe API secret", sensitive: true },
  { name: "STRIPE_PUBLISHABLE_KEY", description: "Stripe publishable key", sensitive: true, showValue: true },
  // ...
];

export function envSnapshot() {
  const known = CATALOG.map((c) => {
    const value = process.env[c.name];
    return {
      ...c,
      set: value !== undefined,
      display: !value ? "" : c.showValue ? value : mask(value),
    };
  });
  const others = Object.keys(process.env)
    .filter((k) => !CATALOG.some((c) => c.name === k))
    .filter((k) => !k.startsWith("npm_") && !k.startsWith("PATH"));
  return { known, others };
}

function mask(v: string) {
  if (v.length <= 8) return "***";
  return `${v.slice(0, 4)}…${v.slice(-4)}`;
}
```

**Key Design Decisions**
- **Later locations override earlier.** Project-specific config beats tool-default config; clear mental model.
- **Curated catalog, not runtime discovery.** Known-important variables get description + sensitivity metadata. Anything else shows as "other."
- **`showValue` flag for publishable/public keys.** Not everything marked sensitive needs to be hidden (publishable keys are public by design).
- **Masking is cosmetic, not security.** The values still exist in `process.env`. This protects shoulder-surfing and copy-paste mistakes, not a malicious process.

**This Codebase**
- `src/load-env.ts` — layered loader.
- `src/environment.ts` — catalog + snapshot with masking.

**Tradeoffs**
| Pro | Con |
|---|---|
| One `.env` file per layer; no mono-env | Catalog maintained by hand |
| Masking prevents accidental UI exposure | Not a substitute for a secrets store |
| Clean precedence rules | `override: true` surprises callers who pre-set env in the shell |

---

### P12. Typed-Core + JSON-Tail Record Schema

**Problem**
You're persisting records in a schemaless store (a JSON file). New features need new fields, often experimental. Migrating every record each time you add a field is painful. You want core identity and lifecycle fields strongly typed and stable, while ancillary metadata lives in a loosely-typed tail that can evolve without breaking old records.

**The Pattern**
```ts
type Id = string;
type Column = "todo" | "doing" | "done";

// Core fields are required and stable. Typed tight.
type CardCore = {
  id: Id;
  title: string;
  column: Column;
  createdAt: number;
  updatedAt: number;
};

// Tail fields are optional, domain-specific, and may change over time.
type CardTail = {
  priority?: "low" | "med" | "high";
  fileOwnership?: string[];                  // paths
  dependencies?: Id[];                       // other card IDs
  execution?: {
    dispatchedAt?: number;
    completedAt?: number;
    commitSha?: string;
    error?: string;
    attempts?: number;
  };
  compliance?: Record<string, boolean>;      // parsed from external artifact
  // Future fields go here — no migration needed.
};

export type Card = CardCore & CardTail;

// When reading an old record, the tail fields simply aren't present; code that consumes them uses `?.`.
export function isReady(card: Card): boolean {
  const unmet = (card.dependencies ?? []).length > 0;
  return card.column === "todo" && !unmet;
}
```

**Key Design Decisions**
- **Core fields are non-optional.** If `id`, `column`, or timestamps are missing, the record is broken. These never change shape.
- **Tail fields are all optional.** Adding one is a non-migration; removing one is safe for consumers with `?.`.
- **Nested groupings (`execution`, `compliance`) stay as discrete tail objects.** Collects related fields, keeps card root cleaner.
- **No versioning field.** Optional-only changes don't need it. If you ever need an incompatible change, introduce it then.

**This Codebase**
- `src/kanban.ts` — `KanbanCard` with typed core (id, title, column, priority, createdAt, updatedAt) and tail (fileOwnership, dependencies, onComplete, execution, compliance, activity).

**Tradeoffs**
| Pro | Con |
|---|---|
| Add fields without migrations | Incompatible field-type changes still hurt |
| Old records keep working | Tail fields don't benefit from required-at-write validation |
| Nested groupings keep the root tidy | Deeply-nested tail invites undiscoverable flags |

---

### P13. Server-Rendered Page with Injected Initial State

**Problem**
You want a live, interactive dashboard but you don't want a bundler, a framework, or a separate frontend service. The dashboard is small enough to fit in one HTML page. You want initial render fast (no spinner on load) and updates driven by server events.

**The Pattern**
```ts
import { Hono } from "hono";

const app = new Hono();

app.get("/dashboard", async (c) => {
  const initial = await gatherInitialState();
  return c.html(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Dashboard</title>
  <style>/* inline CSS */</style>
</head>
<body>
  <div id="app"></div>
  <script>window.__INITIAL_STATE__ = ${JSON.stringify(initial)};</script>
  <script>
    const root = document.getElementById("app");
    const render = (s) => { root.innerHTML = renderTemplate(s); };

    render(window.__INITIAL_STATE__);

    const es = new EventSource("/api/events");
    let t;
    es.addEventListener("refresh", () => {
      if (t) clearTimeout(t);
      t = setTimeout(async () => {
        const r = await fetch("/api/state").then((r) => r.json());
        render(r);
      }, 100);
    });

    function renderTemplate(state) {
      // Vanilla-JS template rendering
      return \`<h1>\${state.title}</h1><ul>\${state.items.map((i) => \`<li>\${i.name}</li>\`).join("")}</ul>\`;
    }
  </script>
</body>
</html>`);
});
```

**Key Design Decisions**
- **One HTML response includes initial data, CSS, and JS.** No bundler, no hydration mismatch, no empty-state flash.
- **Initial state as a `<script>window.__INITIAL_STATE__ = …`.** Parsed as JSON literal at page load — faster than a follow-up fetch.
- **Updates triggered by SSE, not polling.** See Pattern 2.
- **Re-fetch-and-re-render, not diff.** For small dashboards, re-rendering is simpler than diffing and fast enough. Switch to a framework when you need fine-grained updates.

**This Codebase**
- `src/server.ts` — the `/dashboard` route is a large inline HTML+JS blob.
- `lib/design-kit/` — React components for a *future* migration; not currently used in the server path.

**Tradeoffs**
| Pro | Con |
|---|---|
| No build step, no CI for frontend | HTML blob grows as UI grows |
| Instant first paint | Re-rendering everything is CPU-inefficient at scale |
| No hydration bugs | No type safety between server state shape and client template |
| Easy to deploy — one process, one response | Hard to share components across pages |

---

### P14. Parallel API Surfaces (REST + MCP + CLI) Over a Shared Core

**Problem**
The same capability needs to be callable by three different kinds of callers: a browser dashboard (REST), an LLM agent (MCP), and a terminal user (CLI). Implementing each separately creates drift. Funneling them all through one core module keeps behaviors in sync.

**The Pattern**
```ts
// core.ts — single source of truth.
export async function createRecord(dir: string, input: { title: string; category: string }) {
  validateInput(input);
  const record = await persist(dir, input);
  return record;
}

// rest.ts — Hono handler.
import { createRecord } from "./core";
app.post("/api/records", async (c) => {
  const body = await c.req.json();
  const r = await createRecord(c.get("projectDir"), body);
  return c.json(r, 201);
});

// mcp.ts — JSON-RPC tool.
import { createRecord } from "./core";
mcpServer.tool("create_record", {
  inputSchema: { type: "object", properties: { title: { type: "string" }, category: { type: "string" } } },
  handler: async (input, ctx) => ({ content: [{ type: "text", text: JSON.stringify(await createRecord(ctx.dir, input)) }] }),
});

// cli.ts — shell entry.
import { createRecord } from "./core";
if (cmd === "create") {
  const r = await createRecord(projectDir, { title: argv.title, category: argv.cat ?? "other" });
  console.log(`Created ${r.id}`);
}
```

**Key Design Decisions**
- **Core module is the contract.** REST / MCP / CLI are thin adapters. Behavior changes happen in one place.
- **Adapters translate, don't business-logic.** The REST handler parses JSON body, the MCP handler parses schema-validated input, the CLI handler parses argv. All call the same core.
- **Input validation lives in core.** Adapters pre-validate for their transport-specific concerns (JSON-able, schema, CLI flag presence), but business rules are core's job.
- **Return types are serialisable.** If `core` returns an object with methods, MCP/CLI break. Keep return types plain data.

**This Codebase**
- Actions: `src/actions.ts` core → `/api/actions` REST, MCP `devplane_add_action`, CLI `dp actions add`, `src/agent-api.ts add-action`.
- Completion: `src/completion.ts` core → `/api/completion/log`, `/api/agent/completion/log`, MCP `devplane_log_completion`, fallback parse-from-session-report path.

**Tradeoffs**
| Pro | Con |
|---|---|
| Zero drift across surfaces | Surface docs must be written three times |
| New callers plug in easily | Core must stay serialisable (no class returns) |
| Tests target the core, not the adapters | Adapters can still add transport-specific bugs |

---

### P15. Public-Route Allowlist in an Auth-First Middleware

**Problem**
Most of your API requires authentication, but a few endpoints are public by design: health checks, OAuth callbacks, webhooks (signature-verified by the caller), SSE event streams. You want the middleware default to be "deny" — adding a new route should not accidentally become public.

**The Pattern**
```ts
const PUBLIC_PATTERNS: RegExp[] = [
  /^\/api\/health(\/|$)/,
  /^\/api\/auth\/config$/,
  /^\/api\/events$/,
  /^\/api\/agent\//,
  /^\/api\/billing\/webhook$/,
  /^\/api\/integrations\/callback$/,
];

export function requireAuth() {
  return async (c: any, next: () => Promise<void>) => {
    const path = new URL(c.req.url).pathname;
    if (PUBLIC_PATTERNS.some((re) => re.test(path))) {
      return next();
    }
    const user = await verify(c.req);
    if (!user) return c.json({ error: "unauthorized" }, 401);
    c.set("user", user);
    await next();
  };
}
```

**Key Design Decisions**
- **Allowlist, not denylist.** Every new route is protected unless you explicitly exempt it.
- **Regexes, not string prefixes.** Prevents `/api/auth/config-public` from leaking `/api/auth/config` auth bypass.
- **Webhook endpoints are public because they're verified at application layer** (signature check). Document this loudly — it's a surprising exception.
- **One file owns the allowlist.** Audit the public surface by reading one file.

**This Codebase**
- `src/auth.ts` with `PUBLIC_API_ROUTES`.

**Tradeoffs**
| Pro | Con |
|---|---|
| Safe default | Must remember to add new public routes explicitly |
| Regex is precise | Regex typos silently expose protected routes |
| Audit surface is one file | Route owners and auth allowlist live in different places |

---

### P16. File Watcher → Extractor → Queue Pipeline

**Problem**
Someone else (an agent, a build process, a human) drops artifacts in a folder. You want to detect new files, extract structured data, and push the data into a downstream queue. The watcher must tolerate half-written files and must not crash on a bad file.

**The Pattern**
```ts
import fs from "node:fs";

type Extracted = { title: string; category: string };

export function watchFolder(folder: string, push: (e: Extracted) => void) {
  if (!fs.existsSync(folder)) return;
  const processed = new Set<string>();

  const watcher = fs.watch(folder, (_evt, filename) => {
    if (!filename || !filename.endsWith(".md")) return;
    const full = `${folder}/${filename}`;
    if (processed.has(full)) return;
    processed.add(full);
    // Small delay: the writer may still be finishing.
    setTimeout(() => process(full), 1000);
  });

  async function process(file: string) {
    try {
      const content = await fs.promises.readFile(file, "utf8");
      for (const item of extract(content)) push(item);
    } catch (e) {
      console.error("[watcher]", file, e);
      processed.delete(file); // let retry happen on next event
    }
  }

  return watcher;
}

function extract(md: string): Extracted[] {
  // Parse "follow-up" / "open issues" sections, etc.
  return [];
}
```

**Key Design Decisions**
- **1-second post-event delay.** `fs.watch` fires on write start; the writer may still be appending. Delay gives the file time to finalise.
- **Per-file dedupe set.** `fs.watch` can fire multiple events for one write.
- **Errors delete the dedupe entry.** A bad read shouldn't permanently skip the file; next event retries.
- **Catch around `process()`, never around `watch()`.** Watcher must keep running; individual file errors are localised.

**This Codebase**
- `src/watcher.ts` — watches session-report directory, calls `extractActionsFromSession`.
- **Limitation:** 1-second delay is fragile with very large files. Production use: writers should atomic-rename from `.tmp`.

**Tradeoffs**
| Pro | Con |
|---|---|
| No client integration required — just drop a file | 1-second race if writer is slow |
| Automatic retry on errors | `fs.watch` is unreliable on some networked filesystems |
| Simple to reason about | Doesn't catch files written before the watcher started |

---

### P17. Signed Webhook with Narrow Event Dispatcher

**Problem**
A third party (payment provider, source host, observability vendor) sends events to your endpoint. You need to verify they actually came from that party, then dispatch to local state updates. Unverified events should 400 fast; verified events should be dispatched with narrow types.

**The Pattern**
```ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-09-30" as any });

// Route must expose the RAW body, not parsed JSON.
app.post("/api/webhook", async (c) => {
  const sig = c.req.header("stripe-signature");
  const raw = await c.req.text();
  if (!sig) return c.json({ error: "missing signature" }, 400);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return c.json({ error: "bad signature" }, 400);
  }

  await dispatch(event);
  return c.json({ received: true });
});

async function dispatch(evt: Stripe.Event) {
  switch (evt.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await updateLocalSubscription(evt.data.object as Stripe.Subscription);
      return;
    case "invoice.payment_failed":
      await flagFailure(evt.data.object as Stripe.Invoice);
      return;
    // unmatched types: log and ignore; provider retries don't hurt.
    default:
      return;
  }
}
```

**Key Design Decisions**
- **Raw body, not parsed JSON.** Signature verification depends on byte-exact body. If your framework parses JSON before handlers, you need a raw-body exception for webhook routes.
- **Narrow switch, not generic handler.** Each event type maps to a specific local action. A default `return` makes unknown types non-errors (provider may add types).
- **Local DB is eventually consistent with provider.** The webhook is the source of truth; no UI action should claim success before the webhook has landed.
- **Reject on signature failure.** Providers retry with exponential backoff; fast 400 is cheap to produce.

**This Codebase**
- `src/billing.ts` — Stripe webhook handling.
- `src/server.ts` — the route is in `PUBLIC_API_ROUTES` (skips Clerk); body parser is configured for raw on that route.

**Tradeoffs**
| Pro | Con |
|---|---|
| Verified at the boundary | Raw-body handling is framework-specific |
| Narrow dispatch is auditable | Unknown event types silently ignored |
| No polling needed | Missed webhooks = missed state (mitigated by provider retries) |

---

### P18. Dependency-Graph Dispatch Gate

**Problem**
Work items have prerequisites. Dispatching an item before its prerequisites finish is wasteful and often broken (agent can't complete the task because the upstream change isn't merged yet). You want to gate dispatch on a live check of the prerequisite graph, not on scheduled slots.

**The Pattern**
```ts
type Item = { id: string; status: "pending" | "doing" | "done"; deps: string[] };

export function dispatchable(items: Item[]): Item[] {
  const byId = new Map(items.map((i) => [i.id, i]));
  return items.filter((i) => {
    if (i.status !== "pending") return false;
    return i.deps.every((dep) => byId.get(dep)?.status === "done");
  });
}

// Usage:
export async function tick(items: Item[]) {
  const ready = dispatchable(items);
  for (const item of ready) {
    await dispatch(item);
  }
}
```

**Key Design Decisions**
- **Dispatchability computed every tick.** No "waiting" column to maintain; items move from pending to ready purely based on deps.
- **Deps stored by ID.** Stable across rename; no string collisions.
- **No auto-fail on stuck deps.** If an upstream item stalls, the blocked items wait indefinitely. Add a timeout only if indefinite waiting is unacceptable.
- **O(n²) worst case.** Fine for small graphs; build an index for large ones.

**This Codebase**
- `src/dispatch.ts` + `src/assignments.ts` — dependency graph + dispatch loop.
- `src/server.ts` — `/api/assignments/graph` exposes the live graph to the UI.

**Tradeoffs**
| Pro | Con |
|---|---|
| Always accurate | O(n²) scan per tick |
| No separate "waiting" state to maintain | Stuck deps block downstream forever |
| Simple graph definition | Cycle detection not built in — caller's job |

---

### P19. Two-Phase Actor Handoff (Builder → Reviewer)

**Problem**
A work item needs two distinct agents: one builds, one reviews. You want the system to enforce the handoff, not rely on convention. The reviewer must produce an artifact the builder can't (a signed-off commit, an approval signature, a real commit SHA) before the item is marked done.

**The Pattern**
```ts
type Item = { id: string; column: "doing" | "review" | "done"; [k: string]: unknown };

// Single endpoint, two states depending on payload shape.
export function completeItem(item: Item, block: { status: "complete" | "blocked"; commitSha: string }) {
  if (block.status === "blocked") {
    return { ...item, column: "doing" as const };
  }
  // Builder's call: supplies sentinel SHA to signal "done building, not committed".
  if (block.commitSha === "UNCOMMITTED") {
    return { ...item, column: "review" as const };
  }
  // Reviewer's call: supplies real SHA of the committed, pushed artifact.
  return { ...item, column: "done" as const, commitSha: block.commitSha };
}
```

**Key Design Decisions**
- **One endpoint, two different input shapes.** The presence of the real SHA is the signal. No separate "approve" endpoint needed.
- **Sentinel value (`"UNCOMMITTED"`) explicit in the protocol.** Builders must know to send it; reviewers must know to replace it.
- **Reviewer runs as a separate agent.** The framework prompts a second Claude subprocess with a review-specific prompt. The reviewer is not a human in the happy path.
- **Failure mode (blocked) short-circuits to "needs rework."** Doesn't require the SHA.

**This Codebase**
- `src/completion.ts:processCompletionBlock` — resolves via `commit_sha === "UNCOMMITTED"` branch.
- `src/server.ts` — `/api/board/cards/:id/review-prompt` and `/rework-prompt` generators.

**Tradeoffs**
| Pro | Con |
|---|---|
| Review is structurally enforced | Two agent calls = 2x dispatch cost |
| No explicit "approve" tool surface needed | Sentinel-in-payload is surprising to first-time agents |
| Same endpoint handles both phases | Easy to conflate the two phases in tests |

---

### P20. Long-Lived Subprocess Session Cache

**Problem**
An interactive CLI tool (a REPL, an agent, a shell) has significant startup cost. Spawning one per user message is slow. You want a warm instance per user/project, reused across messages, cleaned up on explicit reset or idle.

**The Pattern**
```ts
import { spawn, ChildProcessWithoutNullStreams } from "node:child_process";

type Session = {
  child: ChildProcessWithoutNullStreams;
  buffer: string;
  lastUsed: number;
};

const sessions = new Map<string, Session>();

function getOrCreate(key: string, cmd: string, args: string[], cwd: string): Session {
  const existing = sessions.get(key);
  if (existing && !existing.child.killed) {
    existing.lastUsed = Date.now();
    return existing;
  }
  const child = spawn(cmd, args, { cwd });
  const session: Session = { child, buffer: "", lastUsed: Date.now() };
  child.stdout.on("data", (b) => (session.buffer += b.toString()));
  child.on("exit", () => sessions.delete(key));
  sessions.set(key, session);
  return session;
}

export async function send(key: string, cmd: string, args: string[], cwd: string, input: string) {
  const s = getOrCreate(key, cmd, args, cwd);
  const before = s.buffer.length;
  s.child.stdin.write(input + "\n");
  // Wait for a response stable window — output stops growing for ~200ms.
  return new Promise<string>((resolve) => {
    let lastLen = before;
    const iv = setInterval(() => {
      if (s.buffer.length === lastLen) {
        clearInterval(iv);
        resolve(s.buffer.slice(before));
      }
      lastLen = s.buffer.length;
    }, 200);
  });
}

export function reset(key: string) {
  const s = sessions.get(key);
  if (s) {
    s.child.kill("SIGTERM");
    sessions.delete(key);
  }
}

// Idle reaper — kill sessions unused for >30min.
setInterval(() => {
  const cutoff = Date.now() - 30 * 60_000;
  for (const [k, s] of sessions) {
    if (s.lastUsed < cutoff) reset(k);
  }
}, 5 * 60_000);
```

**Key Design Decisions**
- **One session per key (e.g., per project).** Concurrent messages for the same key serialize through the same subprocess. Different keys get separate processes.
- **Output-stability polling, not markers.** Wait for output to stop growing instead of looking for a sentinel — works with any interactive CLI.
- **Idle reaper prevents resource leaks.** A long-running server with many users would otherwise grow session count unboundedly.
- **Exit deletes the session.** If the child dies unexpectedly, the next call rebuilds.

**This Codebase**
- `src/chat.ts` — `Map<projectDir, ChatSession>`, spawns `claude` interactively, injects context (vision, board, actions, git, health) at session start.
- **Limitation:** polling-based response detection can mis-cut if the CLI pauses mid-response. Markers or explicit line-based framing are more reliable.

**Tradeoffs**
| Pro | Con |
|---|---|
| Avoids cold-start on each message | In-memory state lost on server restart |
| Context persists naturally across messages | One process per key — doesn't scale to 10k keys |
| Simple API (get, send, reset) | Output-stability polling is fragile |
| Idle reaper bounds resource use | Concurrent messages for same key serialize |

---

## Pattern Combinations

Named recipes — grab a bundle instead of picking individually.

### Recipe R1 — Real-time Dashboard Over Flat Files
**Problem:** You want a live, multi-tab dashboard without a database.
**Combine:** P01 (load–modify–save) + P02 (SSE + debounce) + P13 (server-rendered + injected state).
**Result:** Every mutation persists to a JSON file and fires `broadcast("refresh")`; all tabs debounce-fetch the fresh state.

### Recipe R2 — Multi-Caller API Over Shared Core
**Problem:** The same feature must be callable from a browser, an LLM agent, and a CLI.
**Combine:** P14 (parallel surfaces) + P05 (validator-at-the-boundary) + P15 (public-route allowlist).
**Result:** Three adapters over one core module, validation at each ingress, clear public/private boundary.

### Recipe R3 — Autonomous Worker that Reports Back
**Problem:** You spawn an external worker (agent, build tool) per item and need to know when it's done.
**Combine:** P08 (subprocess dispatcher) + P03 (log polling fallback) + P04 (state machine) + P19 (two-phase handoff).
**Result:** Worker fires; either it calls back through the MCP/REST API, or your log poller detects its commit and synthesises the callback. Second-phase handoff enforces review.

### Recipe R4 — Fault-Tolerant File Intake
**Problem:** Other processes drop artifacts in a folder; you turn them into structured work.
**Combine:** P16 (watcher pipeline) + P01 (state file) + P05 (validator) + P02 (SSE broadcast).
**Result:** File lands, is extracted, validated, persisted, and live-pushed to clients.

### Recipe R5 — Pluggable OAuth Integrations
**Problem:** Onboard new SaaS integrations without touching the core flow.
**Combine:** P09 (provider registry) + P10 (encrypted vault) + P17 (signed webhooks) + P15 (public-route allowlist for callbacks).
**Result:** Add a provider in one file; credentials stored encrypted; optional webhook path for post-connect events.

### Recipe R6 — Live Triaged Work Queue
**Problem:** A to-do queue that re-ranks itself against reality.
**Combine:** P01 (state file) + P05 (validator) + P06 (context-driven triage) + P14 (parallel surfaces).
**Result:** Items persist as JSON, are validated at ingress, triaged live against system state, queryable from multiple callers.

### Recipe R7 — Batch Parallel Work with Consolidation
**Problem:** Kick off N parallel items, summarise when all finish.
**Combine:** P07 (batch + consolidation) + P18 (dependency-gate) + P08 (subprocess dispatcher) + P03 (log polling for completion).
**Result:** Items fire only when deps are met; subprocess runs each; log poller detects completion; consolidation prompt auto-fires at the end.

### Recipe R8 — Warm Interactive Agent Per User
**Problem:** An interactive agent (REPL, Claude chat) should feel instant, not cold-started per turn.
**Combine:** P20 (session cache) + P13 (injected initial state) + P02 (SSE streaming outputs back).
**Result:** Per-user warm subprocess; initial context injected at session start; streaming responses pushed to the browser over SSE.

---

## Maintenance

- **Adding a new pattern:** increment from P20 (next: P21). Add to the Pattern Index table. Keep entries domain-agnostic — if your pattern only makes sense in context, it's a code reference, not a reusable pattern.
- **Retiring a pattern:** don't delete; mark the entry `**Deprecated** — see P<new>` and keep it for citations.
- **Combinations:** add new recipes at the bottom of the Combinations section. A recipe needs a named problem and a 1-sentence outcome — not a tutorial.
