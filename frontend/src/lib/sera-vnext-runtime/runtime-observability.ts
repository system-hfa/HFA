export type SeraVNextRuntimeEventName =
  | "sera_vnext_runtime_status_requested"
  | "sera_vnext_runtime_status_available"
  | "sera_vnext_runtime_status_disabled"
  | "sera_vnext_runtime_status_denied"
  | "sera_vnext_runtime_status_failed"
  | "sera_vnext_candidate_assessment_requested"
  | "sera_vnext_candidate_assessment_completed"
  | "sera_vnext_candidate_assessment_disabled"
  | "sera_vnext_candidate_assessment_denied"
  | "sera_vnext_candidate_assessment_failed";

export type SeraVNextRuntimeEvent = {
  event: SeraVNextRuntimeEventName;
  requestId?: string;
  tenantId?: string;
  userRole?: string;
  baselineId?: string;
  namespace?: string;
  fixtureCount?: number;
  expectedOutputCount?: number;
  status?: string;
  errorCode?: string;
  durationMs?: number;
  inputLength?: number;
  factsCount?: number;
  timelineCount?: number;
  analysisStatus?: string;
  treeStatus?: string;
};

export function logSeraVNextRuntimeEvent(event: SeraVNextRuntimeEvent): void {
  console.info("[sera-vnext-runtime]", event);
}
