# Engineering critique — Vela's research instruments

*A reviewer's lens on the systems that produce Vela's empirical record. What the architecture commits to, where the commitments are well-founded, and what an engineering reviewer should interrogate.*

— 2026-05-04

---

## 1. System under review

Vela is presented as an editorial project — a magazine, a player, a library. The research output rides on instruments built underneath: an adaptive sequencing engine (Reincarnation), a corpus ingestion pipeline that handles two grades of textual evidence, a curated image library at ~385 active units, and a production telemetry surface that records every user interaction. The empirical claims downstream of these instruments — about desire-vs-preference, about compositional features, about temporal dynamics, about individual differences — are only as good as the instruments. This document is the engineering side of that ledger.

The stack is opinionated: Next.js 16 App Router on Vercel (Fluid Compute), Supabase for Postgres + auth + storage + edge functions, Modal for GPU-bound work (LoRA training, image generation), Anthropic for inference, OpenAI for embeddings. There is no microservice mesh; there is no Kubernetes; there is one shared Postgres database that every product reads and writes against, with row-level security and service-role access patterns separating authenticated user reads from admin writes. The integration is the schema.

## 2. What's well-built

**The dual-grade corpus.** `mosaic_passages` carries two distinct populations distinguished by a single tag (`research-bulk-chunk`): curator-grade picks (~15 hand-labeled passages per source, used for editorial output) and research-bulk chunks (~50–150 paragraph-respecting ~500-word chunks per source, used for retrieval-against-claim audits). The decision to keep both in one table rather than fork into two is correct for a research instrument: the same retrieval primitives can target either grade by filter, and the curator-grade passages are guaranteed to live inside the research-bulk envelope they were drawn from. It also commits the project to honesty: a source that has only curator-grade passages cannot answer a research-bulk retrieval, and the failure mode is visible (top hits are unrelated but high-similarity) rather than silent. The 2026-04-23 *Christianity-sex-shame* case study is a good example of this failure mode being caught.

**The Reincarnation pool ladder.** The user-desire-profile state machine moves users through a four-stage ladder — calibration → exploration → drift → consolidation — with explicit transition criteria tied to response volume and confidence, not arbitrary session counts. The engine separates *desire scoring* (the model's read of what the user is moved by) from *preference scoring* (the user's stated taste); this distinction is load-bearing for any future claim about adaptive sequencing producing a behavioral signal that exceeds what a preference quiz could yield. The decoupling is encoded in the schema (`user_desire_profiles` vs explicit preference rows), not just in convention.

**Telemetry as instrument.** The platform records `responses` (per-unit ratings + dwell + saved-status), `player_sessions` (session boundaries + sequence linkage), and a parallel set of magazine-side response logs. The instrumentation is wired at the page level, not the component level, which means the question "did the user actually see this work?" is answerable from the data alone, without relying on client telemetry that can drop. The cost is that some interaction-level signal (hover, partial scroll) is unavailable; the trade-off is that the present signal is *honest* — recorded server-side, attributable to a session, and stable under client-side anomalies.

**The license-tier filter.** Every retrieval that feeds editorial output is filtered by `licensure_status IN ('public_domain','licensed','purchased')`. Shadow-library passages exist in the corpus for analysis but cannot reach editorial surfaces. This is not an afterthought — it is a SQL invariant the queries assert. An engineering reviewer should care because it means the legal-compliance posture is enforced at the data plane, not in policy docs that drift.

**Migrations have a forcing function.** Pushes to `main` that touch `supabase/migrations/**` run `supabase db push` in CI; agents apply migrations locally before merge so bad SQL is caught early. The reconciler `npm run db:migrations:verify` cross-references the tracker against the live DB and auto-repairs drift introduced by anyone using the dashboard SQL editor. Schema drift is the canonical "I thought I was working with X but the runtime has Y" failure; the forcing function reduces the surface.

## 3. Failure modes and stress conditions

**Sparsity at the unit level.** Most active units have zero recorded responses. The Reincarnation engine v3 partly addresses this with decomposition-seeds — initial scores derived from `primary_dimension` + `visual_decompositions` rather than user data — but the seeds are themselves derived from curator labels that have their own coverage gaps. An engineering reviewer should ask: under what cohort sizes do the engine's claims about adaptive convergence actually hold? The known-issues notes that "dense adaptive feel depends on participant recruitment" — this is honest, but the corollary is that any empirical claim about engine performance needs to specify the cohort it was measured against, and the project's current cohort is small.

**The relation graph is empty.** Phase R8 of Reincarnation specifies an `experience_unit_relations` graph with redundancy penalties (so the engine doesn't sequence three highly-similar pieces in a row). The schema exists; the population pipeline does not. As long as the graph is empty, the engine has no read on inter-unit similarity beyond style-tag and primary-dimension proxies. Sequences may feel less adaptive than they should; the failure is silent because the proxies still produce *some* sequencing, just not the sequencing the spec anticipated.

**Boundary-rule schema mismatch.** The live `user_boundary_rules` table uses a `tag_value` column; the R1 specification calls for `rule_value` + `source_unit_id` + `strength`. A future migration is owed; in the meantime, boundary-aware filtering operates on a richer mental model than the schema can express. This is the kind of drift that makes downstream analysis unreliable — a researcher who trusts the spec will write queries that don't match the table.

**Silent catch-block pattern.** Several catch-blocks across `lib/` swallow errors with `console.warn` and return `[]` or `null`. When a load-bearing query starts failing — say, because of a PostgREST FK ambiguity, as the 2026-05-04 emotion-profile incident illustrated — the user sees an empty page rather than an error. The page is "working." The data is wrong. The reviewer should grep for the pattern and treat each instance as a contract: either the empty result is genuinely meaningful (nothing matched) or the catch is hiding a contract violation. The two need to look different to the page above them.

**PostgREST embedded-join ambiguity.** When a parent table has multiple FKs to a child (the `mosaic_passages` ↔ `mosaic_sources` case has two: canonical `source_id` and the licensure-supersession `superseded_by_source_id`), PostgREST refuses to embed the child without an explicit FK disambiguator. The error stays latent while the schema cache holds the old single-FK state, then surfaces on the next cache refresh. ASN-1202 is the systematic sweep + CI guard. An engineering reviewer should note that the failure mode is *time-shifted* — the buggy code passes review and works for days, then breaks at random — which is the exact kind of bug that erodes confidence in a system over time.

**Long-running processes are forbidden by policy, not by infrastructure.** The platform's failure mode for "I want this to run for an hour" is anti-cron-ticked: agents are forbidden to `nohup`/`disown` long-running tasks; instead, they're required to use cron-tick + DB-checkpoint patterns. This is the correct discipline, but it depends on agent compliance — there is no kernel-level enforcement. A reviewer should ask: what evidence exists that the discipline holds? The answer today is "the policy is repeated in CLAUDE.md and incidents are catalogued" — not bad, not airtight.

## 4. What I would interrogate

If I were a peer engineering reviewer looking at the empirical findings derived from this stack, my pre-acceptance questions would be:

1. **Cohort and confound disclosure.** For any claim about Reincarnation engine behavior — convergence, calibration, retention — what cohort size produced the data? Was the cohort recruited or self-selected? How are the engine's decomposition-seeds disclosed in the analytics, given that they constitute prior structure imposed on what looks like behavioral data?

2. **Telemetry coverage.** What fraction of session events are server-recorded vs client-recorded? For the server-recorded events, what's the data loss rate (failed writes, dropped sessions)? An empirical claim about response distributions needs an honest read on the missingness.

3. **Schema-spec drift register.** Where else is the running schema diverged from the specifications that downstream analyses assume? The boundary-rule mismatch is one; how many more are there? An ASN to maintain a "schema-vs-spec divergence ledger" would tighten this. (It does not currently exist.)

4. **Reproducibility.** The empirical record sits in production Postgres. There is no point-in-time snapshot of the dataset that a reviewer can re-run analysis against. For research output, a periodic export to a frozen analytical dataset (Parquet under a research-program S3 bucket, with the snapshot SHA recorded) is owed. The Erotic-Writing program's "frozen analysis dataset" rule (ASN-1040) is the right shape, but it is program-specific; the platform-level instrument needs the same treatment.

5. **Cost-attribution honesty.** The system's billable cost surface is large (Vercel builds at ~$0.78/push, Modal A100s, Supabase tier, Anthropic + OpenAI usage). An engineering claim about the project's economic viability or scaling envelope should be backed by a cost ledger, not anecdote. A periodic export of provider-side billing to an internal table — already partial via the April 2026 billing audit — should be promoted to a recurring instrument.

## 5. Trade-offs that future work inherits

The stack chose ergonomic productivity over component independence. The "one shared DB" rule means a schema change has system-wide reach; the upside is that the integration map (`docs/PRODUCT_INTEGRATION_MAP.md`) is the actual integration, not a prayer. The trade-off is real: the next product that wants to live alongside Vela in this monorepo must either accept the shared DB or do the work of partitioning. The library-core multi-property pattern (per `project_library_core_multi_property`) anticipates this, but anticipation is not implementation.

The stack chose Anthropic + OpenAI as production providers without a unifying gateway. The Vercel AI Gateway is available; the project's current code path is direct provider SDKs. This is a legitimate choice for a research instrument (provenance is unambiguous; routing surprises are fewer), but it carries a portability cost. A future migration to provider-routed inference — for cost or for failure-isolation reasons — would touch many files. The cost is paid in advance every month the lock-in persists.

The stack chose explicit ASN-keyed assignments over a ticketing tool. The benefit is that any agent or person reading `docs/AGENT-ASSIGNMENTS.md` has the full work surface in one file; the cost is that the file has grown to 38,000+ lines and required its own reconciler (`scripts/asn/audit-status.ts`) plus drift-fix discipline. The reconciler now flips obvious drift; it does not yet distinguish *filing* commits from *shipping* commits, which is a known gap. A reviewer reading the queue should treat statuses as approximate until the ledger settles.

---

*Companion artifacts:* `docs/research/reviews/peer-review-framing.md` (audience-tier 1, in flight); `docs/research/reviews/product-implications.md` (audience-tier 3, in flight). Manifest entry `vela:engineering-critique` is the corresponding slot on `peopleanalyst.com/research/vela`.
