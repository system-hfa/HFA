# SERA vNext Bilingual Evidence Strategy

V02 removes the English-only axis decision dependency by centralizing concepts rather than case names.

Supported language scope:
- `pt-BR`;
- `en`.

Implementation:
- concept names are methodological, not accident-specific;
- regexes are bilingual and concept-scoped;
- evidence extraction tags statements for P/O/A/PRECONDITION in both languages;
- node traversal consumes only evidence usable for the target axis.

Forbidden strategy:
- no case ID patterns;
- no accident-name patterns;
- no expected-output import in runtime;
- no free translation or reconstruction of canonical tree questions.

Known limitation: this is lexical/semantic rule support, not proof of full linguistic coverage. V02 validation therefore reports `language_parity` separately and remains `PASS_WITH_LIMITATIONS`.
