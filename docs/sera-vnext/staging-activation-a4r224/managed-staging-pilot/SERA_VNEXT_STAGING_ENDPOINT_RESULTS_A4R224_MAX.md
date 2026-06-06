# Staging Endpoint Results — A4R224-MAX

## Route

```
GET /api/admin/sera-vnext/status
```

## Validated Response Shape

```json
{
  "enabled": true,
  "status": "AVAILABLE",
  "baselineId": "SERA_VNEXT_BASELINE_V0",
  "namespace": "sera-vnext",
  "fixtureCount": 7,
  "expectedOutputCount": 7,
  "positiveFixtureCount": 3,
  "syntheticFixtureCount": 1,
  "controlFixtureCount": 3,
  "classificationEnabled": false,
  "productIntegrated": false,
  "downstreamAllowed": false,
  "warnings": [
    "BOUNDARY_WARNING_REQUIRED",
    "CONTROL_ONLY",
    "NO_SYNTHETIC_REAL_BLENDING",
    "SYNTHETIC_ONLY",
    "automation / 500 ft gate must remain explicit",
    "setup/FMC/V-S/MDA separation required"
  ]
}
```

## Load Results

| Batch | Calls | Min ms | Avg ms | p95 ms | Max ms | 5xx |
|---|---|---|---|---|---|---|
| Sequential | 50 | 0.10 | 0.29 | 0.51 | 3.78 | 0 |
| Concurrent (2 × 50) | 100 | 5.15 | 5.27 | 5.41 | 5.46 | 0 |
| Unauthorized | 25 | 0.02 | 0.04 | 0.05 | 0.28 | 0 |
| Tenant mismatch | 25 | 0.02 | 0.04 | 0.05 | 0.21 | 0 |
| Activation cycles | 10 | — | — | — | — | 0 |

## Authorization Status Codes

| Scenario | Expected | Actual | Result |
|---|---|---|---|
| Authorized admin enterprise | 200 | 200 | PASS |
| Unauthorized (no token) | 401 | 401 | PASS |
| Common user | 403 | 403 | PASS |
| Non-enterprise admin | 403 | 403 | PASS |
| Tenant divergent | 403 | 403 | PASS |
| Flags off | 404 | 404 | PASS |

## Mandatory Warnings Confirmed

| Warning | Present |
|---|---|
| Asiana automation / 500 ft | YES — `automation / 500 ft gate must remain explicit` |
| UPS setup/FMC/V-S/MDA | YES — `setup/FMC/V-S/MDA separation required` |
| GAP-004 synthetic-only | YES — `SYNTHETIC_ONLY` |
| Controls control-only | YES — `CONTROL_ONLY` |

## Forbidden Fields Absent

selectedCode: absent  
releasedCode: absent  
finalConclusion: absent  
CLASSIFIED: absent  
READY: absent  
tokens/cookies/stack: absent  
P/O/A: absent  
personal data: absent

## Determinism

Payload is identical across all 150 authorized calls. No mutation detected across 10 on/off activation cycles.

## Cache Control

Response header: `Cache-Control: no-store` confirmed.
