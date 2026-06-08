# SERA Risk Profile API

## GET `/api/risk-profile`

Returns the canonical normalized Risk Profile payload for the authenticated tenant.

Behavior:

- bearer auth required;
- tenant-scoped;
- writes `risk_profile.generated` audit event;
- returns included and excluded source lists;
- does not expose `raw_input`, `narrative`, `engine_output`, `selectedCode`, `releasedCode`, or `finalConclusion`.

## GET `/api/org/intelligence`

Now reuses the same canonical builder used by `/api/risk-profile`.

Purpose:

- keep dashboard/company intelligence aligned with the same real-data universe.

## GET `/api/analyses/risk-profile`

Legacy alias surface now reuses the same canonical builder.

## POST `/api/risk-profile/exclusions`

Payload:

```json
{
  "sourceType": "legacy_event",
  "sourceId": "uuid",
  "reason": "optional"
}
```

Behavior:

- enterprise admin required;
- source must belong to the tenant and the canonical profile universe;
- idempotent when already excluded;
- writes `risk_profile.exclusion_created`.

## DELETE `/api/risk-profile/exclusions/:exclusionId`

Behavior:

- enterprise admin required;
- tenant-scoped restore only;
- sets `restored_at` and `restored_by`;
- writes `risk_profile.exclusion_restored`.
