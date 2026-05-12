import perceptionPA from './perception/P-A.json'
import perceptionPB from './perception/P-B.json'
import perceptionPC from './perception/P-C.json'
import perceptionPD from './perception/P-D.json'
import perceptionPE from './perception/P-E.json'
import perceptionPF from './perception/P-F.json'
import perceptionPG from './perception/P-G.json'
import perceptionPH from './perception/P-H.json'
import objectiveOA from './objective/O-A.json'
import objectiveOB from './objective/O-B.json'
import objectiveOC from './objective/O-C.json'
import objectiveOD from './objective/O-D.json'
import actionAA from './action/A-A.json'
import actionAB from './action/A-B.json'
import actionAC from './action/A-C.json'
import actionAD from './action/A-D.json'
import actionAE from './action/A-E.json'
import actionAF from './action/A-F.json'
import actionAG from './action/A-G.json'
import actionAH from './action/A-H.json'
import actionAI from './action/A-I.json'
import actionAJ from './action/A-J.json'

export type SeraRule = {
  code: string
  label: string
  description: string
  priority: number
  positive_evidence: string[]
  negative_evidence: string[]
  exclusive_against: string[]
  requires: string[]
  forbids: string[]
  examples: string[]
  target_fixtures: string[]
}

export const perceptionRules: Record<string, SeraRule> = {
  'P-A': perceptionPA,
  'P-B': perceptionPB,
  'P-C': perceptionPC,
  'P-D': perceptionPD,
  'P-E': perceptionPE,
  'P-F': perceptionPF,
  'P-G': perceptionPG,
  'P-H': perceptionPH,
}

export const objectiveRules: Record<string, SeraRule> = {
  'O-A': objectiveOA,
  'O-B': objectiveOB,
  'O-C': objectiveOC,
  'O-D': objectiveOD,
}

export const actionRules: Record<string, SeraRule> = {
  'A-A': actionAA,
  'A-B': actionAB,
  'A-C': actionAC,
  'A-D': actionAD,
  'A-E': actionAE,
  'A-F': actionAF,
  'A-G': actionAG,
  'A-H': actionAH,
  'A-I': actionAI,
  'A-J': actionAJ,
}

