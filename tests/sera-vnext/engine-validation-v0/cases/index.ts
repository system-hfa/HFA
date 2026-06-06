import type { EngineValidationCase } from '../types'

export const officialCases: EngineValidationCase[] = [
  {
    caseId: 'OFFICIAL-COMAIR-5191',
    title: 'Comair 5191',
    group: 'official',
    sourceType: 'real_event',
    narrative:
      'During taxi for night departure, the crew turned and lined up on runway 26 instead of runway 22. The crew continued the takeoff roll from the wrong runway before the error was recognized.',
  },
  {
    caseId: 'OFFICIAL-ASIANA-214',
    title: 'Asiana 214',
    group: 'official',
    sourceType: 'real_event',
    narrative:
      'On visual approach, the crew allowed the autothrottle to enter HOLD and the aircraft started to deviate below the intended profile. The crew continued the approach without perceiving the developing low-energy state until very late.',
  },
  {
    caseId: 'OFFICIAL-UPS-1354',
    title: 'UPS 1354',
    group: 'official',
    sourceType: 'real_event',
    narrative:
      'During a night approach, the crew left an invalid FMC setup and did not perceive that the expected autopilot mode had not engaged. The aircraft descended below the intended profile before late recovery.',
  },
  {
    caseId: 'OFFICIAL-GAP-004',
    title: 'GAP-004 consequence-as-cause',
    group: 'official',
    sourceType: 'synthetic',
    narrative:
      'The factual account says the crew descended below the glide path despite a warning. Seconds later, the aircraft struck runway lights. The impact and damage are consequences and must not be used as the active failure itself.',
  },
  {
    caseId: 'OFFICIAL-DELTA-191',
    title: 'Delta 191',
    group: 'official',
    sourceType: 'control',
    narrative:
      'During approach in convective weather, the aircraft encountered severe microburst and windshear near the runway. The event remained dominated by the environmental hazard and rapidly changing air mass.',
  },
  {
    caseId: 'OFFICIAL-USAIR-427',
    title: 'USAir 427',
    group: 'official',
    sourceType: 'control',
    narrative:
      'During approach, the aircraft experienced an abrupt uncommanded rudder movement and roll upset. The event developed rapidly with a strong technical-system boundary and the exact human escape point was not clearly established.',
  },
  {
    caseId: 'OFFICIAL-5N-BQJ',
    title: '5N-BQJ',
    group: 'official',
    sourceType: 'control',
    narrative:
      'After offshore departure, the helicopter experienced DAFCS and TRIM FAIL indications with abnormal automation behavior. The crew managed the degraded aircraft and later ditched after the technical condition escalated.',
  },
]

export const humanCases: EngineValidationCase[] = [
  {
    caseId: 'HUMAN-THEBAUD',
    title: 'Thebaud',
    group: 'human',
    sourceType: 'human_applied_reference',
    narrative:
      'A Sikorsky S-92A was conducting an offshore transport flight from Halifax to the Thebaud Central Facility under IFR. The crew attempted two instrument approaches, obtained visual contact, and continued visually in low cloud and poor visibility. Shortly after the visual approach began, the helicopter developed high descent rate and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. The available warning system did not generate an alert in the relevant configuration.',
  },
  {
    caseId: 'HUMAN-CRANK-2026-0001',
    title: '2026-0001 crank event',
    group: 'human',
    sourceType: 'human_applied_reference',
    narrative:
      'During compressor wash support, the pilot decided to start the crank from the cockpit while maintenance activity was being coordinated outside the aircraft. During execution, the pilot moved the lever out of STOP, creating brief ignition and limited rotor movement without a stabilized start and without damage.',
  },
]

export const generalizationCases: EngineValidationCase[] = [
  {
    caseId: 'GEN-G-WNSB',
    title: 'G-WNSB',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'During a night offshore approach in degraded visibility, the crew continued descent with diminishing visual cues until the helicopter reached an unsafe low-energy state close to the water.',
  },
  {
    caseId: 'GEN-EXECUFLIGHT-1526',
    title: 'Execuflight 1526',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'During approach, the crew continued an unstable descent below the intended path despite warnings. Only later did the aircraft impact terrain near the runway.',
  },
  {
    caseId: 'GEN-THEBAUD',
    title: 'Thebaud generalized',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'The crew transitioned from instrument to visual approach in low cloud and poor visibility and then allowed low airspeed and high descent rate to develop before very late recovery. The degraded visual environment remained explicit.',
  },
  {
    caseId: 'GEN-PEL-AIR',
    title: 'Pel-Air',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'A crew continued toward destination with limited weather options and later executed a ditching after fuel state and approach planning became degraded.',
  },
  {
    caseId: 'GEN-FIRST-AIR-6560',
    title: 'First Air 6560',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'During final approach, the crew did not perceive the deviation from the intended track in time and continued toward rising terrain until impact became imminent.',
  },
  {
    caseId: 'GEN-AIR-CANADA-759',
    title: 'Air Canada 759',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'At night, the crew lined up toward the wrong surface while the intended runway remained available. The crew continued until the alignment error was recognized and corrected before landing.',
  },
  {
    caseId: 'GEN-TRANSASIA-GE235',
    title: 'TransAsia GE235',
    group: 'generalization',
    sourceType: 'real_event',
    narrative:
      'After takeoff, the crew faced a propulsion degradation and then made control inputs that did not preserve a safe climb path before the aircraft descended toward obstacles.',
  },
  {
    caseId: 'GEN-TECHNICAL-DOMINANT',
    title: 'technical dominant control',
    group: 'generalization',
    sourceType: 'control',
    narrative:
      'A system failure only scenario removed the available human escape point. The event remained dominated by technical malfunction and no clear crew departure from safe operation was established.',
  },
  {
    caseId: 'GEN-EVIDENCE-INSUFFICIENT',
    title: 'evidence insufficient',
    group: 'generalization',
    sourceType: 'neutral_trial',
    narrative:
      'The aircraft was near the runway. Something abnormal happened. The available summary does not establish who acted, what cues were available, or whether the event was dominated by environment, system, or crew action.',
  },
  {
    caseId: 'GEN-NO-FAILURE',
    title: 'no failure control',
    group: 'generalization',
    sourceType: 'control',
    narrative:
      'During approach, the crew noticed the aircraft was trending low, recognized the warning in time, discontinued the approach, and executed a go-around while preserving safe separation and control.',
  },
]

export const adversarialCases: EngineValidationCase[] = [
  {
    caseId: 'ADV-CONSEQUENCE-AS-CAUSE',
    title: 'consequence as cause',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew had already continued below profile despite a warning. Later, the aircraft struck terrain and was damaged. The damage is only a consequence and not the active failure itself.',
  },
  {
    caseId: 'ADV-POST-ESCAPE-P',
    title: 'post-escape perception hunting',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew continued below profile. After the deviation had already occurred, the crew finally recognized the warning. The later recognition must not be used to place the perception failure after the escape point.',
  },
  {
    caseId: 'ADV-POST-ESCAPE-O',
    title: 'post-escape objective hunting',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew continued the unstable approach below profile. Only after the aircraft was already below profile did the captain decide to go around. That late corrective decision must not be used as the original objective at the escape point.',
  },
  {
    caseId: 'ADV-POST-ESCAPE-A',
    title: 'post-escape action hunting',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew continued below profile. Recovery control inputs occurred after the aircraft had already departed from safe operation. Those later recovery actions must not replace the earlier active departure.',
  },
  {
    caseId: 'ADV-ACTOR-MIGRATION',
    title: 'actor migration',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'Dispatch pressure existed in the background, but the direct departure from safe operation occurred when the crew continued the unstable approach despite warnings.',
  },
  {
    caseId: 'ADV-PRECONDITION-AS-ESCAPE',
    title: 'precondition as escape point',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'Reduced staffing and degraded supervision created vulnerability, but the operational escape point occurred only when the pilot moved the lever out of STOP during crank support.',
  },
  {
    caseId: 'ADV-OE',
    title: 'O-E forbidden axis',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The narrative contains ambiguity about objective framing, but the engine must never emit O-E because that terminal code does not exist in the canonical taxonomy.',
  },
  {
    caseId: 'ADV-VIOLATION-WITHOUT-AWARENESS',
    title: 'violation without awareness',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew lined up on the wrong runway, but the text does not establish that they knowingly violated any rule or were aware of the deviation at that moment.',
  },
  {
    caseId: 'ADV-INVENTED-INTENTION',
    title: 'invented intention',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The text says only that the crew continued the approach. It does not establish schedule pressure, conscious rule rejection, or any deliberate intent to accept risk.',
  },
  {
    caseId: 'ADV-TECHNICAL-DOMINANT',
    title: 'technical dominant',
    group: 'adversarial',
    sourceType: 'control',
    narrative:
      'A sudden automation failure removed the expected control law and no clear human departure from safe operation was established before the technical condition escalated.',
  },
  {
    caseId: 'ADV-ENVIRONMENTAL-DOMINANT',
    title: 'environmental dominant',
    group: 'adversarial',
    sourceType: 'control',
    narrative:
      'Severe windshear and microburst dominated the final approach, rapidly changing energy and flight path in a way that preserved a strong environmental boundary.',
  },
  {
    caseId: 'ADV-NO-FAILURE',
    title: 'no failure',
    group: 'adversarial',
    sourceType: 'control',
    narrative:
      'The crew saw the deviation, recognized the warning in time, and executed a safe go-around without continuing the unstable condition.',
  },
  {
    caseId: 'ADV-INSUFFICIENT-EVIDENCE',
    title: 'insufficient evidence',
    group: 'adversarial',
    sourceType: 'neutral_trial',
    narrative:
      'A brief summary mentions an abnormal event but does not establish the actor, cue, decision, control input, or technical dominance clearly enough for full axis traversal.',
  },
  {
    caseId: 'ADV-PROGRESSIVE-ZONE',
    title: 'progressive zone',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The deviation developed across several moments: unstable indications appeared, the crew continued, and only later did the aircraft drift clearly below the intended profile.',
  },
  {
    caseId: 'ADV-PF-PM',
    title: 'PF PM ambiguity',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew context is clear, but the text does not establish which pilot was flying and which was monitoring when the unstable approach was continued.',
  },
  {
    caseId: 'ADV-AA-AC',
    title: 'A-A versus A-C',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew recognized the trend low in time and executed a go-around, so the response should remain compatible with no-failure or prompt-safe-action framing rather than late feedback failure.',
  },
  {
    caseId: 'ADV-OA-OC',
    title: 'O-A versus O-C',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The text describes continuation of the task but does not establish that the crew knowingly or deliberately chose an unsafe objective despite explicit rule awareness.',
  },
  {
    caseId: 'ADV-PC-PG',
    title: 'P-C versus P-G',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The narrative mentions reduced visibility and warning cues, but it does not establish a knowledge gap or monitoring-failure subtype with enough specificity.',
  },
  {
    caseId: 'ADV-WARNING-IGNORED',
    title: 'warning ignored',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'A warning was available before the crew continued the approach below profile. The later impact must remain quarantined as consequence, but the ignored warning remains relevant evidence.',
  },
  {
    caseId: 'ADV-WRONG-PERCEPTION-COHERENT-ACTION',
    title: 'action coherent with wrong perception',
    group: 'adversarial',
    sourceType: 'synthetic',
    narrative:
      'The crew acted coherently with the state they believed existed, but that perceived state did not match the aircraft energy and profile that were actually developing.',
  },
]

export const allValidationCases = [
  ...officialCases,
  ...humanCases,
  ...generalizationCases,
  ...adversarialCases,
]
