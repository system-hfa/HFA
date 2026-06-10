# HFA Frontend Regression Smoke

Evidence sources:
- canonical-regression-final-with-server.log for real UI/API SERA vNext, event deletion, risk profile, and admin analysis flows;
- frontend-smoke-http-final.log for authenticated HTTP/API smoke over actions and report routes;
- build-after-cleanup.log for route compilation.

Covered routes:
- /dashboard: risk-profile dashboard UI test and event-deletion UI filtering.
- /events: event-deletion UI real flow.
- /events/[id]: event-deletion UI real flow.
- /events/deleted: event-deletion UI real flow.
- /risk-profile: risk-profile UI/API and event-deletion filtering.
- /actions: authenticated HTTP/API smoke plus route render 200.
- /reports/executive: route render 200 in HTTP smoke.
- /reports/event/[id]: synthetic event route render 200 in HTTP smoke.
- /admin/sera-vnext/analyses: Product Beta/API/UI and reviewer output flows.
- /admin/sera-vnext/analyses/[id]: Product Beta/API/UI and reviewer output flows.
- /admin/sera-vnext/analyses/[id]/review: Product Beta UI and reviewer output UI flows.

Extra browser smoke note: an additional temporary Playwright CLI browser script was attempted, but local Firefox and Chromium browser binaries were not installed in that CLI. The HTTP/auth smoke passed and the canonical UI tests had already exercised the main browser flows.
