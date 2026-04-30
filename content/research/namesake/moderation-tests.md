---
title: "Moderation Tests: Heterogeneity in Causal ATEs"
description: "Which kinds of names and events show the strongest cultural adoption effects? Systematic moderator analysis across the causal ATE panel."
publishedAt: "2026-04-13"
status: published
authors: ["Namesake Research"]
category: report
---

## Moderation Tests: Heterogeneity in Causal ATEs

Each test examines whether the causal adoption effect (ATE from Phase 8a) varies systematically with a moderator variable.

| # | Moderator | Effect Size | t/F-stat | p-value | n | Significant? |
|---|-----------|-------------|----------|---------|---|-------------|
| 1 | syllable_count | 0.0129 | 0.86 | 0.4645 | 200 | No |
| 2 | origin | 0.1196 | 1.63 | 0.0689 | 196 | No |
| 3 | rarity | 0.6311 | 83.40 | 0.0000 | 200 | Yes |
| 4 | trajectory | 0.0102 | 1.02 | 0.3631 | 200 | No |
| 5 | is_fictional_origin | -0.0000 | -0.20 | 0.8409 | 200 | No |
| 6 | is_unisex_num | 0.0002 | 3.61 | 0.0004 | 200 | Yes |
| 7 | is_place_name | 0.0000 | 0.00 | 1.0000 | 200 | No |
| 8 | phonetic_neighborhood_size | 0.0000 | 0.71 | 0.4800 | 162 | No |
| 9 | sex_pct_male | -0.0000 | -1.21 | 0.2285 | 200 | No |

### 1. syllable_count

ANOVA across 4 levels of syllable_count. Eta^2=0.0129. Group means: 1: -0.000011 (n=19), 2: 0.000058 (n=123), 3: 0.000083 (n=49), 4: 0.000232 (n=9)

Not significant (p=0.464). The adoption effect does not vary systematically with syllable_count.

### 2. origin

ANOVA across 16 levels of origin. Eta^2=0.1196. Group means: Arabic: -0.000029 (n=4), Celtic: 0.000180 (n=21), English: -0.000027 (n=47), French: -0.000050 (n=8), Germanic: 0.000024 (n=10), Greek: -0.000085 (n=7), Hebrew: 0.000291 (n=20), Irish: 0.000006 (n=12), Italian: 0.000024 (n=3), Latin: 0.000114 (n=20), Literary: -0.000029 (n=14), Mythological: -0.000059 (n=3), Persian: 0.000008 (n=4), Sanskrit: -0.000004 (n=7), Scottish: 0.000483 (n=7), Spanish: 0.000060 (n=9)

Not significant (p=0.069). The adoption effect does not vary systematically with origin.

### 3. rarity

ANOVA across 5 levels of rarity. Eta^2=0.6311. Group means: very_common: 0.001322 (n=10), common: 0.000231 (n=29), moderate: 0.000036 (n=30), rare: -0.000054 (n=82), very_rare: -0.000071 (n=49)

**Significant at p<0.05.** This moderator explains meaningful heterogeneity in how cultural events translate to adoption effects.

### 4. trajectory

ANOVA across 3 levels of trajectory. Eta^2=0.0102. Group means: declining: 0.000004 (n=45), flat: 0.000048 (n=48), rising: 0.000099 (n=107)

Not significant (p=0.363). The adoption effect does not vary systematically with trajectory.

### 5. is_fictional_origin

OLS coefficient of is_fictional_origin on ATE: beta=-0.000045, t=-0.20, p=0.8409

Not significant (p=0.841). The adoption effect does not vary systematically with is_fictional_origin.

### 6. is_unisex_num

OLS coefficient of is_unisex_num on ATE: beta=0.000209, t=3.61, p=0.0004

**Significant at p<0.05.** This moderator explains meaningful heterogeneity in how cultural events translate to adoption effects.

### 7. is_place_name

Error: index 1 is out of bounds for axis 0 with size 1

Not significant (p=1.000). The adoption effect does not vary systematically with is_place_name.

### 8. phonetic_neighborhood_size

OLS coefficient of phonetic_neighborhood_size on ATE: beta=0.000000, t=0.71, p=0.4800

Not significant (p=0.480). The adoption effect does not vary systematically with phonetic_neighborhood_size.

### 9. sex_pct_male

OLS coefficient of sex_pct_male on ATE: beta=-0.000001, t=-1.21, p=0.2285

Not significant (p=0.229). The adoption effect does not vary systematically with sex_pct_male.


*2 of 9 moderation tests significant at p<0.05. Analysis based on 200 events.*
