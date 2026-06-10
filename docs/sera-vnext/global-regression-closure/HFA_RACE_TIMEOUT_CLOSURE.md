# HFA Race Timeout Closure

Observed issues:
- Raw diagnostic loops failed real UI/API tests when the local frontend server was absent.
- First server-backed canonical run timed out expanded-cohort-runner at the old 180s budget.
- First server-backed purge execution run lacked the explicit synthetic purge flag and correctly failed closed.

Fixes:
- Canonical runner checks LOCAL_FRONTEND_SERVER reachability and required environment.
- REAL_UI and REAL_API timeout budget is 480s; REAL_DB is 240s; static/unit/contract remains 180s.
- Synthetic purge execution is run only with EVENT_PURGE_SYNTHETIC_EXECUTE_ENABLED=true.

Final gate: race_timeouts=0 in canonical-regression-final-with-server.log.
