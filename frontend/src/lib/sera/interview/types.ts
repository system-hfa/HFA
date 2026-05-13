export type InterviewSectionId =
  | 'narrative'
  | 'perception'
  | 'objective'
  | 'action'
  | 'preconditions'
  | 'closing'

export type InterviewQuestion = {
  id: string
  text: string
  evidence_targets: string[]
  related_sera_dimensions: string[]
  non_leading: boolean
  follow_up_when_missing?: string[]
}

export type InterviewSection = {
  id: InterviewSectionId
  title: string
  purpose: string
  questions: InterviewQuestion[]
}

export type EvidenceMap = {
  perception?: Record<string, boolean | string | string[]>
  objective?: Record<string, boolean | string | string[]>
  action?: Record<string, boolean | string | string[]>
  preconditions?: Record<string, boolean | string | string[]>
  narrative?: Record<string, boolean | string | string[]>
}

export type SufficiencyGate = {
  id: string
  dimension: 'perception' | 'objective' | 'action' | 'preconditions'
  description: string
  evidence_keys: string[]
  minimum: 'required' | 'recommended'
  missing_prompt: string
  related_questions: string[]
}

export type SufficiencyResult = {
  ready: boolean
  missingRequired: SufficiencyGate[]
  missingRecommended: SufficiencyGate[]
  followUpQuestions: string[]
  byDimension: Record<string, {
    ready: boolean
    missingRequired: string[]
    missingRecommended: string[]
  }>
}

export type InterviewRecordingMetadata = {
  recorded: boolean
  consentConfirmed: boolean
  recordingFormat?: 'mp3' | 'm4a' | 'wav' | 'webm' | 'mp4' | 'other'
  durationSeconds?: number
  transcriptionReviewed: boolean
  transcriptionTool?: string
  speakerLabelsAvailable?: boolean
  notes?: string
}

export type InterviewTranscriptInput = {
  transcriptText: string
  recording?: InterviewRecordingMetadata
}
