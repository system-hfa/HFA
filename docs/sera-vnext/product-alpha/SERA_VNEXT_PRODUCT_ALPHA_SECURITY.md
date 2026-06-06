# SERA vNext Product Alpha Security

Date: 2026-06-06
Status: INTERNAL

## Controls

1. feature-flag gated;
2. enterprise-admin gated;
3. request body validation with explicit size limits;
4. URL rejection;
5. executable script rejection;
6. HTML stripping for non-executable tags;
7. secret-like fragment redaction;
8. sanitized logging without full input, tokens, or cookies.

## Denied Conditions

1. flags off -> 404;
2. no auth -> 401;
3. wrong tenant or non-admin -> 403;
4. invalid JSON or invalid text -> 400.

## Non-Goals

1. no public browser flow;
2. no persistence hardening yet;
3. no cross-tenant data access;
4. no final causal release.
