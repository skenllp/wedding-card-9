// Error capture utility for SSR error reporting
let lastCapturedError: Error | null = null;

if (typeof process !== "undefined") {
  process.on("uncaughtException", (error: Error) => {
    lastCapturedError = error;
  });
  process.on("unhandledRejection", (reason: unknown) => {
    if (reason instanceof Error) {
      lastCapturedError = reason;
    }
  });
}

export function consumeLastCapturedError(): Error | null {
  const err = lastCapturedError;
  lastCapturedError = null;
  return err;
}
