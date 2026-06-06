# A4R218 Read-Only Runtime Adapter

This directory contains a test-side adapter for reading the official SERA vNext baseline v0 artifacts.

The adapter is deliberately isolated under `tests/sera-vnext/runtime-adapter/`. It reads baseline, fixture-set, and expected-output JSON files from `process.cwd()`, validates lock flags, and returns a summary. It does not write files, import product runtime code, import API/UI code, or produce downstream outputs.

Status: `READY_FOR_SEPARATE_RUNTIME_READ_ONLY_INTEGRATION_AUTHORIZATION`
