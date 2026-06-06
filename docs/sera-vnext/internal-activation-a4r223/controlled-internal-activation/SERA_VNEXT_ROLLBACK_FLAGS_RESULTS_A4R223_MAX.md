# Rollback Flags Results A4R223-MAX

Sequence:
1. read-only on + pilot on: 200 for authorized equivalent context;
2. pilot off: 404;
3. both server flags off: 404;
4. read-only off + pilot on: 404;
5. controlled restoration of both server flags: 200.

Server handler flags are evaluated per request and required no restart in the trial. The `NEXT_PUBLIC_` diagnostics flag is compiled into the client bundle and requires a development restart/reload or production rebuild for reliable UI deactivation.

No code revert, database cleanup, baseline edit, fixture edit, or persistent data cleanup was required.
