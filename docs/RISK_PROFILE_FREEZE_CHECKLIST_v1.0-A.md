# Risk Profile Freeze Checklist v1.0-A

## Git state
- [x] HEAD == origin/main
- [x] working tree clean (sem tracked modified)
- [x] baseline commit recorded (`15c0e450`)

## Protected areas
- [x] motor untouched (`pipeline.ts`, `all-steps.ts`, `rules/erc/levels.json`)
- [x] fixtures untouched (`tests/sera/fixtures`)
- [x] baseline untouched (`tests/reports/baseline`)
- [x] schema untouched (`schema/migrations`)

## API
- [x] fields documented (`score`, `distribution`, `top_preconditions`, `top_combinations`, `actions`, `trend`, `modal_erc_level`, `safety_issue_candidates`, `quality_trend`, `data_confidence`, `alerts`)
- [x] no breaking changes
- [x] new fields additive

## UI
- [x] panel order documented
- [x] methodological caveats present
- [x] no overclaiming risk

## Methodology
- [x] ERC scale documented (legacy vs HFA category)
- [x] SIRA not claimed
- [x] Safety Issue Candidates caveated
- [x] trend caveated (`quality_trend` não é probabilidade)
- [x] confidence caveated (`data_confidence` não é risco)

## Tests
- [x] all seven unit/contract suites pass
- [x] risk checker default pass
- [x] risk checker strict pass
- [x] typecheck status recorded (`frontend` `npx tsc --noEmit` PASS; TS6053 não reproduzido neste freeze)

## Known limitations
- [x] exposure missing documented
- [x] external validation pending documented
- [x] TS6053 infra noted
