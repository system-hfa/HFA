function readBooleanEnv(name: string): boolean {
  const value = process.env[name]?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes" || value === "on";
}

export function isSeraVNextReadOnlyEnabled(): boolean {
  return readBooleanEnv("SERA_VNEXT_READONLY_ENABLED");
}

export function isSeraVNextDiagnosticsEnabled(): boolean {
  return readBooleanEnv("NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED");
}
