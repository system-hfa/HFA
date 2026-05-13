import { assessInterviewSufficiency } from '../../frontend/src/lib/sera/interview/assess-sufficiency'
import type { EvidenceMap } from '../../frontend/src/lib/sera/interview/types'

type TestCase = {
  name: string
  evidence: EvidenceMap
  expectReady: boolean
  expectMissingRequiredGt?: number
  expectFollowUpGt?: number
  expectMissingRecommendedGt?: number
}

const cases: TestCase[] = [
  {
    name: 'empty evidence map',
    evidence: {},
    expectReady: false,
    expectMissingRequiredGt: 0,
    expectFollowUpGt: 0,
  },
  {
    name: 'minimum required evidence populated',
    evidence: {
      perception: {
        available_information_described: true,
        monitoring_or_checking_described: true,
      },
      objective: {
        stated_goal_described: true,
        procedural_intent_described: true,
      },
      action: {
        concrete_action_described: true,
        own_action_result_verification_checked: true,
      },
      preconditions: {
        workload_context_described: true,
      },
    },
    expectReady: true,
  },
  {
    name: 'perception incomplete — available_information and monitoring missing',
    evidence: {
      perception: {
        sensory_conditions_described: true,
        attention_load_described: true,
      },
      objective: {
        stated_goal_described: true,
        procedural_intent_described: true,
      },
      action: {
        concrete_action_described: true,
        own_action_result_verification_checked: true,
      },
      preconditions: {
        workload_context_described: true,
      },
    },
    expectReady: false,
    expectMissingRequiredGt: 0,
  },
]

let failed = false

for (const testCase of cases) {
  const result = assessInterviewSufficiency(testCase.evidence)

  let passed = true
  const errors: string[] = []

  if (result.ready !== testCase.expectReady) {
    passed = false
    errors.push(`ready: expected ${testCase.expectReady}, got ${result.ready}`)
  }

  if (testCase.expectMissingRequiredGt !== undefined && result.missingRequired.length <= testCase.expectMissingRequiredGt) {
    passed = false
    errors.push(`missingRequired: expected > ${testCase.expectMissingRequiredGt}, got ${result.missingRequired.length}`)
  }

  if (testCase.expectFollowUpGt !== undefined && result.followUpQuestions.length <= testCase.expectFollowUpGt) {
    passed = false
    errors.push(`followUpQuestions: expected > ${testCase.expectFollowUpGt}, got ${result.followUpQuestions.length}`)
  }

  if (testCase.expectMissingRecommendedGt !== undefined && result.missingRecommended.length <= testCase.expectMissingRecommendedGt) {
    passed = false
    errors.push(`missingRecommended: expected > ${testCase.expectMissingRecommendedGt}, got ${result.missingRecommended.length}`)
  }

  if (passed) {
    console.log(`PASS ${testCase.name}`)
  } else {
    failed = true
    console.error(`FAIL ${testCase.name}`)
    for (const e of errors) console.error(`  ${e}`)
  }
}

if (failed) process.exit(1)

console.log('PASS all interview sufficiency static cases')
