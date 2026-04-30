# Preregistration — Study 01 (Recruited cohort instrument)

**Study identifier:** `study-01`  
**Repository:** `people-analyst/vela`  
**Registration type:** OSF-style internal preregistration (upload-ready)  
**Version:** 1.0 — 2026-04-24  
**Engineering:** `study_arms`, `study_assignments`, `lib/study/arms.ts`, `lib/study/randomization.ts`, `lib/study/assignment.ts`, `POST /api/study/assign`, `POST /api/study/session/start` (ASN-578)

---

## 1. Background

Vela’s first paid / recruited cohort completes a **fixed-length image rating session** (approximately 50–80 items) under research consent. The platform’s adaptive curation stack (desire scores, pool bonuses, exploration budget, session momentum — see `docs/engine-room/01-math-spec.md` §5.1–5.2) is designed for open-ended play. Study 01 isolates a **controlled manipulation of presentation order** while holding the **item multiset** constant per session seed, so we can attribute differences to ordering policy rather than corpus composition.

---

## 2. Research question (program link)

**RQ5 (narrowed for this instrument):** Does **adaptive-style ordering** of the same cohort produce different behavioral signals than **random ordering** of that cohort, under identical consent, UI, and compensation?

This preregistration operationalizes a **first-step** contrast aligned with the broader RQ5 agenda in `docs/RESEARCH-PROGRAM.md` (adaptive vs non-adaptive experience), using a **between-subjects** arm in the dedicated study shell rather than organic mode switching.

---

## 3. Hypotheses

**H1 (primary).** Mean per-session rating (1–5 scale) differs between the **adaptive_order** arm and the **random_order** arm.

**H2 (secondary, exploratory in v1).** Save rate and boundary-flag rate differ between arms.

**H3 (null for exploratory analyses).** No preregistered claim for dwell time or micro-survey text outcomes in v1 beyond descriptive reporting.

---

## 4. Design summary

| Element | Specification |
|--------|-----------------|
| Unit of randomization | Participant (stable subject key) |
| Between-subjects factor | Order policy (`adaptive_spread` vs `random_shuffle`) |
| Held constant (v1) | Cohort selection policy `diverse_spread`; item multiset for a given `cohort_seed` + corpus snapshot |
| Blinding | Participants are not told which arm they received; analysts blind until locked column definitions |
| Outcomes | Recorded in `responses` with `source_type = 'study'` and `research_session_id` |

---

## 5. Arms and configuration

Arms are **database-configured** (`study_arms.config_json`). Swapping or adding arms does not require an application deploy.

### 5.1 Arm rationale

**Default arm pair (shipped): (a) adaptive-order vs random-order**

- **Adaptive spread (`adaptive_order`):** Presentation order follows the deterministic cohort builder in `lib/study/cohort.ts`: curator anchors first, minimum coverage across primary dimensions where the corpus allows, style-stratified fill, then a seeded shuffle of the remainder. This mirrors the editorial-spread intuition used for instrument construction (breadth before depth randomness).

- **Random shuffle (`random_order`):** The **same** multiset of unit ids selected for the adaptive arm is re-ordered with a **deterministic shuffle** keyed by `(subject_hash, study_id, arm_id, cohort_seed)` so the order is reproducible for a returning participant but exchangeable across participants relative to adaptive ordering.

**Link to math spec (interpretive, not runtime-identical):** The production sequence engine’s candidate score (§5.1) and exploration budget (§5.2) motivate *why* ordering might change behavior. Study 01 does not re-run the live sequence engine on the cohort list; it manipulates **study shell queue order** only. Claims generalize to “ordering of a fixed recruited multiset,” not to full runtime queue dynamics.

**Deferred arm pairs (infrastructure-ready, not activated until Mike selects):**

- (b) Feature-diverse vs feature-homogeneous cohort (`cohortPolicy` in config — selection logic to be implemented when chosen).
- (c) Identical vs personalized cohort — same extension point.

---

## 6. Randomization and assignment

1. **Subject key:** Signed-in users → `SHA-256(pepper + ':study-assign:user:' + user_id + ':' + study_id)`. Anonymous users → existing `participant_token_hash` (pepper-separated hash of the HttpOnly cookie token).
2. **Arm index:** `fnv1a32("asn578:arm-pick:" + study_id + ":" + subject_key) mod K` where `K` is the count of **active** rows in `study_arms` for `study_id`, ordered by `code ASC` (stable tie-breaking).
3. **Persistence:** First assignment inserts `study_assignments`; subsequent visits read the same row.
4. **Session linkage:** `research_sessions.arm_id` and `research_sessions.study_id` are set at session start.

---

## 7. Inclusion and exclusion criteria

**Inclusion**

- Adult participant per recruitment channel rules (Prolific / etc. as executed in recruitment kit).
- Completes consent screen and starts a `research_sessions` row with non-null `study_player_session_id`.

**Exclusion (analysis set — preregistered)**

- Sessions with **fewer than 40 rated items** (incomplete or abandoned) are excluded from the primary confirmatory analysis unless a sensitivity analysis is explicitly opened in a protocol amendment.
- Sessions missing `arm_id` (legacy rows) excluded from arm contrasts.

**Exploratory:** partial sessions may be reported descriptively.

---

## 8. Sample size and power

**Target:** Minimum **N = 80 completed sessions** (40 per arm) before the primary hypothesis is evaluated at the preregistered alpha.

**Power justification (minimum N citation):** For a two-arm comparison of means with \(\alpha = 0.05\) (two-sided) and medium effect size \(d = 0.5\), total \(N \approx 64\) achieves roughly 80% power (classic tables, e.g. Cohen, *Statistical Power Analysis for the Behavioral Sciences*, 1988, Ch. 2–3). We budget **80+** to absorb attrition and mild imbalance from deterministic hashing.

**Stopping:** Data collection may continue beyond 80 for precision; the **primary** inference is first locked at \(N \geq 80\) eligible or at a dated amendment if recruitment stalls.

---

## 9. Primary outcome and analysis plan

**Primary outcome:** Mean rating (1–5) per `research_session_id`, averaged across eligible items in that session.

**Primary test:** Welch two-sample *t*-test (unequal variance) on session-level means between `adaptive_order` and `random_order`. Report mean difference, 95% CI, and Cohen’s *d*.

**Secondary (exploratory, same alpha policy descriptive):** Proportion of items saved; proportion with `boundary_flag = true`.

**Software:** Analysis script will be committed under `scripts/research/` or documented notebook path in a follow-up ASN; raw pull via service role export (`npm run research:export` lineage).

**Multiple comparisons:** One primary test; secondaries labeled exploratory.

---

## 10. Stopping rules and ethics

- Participants may withdraw at any time; partial data retained unless recruitment platform forbids.
- No interim peeking for **efficacy stopping** in v1; monitoring for **safety** (e.g. distress reports) follows recruitment kit escalation.
- Compensation per ASN-581 when enabled; preregistered analysis does not condition on payment status unless amended.

---

## 11. Deviations and amendments

Any change to arms, inclusion thresholds, or primary test after the first recruited completion must be logged as a new **version** of this file with a dated changelog row (OSF amendment pattern).

---

## 12. Copy-paste arm configs (must match DB)

**Arm A — `adaptive_order`**

```json
{"version":1,"orderPolicy":"adaptive_spread","cohortPolicy":"diverse_spread"}
```

**Arm B — `random_order`**

```json
{"version":1,"orderPolicy":"random_shuffle","cohortPolicy":"diverse_spread"}
```

UUIDs (seed migration `01777046492701_study_arms_assignments_asn578.sql`):

- `adaptive_order` → `c0ffee00-0001-4000-8000-0000000000a1`
- `random_order` → `c0ffee00-0001-4000-8000-0000000000b2`

---

## 13. Compensation (implementation cross-reference)

- **Channel (cohort 1):** Prolific — platform handles cash movement; Vela records completion eligibility + webhook correlation (`study_compensation`, `POST /api/study/webhooks/prolific`).
- **Rate card:** Documented in-code at `lib/study/compensation.ts` (default **USD 3.00** per eligible session, overridable via `STUDY_COMPENSATION_USD`).
- **Participant-facing status:** `/study/session/complete?session=…` loads `GET /api/study/compensation/status`.

---

## 14. OSF upload checklist

- [ ] Create OSF project “Vela Study 01 — recruited cohort”
- [ ] Upload this markdown as component
- [ ] Link frozen repo commit SHA after merge
- [ ] Register DOI before opening recruitment (institutional policy dependent)
