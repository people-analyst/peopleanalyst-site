/**
 * Fetch portfolio stats from GitHub and write to content/stats/portfolio-stats.json.
 *
 * Sums commits-in-last-365-days and approximate lines-of-code across all
 * non-archived, non-fork repos under the `people-analyst` GitHub user/org.
 *
 * Auth: uses `gh auth token` (the gh CLI's stored token). Run `gh auth login`
 * first if not authenticated.
 *
 * Usage:
 *   npm run portfolio:stats
 *
 * The output JSON is committed to the repo so the home-page sidebar has
 * something to read on first deploy. Re-run periodically (manually or via
 * GitHub Actions cron) to refresh.
 */
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const OWNER = "people-analyst";
const SINCE = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
const OUT_PATH = join(process.cwd(), "content", "stats", "portfolio-stats.json");

// Rough chars-per-line ratio for LoC estimation from byte counts.
// Industry typical: ~35-45 chars/line for source code (mix of declarations,
// expressions, blank lines, comments). 40 is a reasonable mid-point.
const CHARS_PER_LINE = 40;

function ghToken(): string {
  return execSync("gh auth token").toString().trim();
}

const TOKEN = ghToken();

async function ghFetch<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

type Repo = {
  name: string;
  archived: boolean;
  fork: boolean;
  default_branch: string;
};

async function listRepos(): Promise<Repo[]> {
  // gh CLI handles user-vs-org transparently; emit JSON-array-of-arrays-per-page
  const raw = execSync(
    `gh repo list ${OWNER} --limit 200 --json name,isArchived,isFork,defaultBranchRef`,
  ).toString();
  const items: {
    name: string;
    isArchived: boolean;
    isFork: boolean;
    defaultBranchRef: { name: string } | null;
  }[] = JSON.parse(raw);
  return items.map((r) => ({
    name: r.name,
    archived: r.isArchived,
    fork: r.isFork,
    default_branch: r.defaultBranchRef?.name ?? "main",
  }));
}

async function repoLanguageBytes(name: string): Promise<number> {
  const langs = await ghFetch<Record<string, number>>(
    `/repos/${OWNER}/${name}/languages`,
  );
  return Object.values(langs).reduce((a, b) => a + b, 0);
}

async function repoCommitsSince(name: string, branch: string): Promise<number> {
  // Paginate via Link header. Each page returns up to 100 commits.
  let total = 0;
  let url:
    | string
    | null = `https://api.github.com/repos/${OWNER}/${name}/commits?sha=${encodeURIComponent(branch)}&since=${encodeURIComponent(SINCE)}&per_page=100`;
  while (url) {
    const res: Response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!res.ok) {
      // Empty repo or no commits → 409 or 404. Treat as zero.
      if (res.status === 409 || res.status === 404) return total;
      throw new Error(
        `commits ${name}: ${res.status} ${res.statusText}`,
      );
    }
    const page = (await res.json()) as unknown[];
    total += page.length;
    const link: string | null = res.headers.get("link");
    const next: RegExpMatchArray | null = link
      ? link.match(/<([^>]+)>;\s*rel="next"/)
      : null;
    url = next ? next[1] : null;
  }
  return total;
}

async function main() {
  const allRepos = await listRepos();
  const liveRepos = allRepos.filter((r) => !r.archived && !r.fork);
  console.log(
    `Found ${liveRepos.length} live repos (of ${allRepos.length} total) under ${OWNER}`,
  );

  let totalBytes = 0;
  let totalCommits = 0;
  const perRepo: { name: string; bytes: number; commits: number }[] = [];

  for (const repo of liveRepos) {
    try {
      const [bytes, commits] = await Promise.all([
        repoLanguageBytes(repo.name),
        repoCommitsSince(repo.name, repo.default_branch),
      ]);
      totalBytes += bytes;
      totalCommits += commits;
      perRepo.push({ name: repo.name, bytes, commits });
      console.log(
        `  ${repo.name}: ${commits} commits, ${(bytes / 1000).toFixed(0)}KB`,
      );
    } catch (e) {
      console.warn(`  ${repo.name}: skip (${(e as Error).message})`);
    }
  }

  const linesOfCode = Math.round(totalBytes / CHARS_PER_LINE);
  const out = {
    generatedAt: new Date().toISOString(),
    sinceUtc: SINCE,
    owner: OWNER,
    repoCount: liveRepos.length,
    commitsLast365: totalCommits,
    linesOfCode,
    bytesTotal: totalBytes,
    perRepo: perRepo.sort((a, b) => b.commits - a.commits),
    notes: {
      linesOfCodeMethodology: `bytes / ${CHARS_PER_LINE} chars-per-line estimate, summed across all detected languages per repo`,
      commitsMethodology: `git commits on default branch since ${SINCE}; merge commits counted; PR-squashed commits count as 1`,
      excludes: "archived repos, forks",
    },
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`\nWrote ${OUT_PATH}`);
  console.log(
    `  ${liveRepos.length} repos · ${totalCommits} commits last 365 days · ${linesOfCode.toLocaleString()} LoC (estimate)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
