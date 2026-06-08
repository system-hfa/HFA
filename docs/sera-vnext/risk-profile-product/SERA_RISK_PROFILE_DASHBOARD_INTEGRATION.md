# SERA Risk Profile Dashboard Integration

## Company Dashboard

`/dashboard` remains backed by `/api/org/intelligence`, but that endpoint now uses the canonical Risk Profile builder.

New dashboard-visible summary:

- canonical universe count;
- considered-in-profile count;
- excluded count;
- modal ERC category.

## Consistency Objective

The dashboard and Risk Profile must no longer diverge on:

- completed analysis count;
- excluded records;
- canonical tenant universe.
