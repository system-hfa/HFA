# SERA Evidence Intake & Interview Protocol

## What this module is

This module supports structured evidence collection **before** SERA analysis. It provides:

- a semi-structured interview guide for investigators;
- a question bank organized by SERA dimension;
- sufficiency gates that evaluate whether collected evidence is adequate to run analysis;
- structured output format for interview transcripts and evidence maps;
- didactic documentation for investigators unfamiliar with SERA.

The goal is to improve the quality of information that feeds the SERA pipeline — not to replace the analyst.

## What this module is not

- **Not a classifier.** It does not assign P, O, A, or ERC codes.
- **Not a substitute for the analyst.** A trained SERA analyst must interpret the evidence and run the pipeline.
- **Not a leading-question engine.** Questions must be neutral and factual.
- **Not a culpability tool.** It does not decide responsibility, blame, or disciplinary outcomes.
- **Not a replacement for the SERA pipeline.** Evidence collected here feeds `pipeline.ts`; it does not bypass it.

## Why interviews matter

Raw event reports frequently omit details that are methodologically critical:

- which information was **available** to the operator at the time;
- whether the operator **saw, heard, or understood** that information;
- what **objective** was being pursued (routine completion, time saving, human protection);
- whether there was an **informal or normalized practice** involved;
- whether **communication, readback, or acknowledgement** occurred;
- whether the operator **verified the result of their own action**;
- whether the failure involved **supervision, delegation, or a third party**;
- which **preconditions** (workload, time pressure, equipment, training, supervision) were present.

Without this context, the SERA pipeline may misclassify — for example:

| Ambiguity | Without interview | With interview |
|---|---|---|
| P-G vs P-C | Cannot tell if information was available | Confirmed available → P-G |
| O-B vs O-D | Cannot tell if practice was habitual | Confirmed routine → O-B |
| A-J vs A-C | Cannot tell if failure was communication or own-action check | Confirmed no radio → A-C |
| P-D vs P-E | Cannot tell if demand was high or just time was short | No concurrent events → P-E |

The semi-structured interview reduces these ambiguities without inducing answers.

## Interview principle

> "A entrevista deve coletar fatos observáveis para reduzir ambiguidade metodológica. A classificação SERA ocorre depois."

The investigator asks about observable facts: what was available, what was perceived, what was intended, what was done, what was verified, what pressures existed. The analyst classifies afterward.

## Non-leading questions

Questions must avoid:

- SERA codes: "Was it P-D?", "Was this A-C?"
- Judgemental framing: "Why did you violate?", "Why didn't you pay attention?"
- Culpability framing: "Who made the error?", "Why did you neglect the checklist?"
- Induced classification: "Was this a communication failure?", "Were you distracted?"

Questions should use neutral, observable framing:

- "What information was available at that moment?"
- "What were you trying to accomplish?"
- "What action did you take?"
- "Did you check the result of that action?"
- "Were there other demands at that moment?"

## Audio recording and transcription

Interviews should be recorded in audio whenever permitted by law, organizational policy, and the interviewee's consent.

**Why record:**
- Reduces loss of detail that note-taking alone cannot capture.
- Allows review of phrasing, pauses, and corrections.
- Enables multiple reviewers to verify evidence without conducting another interview.
- Prevents investigator bias in note-taking from distorting the evidence map.

**Transcription:**
- The audio must be **transcribed before use by the HFA**.
- Transcripts must be **reviewed by a human** — automated transcription can alter methodologically significant terms.
- Transcription should preserve:
  - who is speaking (investigator / interviewee);
  - temporal sequence;
  - relevant pauses;
  - uncertainties expressed by the speaker;
  - technical terms as spoken;
  - inaudible segments, marked as `[inaudível]`.

### Simple transcription options

| Option | Notes |
|---|---|
| Manual transcription after recording | Most reliable; slow |
| Google Docs voice typing | Free; requires internet; review carefully |
| Microsoft Word / Office Transcribe | Available in some Office 365 plans |
| Local Whisper (open source) | High quality; runs locally; org must permit |
| Mobile recorder + manual review | Good for field interviews |

**Practical recommendations:**
- Use a microphone close to the speaker.
- Record in a quiet environment.
- Identify interviewer and interviewee at the start of the recording.
- Save audio in a common format: `m4a`, `mp3`, or `wav`.
- After transcription, review proper nouns, technical terms, times, and equipment names.
- Mark uncertain passages as `[verificar termo]`.

### Future HFA audio upload

In a future version, HFA may allow direct audio upload:

1. Investigator uploads audio file via the HFA interface.
2. The system sends audio to a transcription service (e.g., Whisper API).
3. The transcript appears on screen for **human review before use**.
4. After review and correction, the transcript feeds the evidence map and sufficiency gates.
5. Only after the evidence map is populated does the SERA pipeline run.

Audio upload will require:
- explicit interviewee consent, recorded in the system;
- access control (only authorized investigators);
- a clear retention and deletion policy;
- the transcript must never bypass human review before SERA analysis.

## Output

After the interview, the investigator should convert the transcript into a structured **evidence map**:

```typescript
{
  perception: {
    available_information_described: true,
    sensory_conditions_described: true,
    attention_load_described: false,  // follow-up needed
  },
  objective: {
    stated_goal_described: true,
    routine_or_normalized_practice_checked: true,
  },
  action: {
    concrete_action_described: true,
    own_action_result_verification_checked: false,  // follow-up needed
  },
  preconditions: {
    workload_context_described: true,
    time_pressure_described: false,
  }
}
```

The `assessInterviewSufficiency()` function evaluates this map against the sufficiency gates and returns:
- `ready`: whether required evidence is present;
- `missingRequired`: gates that must be resolved before analysis;
- `missingRecommended`: gates that improve quality but are not blocking;
- `followUpQuestions`: prompts to send back to the investigator.

## Integration roadmap

| Phase | Status | Description |
|---|---|---|
| 1 | ✅ Current | Question bank, sufficiency gates, evidence map types, `assessInterviewSufficiency` |
| 2 | Planned | Interview transcript → evidence map extraction (NLP-assisted) |
| 3 | Planned | Audio upload → transcription → human review → evidence map |
| 4 | Planned | Sufficiency gate blocks pipeline start if required evidence is missing |
| 5 | Planned | Investigator-type-specific question routing (operator, supervisor, dispatcher) |
| 6 | Planned | Multi-interview triangulation for the same event |
