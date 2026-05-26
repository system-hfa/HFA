# HELIOS-522 Provisional Revised Gate A4R161

## Metadata
- eventId: HELIOS-522
- eventName: Helios 522
- sourceAuthorizationFromA4R158: AUTHORIZED_WITH_CAUTION
- authorDecisionFromA4R160: REVISE_GATE
- finalGateStatus: REVISED_GATE_PROVISIONAL_AUTHOR_REVIEW_REQUIRED
- futurePOAStatus: NOT_OPENED

## Applied Quando
"Quando a aeronave iniciou/continuou a subida com o sistema de pressurizacao em estado nao defensavel e, no intervalo que culmina no warning de altitude de cabine, nao houve restauracao do estado seguro antes da incapacitacao posterior, a operacao deixou de estar em trajetoria segura/defensavel."

## Change from A4R159
- revised gate applied.
- A4R159 text could be interpreted as warning-centered.
- A4R161 formalizes interval logic from unsafe pressurization state to warning marker.

## Methodological rationale
- avoids impact/flameout as gate point.
- avoids cabin warning as automatic single-point gate.
- avoids official probable-cause text as SERA gate key.
- avoids P/O/A leakage and keeps interval-based gate semantics.

## Remaining cautions
- MUST remain UNCERTAIN_INTERVAL.
- must not be collapsed into cabin altitude warning alone.

## Future use rule
- futurePOACandidate: ONLY_AFTER_SECOND_AUTHOR_CONFIRMATION
- cannot be used for P/O/A unless second author confirmation is recorded.

## Explicit locks
- NO_P_O_A
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS
