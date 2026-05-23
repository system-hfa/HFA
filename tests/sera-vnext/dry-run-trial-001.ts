import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../frontend/src/lib/sera-vnext'

const narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

async function main() {
  const result = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative,
    locale: 'en',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })

  console.log(JSON.stringify(result, null, 2))

  assert.ok(result.engineVersion, 'engineVersion missing')
  assert.ok(result.unsafeState?.operationalUnsafeState, 'unsafeState.operationalUnsafeState missing')
  assert.ok(Array.isArray(result.unsafeState?.decisionAntecedents), 'unsafeState.decisionAntecedents missing')
  assert.ok(result.unsafeActCondition, 'unsafeActCondition missing')

  assert.equal(result.poaClassification.perception.selectedCode, 'NOT_CLASSIFIED', 'perception unexpectedly classified')
  assert.equal(result.poaClassification.objective.selectedCode, 'NOT_CLASSIFIED', 'objective unexpectedly classified')
  assert.equal(result.poaClassification.action.selectedCode, 'NOT_CLASSIFIED', 'action unexpectedly classified')

  const resultAny = result as unknown as Record<string, unknown>
  for (const forbidden of ['hfacs', 'erc_level', 'risk', 'arms']) {
    assert.ok(!(forbidden in resultAny), `forbidden key present in output: ${forbidden}`)
  }

  assert.equal(result.humanReview.required, true, 'humanReview.required must be true')
  assert.notEqual(result.causalAssurance.status, 'PASSED', 'causalAssurance must not be PASSED')

  console.log('SERA vNext Trial 001 dry-run PASS')
}

main().catch((error) => {
  console.error('SERA vNext Trial 001 dry-run FAIL')
  console.error(error)
  process.exit(1)
})
