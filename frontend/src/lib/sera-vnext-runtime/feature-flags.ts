function readBooleanEnv(name: string): boolean {
  const value = process.env[name]?.trim().toLowerCase();
  return value === "true";
}

export function isSeraVNextReadOnlyEnabled(): boolean {
  return readBooleanEnv("SERA_VNEXT_READONLY_ENABLED");
}

export function isSeraVNextDiagnosticsEnabled(): boolean {
  return readBooleanEnv("NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED");
}

export function isSeraVNextInternalPilotEnabled(): boolean {
  return readBooleanEnv("SERA_VNEXT_INTERNAL_PILOT_ENABLED");
}

export function isSeraVNextCandidateOnlyEnabled(): boolean {
  return readBooleanEnv("SERA_VNEXT_CANDIDATE_ONLY_ENABLED");
}

export function isSeraVNextCandidateUiEnabled(): boolean {
  return readBooleanEnv("NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED");
}
