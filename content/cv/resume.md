# Mike West
**Product & Technical Leader · AI-Native Analytics Platforms · Applied Decision Science**
Pittsburgh, PA · mike@peopleanalyst.com · 469.406.4699
linkedin.com/in/michaelcwest · github.com/people-analyst · peopleanalyst.com

---

## Positioning

Mike West designs analytics-native products for domains under-served by data. As founder of **PeopleAnalyst** (since 2012), he's shipped a **15+ application People Analytics Platform** plus consumer products in baby-naming (Namesake), fantasy football (Fourth & 2), and contemplative visual art (Vela) — backed by a published book on the field he helped pioneer (*People Analytics For Dummies*, Wiley 2019) and a 22K LinkedIn audience. Two decades earlier, he stood up People Analytics functions at **Merck** (65K employees, $4B HR investment), **PetSmart** (20K, $40M+), and **Google** (through 7K → 21K growth, Fortune #1 era).

Operationally bilingual across product, technical architecture, behavioral science, decision science, and applied AI. Builds end-to-end: data pipelines and embedding retrieval through to user-facing surfaces and admin tooling. Ships solo when needed; leads teams when scale demands.

**Seeking** founder-track placement (South Park Commons, Entrepreneur First, On Deck, YC Visiting Group) *or* senior product leadership (Senior / Principal / Staff PM, VP Product, Head of Product / AI) at applied-analytics startups, AI-native platform companies, and people-analytics platforms extending into AI. Concurrently applying to PhD programs at Carnegie Mellon (HCII) and University of Pittsburgh.

---

## Distinctive Claims

- **First person** to have worked on three leading workforce-analytics data platforms — **Visier, One Model, ZeroedIn**.
- **Author**, *People Analytics for Dummies* (Wiley, March 2019) — first mainstream book on people analytics. **22K LinkedIn followers**, 97+ published articles, group moderator of the People Analytics Community.
- **Solo founder** of a **20+ application** TypeScript ecosystem spanning enterprise analytics, scholarly research infrastructure, and consumer products — AI-native, hub-and-spoke architecture.
- **Multi-year product leader** (Strategist / Manager / Principal Engineer) at people-data startups (OneModel, OpenComp, AnyComp.AI, Performix) running concurrently with consulting practice.
- **Originated methodologies** adopted in the field: Rapid Collaborative Insight (RCI), Net Activated Value (NAV), Three A's Framework, Lean People Analytics, Full-Stack People Analytics Systems, Quantitative Model of HR.

---

## Selected Recent Product & Technical Work

### People Analytics Platform · 2022–present · solo founder
A 15+ application hub-and-spoke ecosystem. TypeScript throughout. Most repos private.

**Strongest pieces:**

- **Conductor** — Data intelligence orchestrator. AI-powered SQL/Python generation over BigQuery *metadata* rather than examples — model sees schema + business logic, not sample SQL. Tiered metric recipes, field mediation, One Model imports.
- **Calculus** — Persistent batch calculation engine for **210+ HR metrics** across segments and time periods. Most HR analytics products recompute per-dashboard-render; Calculus precomputes + materializes, so 1,000+ manager-level segmentations are instant rather than minutes-long.
- **Reincarnation** — Adaptive Diagnostic System with **RID/SID architecture** for multi-study item management with adaptive learning. Single questions participate in many studies without confounding — commercial survey platforms either silo studies or pool naïvely; this preserves both.
- **VOI Calculator** — Value of Information analysis. Monte Carlo, EVPI/EVSI, AI-assisted decision modeling. **Formal VOI in HR tooling is essentially absent commercially**; this implements the academic framework as production software.
- **Meta-Factory** — Universal Information Factory: cross-domain pipeline transforming any unstructured corpus (PDF, HTML, audio, video) into schema-conformant typed records with provenance and confidence preserved.

**Plus 8 supporting applications:** AnyComp (compensation decision OS), Decision Wizard (Kepner-Tregoe structured decision-making), Survey Respondent (15 question types — MaxDiff, Conjoint, Dual-Slider, NPS, Likert), Preference Modeler, Metric Market (composable card-based viz workbench), Segmentation Studio (HRIS data onboarding + canonical field normalization), Data Anonymizer (deterministic PII anonymization), People Analyst (organizational forecasting).

### Namesake · namesake.baby · 2025–present · live, solo founder
An intentional baby-naming platform. 47,000+ names with 145+ years of SSA popularity data. Name Wizard guided-selection tool, name-intelligence profiles, parallel partner brainstorming, tournament-bracket voting, themed collections, live baby-shower mode.

**Outlier:** built-in research pipeline at **PhD-grade cultural-diffusion rigor** — 5 theoretical frameworks, 13 research questions, 15 external data sources (SSA, OMDB, TMDB, US Census, etc.), 11 phases, 843 cultural events analyzed to model how names go viral. Publication-grade methodology inside a consumer product.

Stack: Next.js 16, Supabase, Vercel, Tailwind, Anthropic API, FAL, OMDB/TMDB, WhoisFreaks. Built solo from blank slate to shipped in 3–4 weeks.

### Vela · vela.study · 2024–present · live, solo founder
A contemplative visual-art platform. 385 active curated works from 6 museum APIs (ARTIC, Met, BnF, Smithsonian, Europeana, Rijksmuseum). Editorial magazine (16 articles, 4 fiction series). Adaptive-intelligence sequenced player. Stripe membership, Transformation Studio revenue loop, partner photographer pipeline.

**Outliers:**
- **$0.13 per research-run** synthesis across 7 sub-questions with primary-source citations, at 30,000+ passage scale. Most "AI research" tools run 10–100× more expensive because they retrieve without pattern-extraction.
- **Dual-grade corpus ingestion** — same database holds curator-grade editorial picks AND research-bulk chunks, distinguished by tag. Solves the documented problem where one corpus serves two categorically different uses.
- **Cryptographic provenance contract** — SHA-256 tracked for every source file; safe-delete invariant requires hash verification on backup *and* durable storage before any local delete.

Stack: Next.js 16, React 19, Tailwind 4, Supabase, Vercel, Modal, Anthropic API.

### Fourth & 2 · `MFL-GM-Consol` · in progress
Fantasy-football intelligence platform. Monorepo: Next.js web (Team / Waiver / League Intelligence / Weekly Strategy / Draft Day / Rankings command centers); Python+FastAPI analytics API (PRISM, CAMS, rankings, decisions); shared TypeScript packages (engine, adapters, 16 analytics card types, typed HTTP client). Side games (The Pick, The Matchup, Survivor) shipped as playable.

Real-world application of the same systematic-decision-science frameworks underlying the People Analytics Platform — proves the patterns transfer to high-volume-decision consumer domains.

### Loom · 2026 · in early build
AI-assisted memoir composition workshop.

**Outlier:** **voice-match with explicit anti-invention constraint.** When a structural rhetorical move requires biographical material the user hasn't supplied, the tool *refuses to render* rather than confabulating — enforced via per-rendering `invented_content[]` array surfaced as warnings, plus a Sonnet critic pass. Unusual for AI-writing tools, which default to producing something over flagging a limitation.

Pattern-first compositional scaffolding retrieves structural moves from a curated memoir corpus *without exposing source sentences* (plagiarism-distance enforcement at two layers — bigram overlap + Sonnet critic). Experience × emotion taxonomy enables cross-axis querying ("scene-setting under shame," "internal monologue under tenderness").

### Commonplace · 2026 · architecture
Scholarly corpus infrastructure. Ingests public-domain primary-source archives — Patrologia Latina (217 volumes via Corpus Corporum), CCEL (38 volumes ANF/NPNF), Sefaria (full Jewish primary corpus), Perseus Digital Library — alongside contemporary academic works. Per-vertical extraction manifests pull relevant passages into downstream editorial products.

**Outlier:** demonstrated **~1000× research capacity amplification** — research questions that would require a scholar weeks of library work return cited synthesis in under 2 minutes at ~$0.13 in API cost.

---

## Product & Technical Capabilities

**AI-Native Product Development** — Retrieval-augmented synthesis pipelines at corpus scale (pgvector, embeddings, structured outputs). Multi-model orchestration (Claude Opus/Sonnet/Haiku, OpenAI embeddings, multi-provider AI Gateway). Agentic workflows with budget + quality trade-offs; structured-output prompt engineering. Modal + Supabase + Vercel deployment patterns for AI workloads. Semantic search, reranking, diachronic semantic drift analysis.

**Decision Science & Quantitative Methods** — Monte Carlo simulation, probabilistic modeling, scenario analysis. Value of Information (EVPI/EVSI), Kepner-Tregoe structured decision-making. Conjoint, MaxDiff, discrete choice modeling. Attrition prediction, survival analysis, compensation modeling. Time-series analysis, predictive modeling, machine learning fundamentals.

**Data Architecture & Platform Engineering** — Postgres + pgvector, BigQuery, Supabase, Modal (Python serverless), Vercel. Hub-and-spoke registries, metric calculation engines at 200+ scale. Ingestion pipelines: PDF/DOCX/EPUB/audio extraction, paragraph-respecting chunking, dual-grade tagging. Row-level security, service-client patterns, migration automation, cryptographic content provenance.

**Product Design & Management** — Multi-surface architecture (player, magazine, admin, partner, API). Admin-over-CLI operational patterns (every script has an admin UI path). Progressive disclosure, curator workflows, taxonomy + content modeling. 15+ applications shipped solo; ecosystem registry maintained as hub. Multi-agent engineering coordination (Claude Code + Cursor + completion-block protocol).

**Program Leadership & Client Delivery** — Founded PeopleAnalyst 2012; 25+ enterprise clients including **Juniper Networks, Mars, Pfizer, Zoom, Reddit, Instabase, Articulate, Nike, Pure Storage, Cityblock Health, 10X Genomics, Atlassian, Udemy, New York Times**. Stood up People Analytics from zero at Merck, PetSmart, Google. Led M&A pay structure reconciliation across 45+ countries (Juniper). Implemented Workday SaaS HRIS at Otsuka: 3 applications consolidated to 1 in under 10 months; $6M monthly payroll, $0 errors.

---

## Career

**PeopleAnalyst** — Founder, Principal Consultant & Product Builder · *Mar 2012 – present* · Pittsburgh, PA *(previously Dallas, Austin, Springfield MO, Portsmouth VA)*
- Founded the first niche people-analytics consulting practice in the US; served 25+ enterprise clients across pharmaceutical, tech, retail, healthcare, media.
- Pivoted to AI-native product development in 2022; shipped a 15+ application platform plus Vela, Loom, Commonplace in adjacent domains.
- Published *People Analytics For Dummies* (Wiley, March 2019); built 22K LinkedIn audience through 97+ published articles.

**The New York Times** — Consultant, Workforce Analytics & Compensation · *Aug 2025 – 2026 (contract, completed)* · Pittsburgh, PA
- Designed a workforce intelligence model integrating merit, incentive, RSU, and discretionary-award data for executive program-design and annual-compensation planning.
- Applied Monte Carlo simulation to compensation scenarios — advanced planning accuracy from "could miss financial targets" to reliable predictions across outcome ranges.
- Participated in implementation of One Model cloud-based people data warehouse.

**OneModel · OpenComp · AnyComp.AI** — Product Strategist / Product Manager / Principal Engineer (concurrent, multi-year) · *2015 – present*
- Multi-year stints at people-data / compensation-analytics startups designing workforce intelligence and compensation decision products.
- AnyComp.AI is own AI-native compensation-decision product line; extension of the PeopleAnalyst Platform.

**Otsuka Pharmaceutical** — Manager, HR Information Systems & People Analytics · *Jan 2010 – Feb 2012* · Princeton, NJ
- Designed HR technology architecture enabling a Japanese conglomerate to launch its first North American pharmaceutical business.
- Led Workday SaaS HRIS implementation: 3 applications combined into 1 in under 10 months; outsourced Benefits + Payroll; live with $6M+ monthly payroll, $0 errors.
- Scaled Otsuka's geographic footprint 10× with constant support headcount.

**AstraZeneca** — Field Researcher, Field Sales · *Oct 2008 – Jan 2010* · Phoenix, AZ
- Pioneered data-driven sales-training evaluation: proved statistically that removing salespeople from the field for sales-data training produced better subsequent performance; led to program expansion.
- Designed dashboards combining previously isolated performance and sales data for executive talent-management discussions.

**Google** — Program Manager, People Analytics · *Jul 2006 – Aug 2008* · Mountain View, CA
- Pioneered People Analytics in Benefits during 7K → 21K growth and Fortune #1 Best Company to Work For era. Insights influenced multi-billion-dollar annual benefits + engagement investment.
- Designed Google's first attrition prediction model.
- Designed Google's first professional global employee survey — precursor to Googlegeist.
- Partnered with BI team on Google's first HR data and reporting environment.

**PetSmart** — Sr. Quantitative Analyst, Talent Management · *Mar 2005 – Jul 2006* · Phoenix, AZ
- Pioneered the Quantitative Analyst role in HR at PetSmart (20K employees, $40M+ HR investment).
- First to connect brand-specific employee measurements to business outcomes in specialty retail: analyzed how store-associate knowledge / engagement / attrition correlated with customer satisfaction and sales.
- Identified store jobs disproportionately critical to sales; redirected performance management, compensation, and training investments accordingly.
- Instrumental in PetSmart's "Mart to Smart" transformation.

**Merck** — Sr. HR Decision Support Analyst, Workforce Planning & Analytics · *Jul 2001 – Mar 2005* · Whitehouse Station, NJ
- Contributed to the development of one of the first corporate HR Analytics functions in the world, for a 65K-employee global workforce and $4B HR investment during Merck's pioneering-early era of data-driven HR.
- First project analyzed e-learning vs. "fly-them-in" training; consensus to standardize on eLearning saved millions — the original instance of what later formalized as Rapid Collaborative Insight (RCI).
- Analytical work across Organization Learning, Talent Management, Workforce Strategy, HR Digitization, Leadership, Engagement, Diversity.

---

## Methodologies & Frameworks (Originated)

> *Placeholder one-liners — these deserve fuller introductions than this section currently allows. Earmarked for a follow-up pass before final.*

- **Rapid Collaborative Insight (RCI)** — combines collaboration with data-driven analysis to guide complex organizations toward optimal decisions faster than either approach alone.
- **Net Activated Value (NAV)** — unifying leadership metric tying quarterly human-capital measurement to dollar outcomes.
- **Three A's Framework** — Attraction, Activation, Attrition as the lifecycle measurement spine for any people-analytics function.
- **Lean People Analytics** — applies leading-edge analytics practices to resource-constrained, rapidly-growing companies; extends Lean methodology into HR.
- **Full-Stack People Analytics Systems** — end-to-end pipeline from data collection through storytelling, treating the analytics function as a software stack rather than a reporting team.
- **Quantitative Model of Human Resources** — mathematical framework for HR resource allocation and investment.
- **CAMS** — *(applied in Fourth & 2 analytics API; full definition pending follow-up pass)*

---

## Publications & Public Work

- ***People Analytics For Dummies*** — Wiley, March 2019. First mainstream book on people analytics.
- **97+ published articles** (LinkedIn, 22K followers) on Lean People Analytics, Talent Acquisition Analytics, the Five Models of People Analytics, HR Metrics, Employee Engagement, People Analytics history & philosophy.
- **People Analytics Community** on LinkedIn — group moderator, thousands of members.
- Conference speaking + podcast appearances.

---

## Education

- **University of Minnesota** — Carlson School of Management. M.A. Human Resources & Industrial Relations, 1999–2001. GPA 3.8. Student exchange: Stockholm School of Economics, Jan–Jun 2001.
- **Northern Arizona University** — B.S. Sociology & Psychology, 1994–1998.

## Certifications

- **SPHR** (Senior Professional Human Resources) — SHRM, 2009
- **CCP** (Certified Compensation Professional) — WorldatWork
- **CMS** (Compensation Management Specialist) — CEBS / Wharton, 2009
- **Targeted Selection** — DDI, 2009
- **MBTI Certified** — Otto Kroeger & Associates, 2003
- **Corporate Online Instruction** — NYU, 2002

---

## Technology & Platforms

**AI & Automation:** Claude (Opus / Sonnet / Haiku), OpenAI, Gemini, Cursor, Replit, Vercel, V0; AI-assisted research workflows; automated ETL pipelines; structured-output prompt engineering; multi-model orchestration via AI Gateway.

**Data & Analytics:** Python, SQL, R, SPSS, Alteryx, Excel, Google Sheets, Postgres + pgvector, BigQuery, embedding retrieval at 30K+ passage scale.

**Workforce Intelligence Platforms:** Visier, One Model, ZeroedIn, LinkedIn Talent Insights, Lightcast (EMSI/Burning Glass), CompAnalyst, Radford, Mercer, WTW.

**Dashboards & Visualization:** Tableau, Power BI, Visier, One Model, MicroStrategy, Cognos.

**HR Systems:** Workday, Oracle HR, PeopleSoft, Greenhouse, Syndio, Payscale, MarketPay.

**Survey & Research:** Qualtrics, Culture Amp, Glint, SurveyMonkey, MaxDiff, Conjoint — plus own survey platform (Survey Respondent, 15 question types).

**Cloud & Infrastructure:** Supabase, Modal (Python serverless), Vercel, Next.js, React 19, TypeScript, Postgres Row-Level Security, Stripe integrations, migration automation.

---

## Current Focus (2026)

Simultaneously: (a) building out the AI-native People Analytics Platform ecosystem; (b) shipping Vela + Loom + Commonplace in adjacent domains; (c) applying to PhD programs at Carnegie Mellon and University of Pittsburgh; (d) seeking founder-track placement OR senior product leadership in applied-analytics startups, AI-native platform companies, and people-analytics platforms extending into AI.

**Open to:** founder-track programs (SPC, EF, On Deck, YC Visiting Group); Senior / Principal / Staff PM at applied-analytics SaaS; VP Product at legacy ERP companies modernizing with analytics + AI; Head of Product / AI at early-stage applied-analytics startups; research-leaning product roles at AI-native platform companies.

**Not currently seeking:** HR Business Partner roles, HR support function roles, traditional HRIS administrator roles, individual-contributor analyst roles.
