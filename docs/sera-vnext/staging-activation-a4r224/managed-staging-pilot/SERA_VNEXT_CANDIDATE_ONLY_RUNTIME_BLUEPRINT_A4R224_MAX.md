# Candidate-Only Runtime Blueprint — A4R224-MAX

Status: `CANDIDATE_ONLY_RUNTIME_BLUEPRINT_READY_NOT_EXECUTED`

This blueprint is designed and ready. No implementation was performed in A4R224.

## Purpose

Enable the SERA vNext runtime to accept a candidate aviation occurrence report and return a non-final methodological assessment. This is for internal diagnostic use only, with no DB writes, no classification, and no downstream activation.

## Feature Flag

```
SERA_VNEXT_CANDIDATE_ONLY_ENABLED=false  (default)
```

This flag must be independent of `SERA_VNEXT_READONLY_ENABLED` and `SERA_VNEXT_INTERNAL_PILOT_ENABLED`.

## Entry Contract

```typescript
type SeraVNextCandidateInput = {
  reportId: string;          // internal identifier (not stored)
  narrativeSummary: string;  // sanitized narrative (no personal data)
  tenantId: string;          // from authenticated session
  requestId: string;         // for tracing
}
```

**Not accepted:**
- Full report with P/O/A
- HFACS fields
- Risk/ERC fields
- ARMS/ERC fields
- Recommendations
- Selected/Released codes
- Final conclusions

## Proposed Endpoint

```
POST /api/admin/sera-vnext/candidate
```

**Authorization:** same `requireAdmin` guard as `/status`  
**Flags required:** `SERA_VNEXT_READONLY_ENABLED=true` AND `SERA_VNEXT_CANDIDATE_ONLY_ENABLED=true`

## Response Contract

```typescript
type SeraVNextCandidateResponse = {
  requestId: string;
  status: "CANDIDATE_ASSESSMENT_NON_FINAL";
  baselineId: "SERA_VNEXT_BASELINE_V0";
  tenantId: string;           // echoed for tracing, not stored
  assessment: {
    candidatePattern: string | null;   // non-final only
    boundaryWarnings: string[];
    methodologicalNotes: string[];
    nonFinalConfirmations: string[];
  };
  selectedCode: null;           // always null
  releasedCode: null;           // always null
  finalConclusion: null;        // always null
  classifiedOutput: false;      // always false
  productIntegrated: false;     // always false
  downstreamAllowed: false;     // always false
  dbWrite: false;               // always false
  storedInDb: false;            // always false
}
```

## Isolation Requirements

- No DB write of any kind
- No `selectedCode` creation
- No `releasedCode` creation
- No `finalConclusion` creation
- No `CLASSIFIED` state
- No `READY` state
- No downstream activation
- No HFACS, Risk/ERC, ARMS/ERC, recommendations
- Tenant isolation: response limited to calling tenant's context
- No synthetic-real blending
- No modification of baseline or fixtures

## Observability

New event: `sera_vnext_candidate_assessment_requested`  
New event: `sera_vnext_candidate_assessment_completed`  
New event: `sera_vnext_candidate_assessment_denied`

## Not Implemented in A4R224

This blueprint is preparation only. Implementation requires:
1. Explicit authorization for A4R225 or equivalent
2. New feature flag provisioned and validated
3. Candidate input parser
4. Non-final assessment engine (read-only against baseline)
5. Full authorization matrix test
6. Observability validation
7. Integrity validation post-candidate run
