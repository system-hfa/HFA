# SERA vNext Engine V01 to V02 Divergences

V01 remains a historical boundary regression suite. After v02 corrections it reports:

```text
SERA_VNEXT_ENGINE_V01_VALIDATED_WITH_NONCRITICAL_LIMITATIONS
pass=37
noncritical=2
critical=0
```

The two noncritical divergences are computed guardrail detections:
- `GEN-FIRST-AIR-6560`: `consequenceUsedAsCause`;
- `ADV-OE`: `oeUsed`.

Reason: v01 expected guardrails to remain static false. V02 makes guardrails real. The v01 comparator now records these as noncritical historical divergences instead of blocking Product Beta.

Other key divergences:
- O-B/O-C no longer arise from continuation without awareness.
- pt-BR evidence can answer P/O/A branches.
- all active leaves have positive and negative reachability coverage.
- A capability branches no longer default to SIM without positive evidence.
