const VALIDATION_ERROR_RE = /^SERA vNext runtime baseline validation failed:/;

export type SeraVNextRuntimeError = {
  errorCode: string;
  safeMessage: string;
};

export function toSeraVNextRuntimeError(error: unknown): SeraVNextRuntimeError {
  if (error instanceof Error && VALIDATION_ERROR_RE.test(error.message)) {
    return {
      errorCode: "SERA_VNEXT_BASELINE_VALIDATION_FAILED",
      safeMessage: "SERA vNext read-only baseline validation failed.",
    };
  }

  return {
    errorCode: "SERA_VNEXT_RUNTIME_UNAVAILABLE",
    safeMessage: "SERA vNext read-only runtime status is unavailable.",
  };
}
