# AGENTS.md — HFA/SERA Operational Rules

This repository contains the HFA/SERA system.

These instructions apply to AI coding agents, documentation agents, and terminal-based assistants working in this repository.

---

## 1. Repository identity

Project: HFA/SERA  
Repository path usually used by the owner: `/Users/filipedaumas/SAAS/HFA`  
Main branch: `main`

HFA/SERA is a methodology and product for human factors analysis, event investigation, SERA causal classification, preconditions, risk profiling, and safety management support.

---

## 2. Current protected methodological baseline

The causal SERA baseline is protected.

Protected causal scope:

```text
P/O/A + preconditions
```

Protected causal chain:

```text
event narrative
→ safe operation escape point
→ unsafe act / unsafe condition
→ direct actor
→ perception / objective / action statements
→ P/O/A classification
→ preconditions
→ decision_trace
→ limitations
→ recommendations
→ human review
```

The HFA Risk Layer is separate and future-facing:

```text
erc_level
traditional risk matrix
ARMS/ERC
risk profile aggregation
organizational dashboards
risk-layer redesign
```

Do not mix causal baseline work with A5 Risk Layer work unless explicitly instructed.

---

## 3. Permanent operational rules

Before any task, run:

git status --short
git rev-parse HEAD origin/main
git log --oneline -5

Stop and report if:

* branch is not main, unless the prompt explicitly authorizes another branch;
* HEAD differs from origin/main, unless the prompt explicitly expects this;
* there are unexpected tracked modifications;
* protected areas are modified unexpectedly.

Never use:

git add .

Always stage files explicitly.

Do not commit or push unless explicitly instructed.

---

## 4. Protected areas

Do not alter these unless the prompt explicitly authorizes it:

frontend/src/lib/sera/*
tests/sera/fixtures/*
tests/reports/baseline/*
supabase/migrations/*
frontend/src/app/api/*
billing / Stripe-related files
Risk Profile API/UI contract files

Do not alter:

SERA engine
P/O/A logic
baseline reports
official fixtures
candidate JSONs
risk-layer code
database schema

unless a phase explicitly authorizes that scope.

---

## 5. Validation discipline

Do not run global smoke unless explicitly requested.

Use narrow validation appropriate to the phase.

For documentation-only phases:

git status --short
git diff --stat
git diff --cached --stat

For Markdown docs, check for broken code fences when relevant:

````text
python3 - <<'PY'
from pathlib import Path
files = [p for p in Path("docs").glob("*.md")]
ok = True
for p in files:
    ticks = "``" + "`"
    fences = p.read_text(errors="ignore").count(ticks)
    if fences % 2 != 0:
        print(f"ERROR: odd Markdown fences in {p}: {fences}")
        ok = False
if not ok:
    raise SystemExit(1)
print("Markdown fence check OK")
PY
````

For TypeScript/code phases, run only the checks specified in the task.

---

## 6. Methodological source rules

Hendy/SERA is the primary source for causal logic.

Daumas is operationalization and applied improvement, especially for offshore/MDC context.

HFACS and DoD HFACS are comparative taxonomies and evidence vocabularies. They must not automatically determine SERA P/O/A.

Real accident/incident reports are factual sources. Their probable causes, conclusions, recommendations and HFACS labels must not become SERA expected values automatically.

ICAO/ANAC/SMS/SGSO materials support safety management, defences, assurance and organizational analysis.

ARMS/ERC/OGP materials belong mainly to future A5 Risk Layer.

---

## 7. Real report harvest rules

When extracting events from reports, always separate:

1. factual evidence
2. original report analysis/conclusions to quarantine
3. SERA candidate hypothesis

Do not create fixture JSONs directly from reports.

Do not assign expected P/O/A values directly from report conclusions.

Do not convert HFACS labels into P/O/A.

Use the protocols:

docs/SERA_SOURCE_PRIORITY_REGISTER_v0.1.4.md
docs/SERA_METHOD_SOURCE_SYNTHESIS_v0.1.4.md
docs/SERA_HFACS_CROSSWALK_v0.1.4.md
docs/SERA_REAL_REPORT_EXTRACTION_PROTOCOL_v0.1.4.md
tests/sera/real-event-index-template.md

---

## 8. Candidate and baseline rules

PARTIAL is not PASS.

Noisy provider runs are not methodological evidence.

Reports contaminated by timeout, termination, empty actual output, or provider instability must be treated as:

NOISY_PROVIDER_RUN

Candidates are instruments for testing methodology. They are not methodology.

Do not change methodology merely to make a candidate pass.

Do not promote candidates to baseline without explicit human review and authorization.

---

## 9. Commit rules

Before staging:

git status --short
git diff --stat

Stage explicitly, for example:

git add path/to/file.md

Before commit:

git diff --cached --name-status
git diff --cached --stat

Confirm:

* only intended files are staged;
* no protected files are staged accidentally;
* no untracked local artifacts are staged accidentally.

Never commit:

tests/reports/candidates/
tests/reports/run-*.json
local handoff zips
temporary folders
private credentials
.env files

Commit messages should be scoped, for example:

docs(sera): ...
test(sera): ...
fix(sera): ...
feat(product): ...
chore(repo): ...

---

## 10. Current expected local untracked items

These may appear locally and should not be automatically committed unless explicitly instructed:

tests/reports/candidates/

If AGENTS.md is already versioned, it should no longer appear as untracked.

---

## 11. Language policy

Technical methodology documents may be written in English to preserve alignment with SERA, HFACS, ICAO, SMS, ARMS and internationalization.

Brazilian Portuguese may be used for user-facing product copy, client reports, UI, training material, and local operational guidance.

Do not translate technical terms in a way that changes their methodological meaning.

---

## 12. Default response requirements for agents

At the end of a phase, report:

branch
HEAD
origin/main
HEAD == origin/main?
files created/changed
validation performed
what was not changed
status of untracked files
commit/push status

Be explicit about uncertainty and scope limits.

Do not claim work was done if it was not validated.

---

## 13. Canonical SERA/CERA Tree Rule

Never invent, approximate, summarize, freely translate, reorder, or reconstruct SERA/CERA decision-tree questions.

For any reference case, calibration trace, questionPath, adjudication proof, author-approval evidence, or front-end calibration artifact:

- use exact canonical tree questions only;
- record `canonicalTreeSource`, `nodeId` (when available), `exactQuestionTextPT`, `exactQuestionTextENAnchor`, selected answer, and next node/leaf;
- if exact canonical question or node is missing, stop and mark:
  - `REAL_TREE_MISSING` or `CANONICAL_NODE_MISSING`
  - `BLOCKED_BY_MISSING_CANONICAL_TREE`
  - `DO_NOT_BUILD_REFERENCE_TRACE`

Generic or reconstructed question flows are invalid for reference/front-end/methodology-proof use.
