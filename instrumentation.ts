import type { Instrumentation } from "next";

function errorDetails(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message || error.name || "Server error",
      stack: error.stack || null,
      digest:
        "digest" in error && typeof error.digest === "string"
          ? error.digest
          : null,
    };
  }

  if (typeof error === "object" && error !== null && "digest" in error) {
    return {
      message: "Server error",
      stack: null,
      digest: String((error as { digest?: unknown }).digest ?? ""),
    };
  }

  return {
    message: String(error || "Server error"),
    stack: null,
    digest: null,
  };
}

export const onRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context
) => {
  const databaseUrl = process.env.DATABASE_URL;
  const path = request.path.split("?")[0] || "/";

  if (
    !databaseUrl ||
    path.startsWith("/admin") ||
    path === "/api/error-events"
  ) {
    return;
  }

  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(databaseUrl);
    const details = errorDetails(error);
    const errorType = `server_${context.routeType}`;
    const source = context.routePath || null;
    const message = details.digest
      ? `${details.message} · digest: ${details.digest}`
      : details.message;

    await sql`
      CREATE TABLE IF NOT EXISTS error_events (
        id BIGSERIAL PRIMARY KEY,
        seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        path TEXT NOT NULL,
        error_type TEXT NOT NULL,
        message TEXT NOT NULL,
        stack TEXT,
        source TEXT,
        line_number INTEGER,
        column_number INTEGER,
        user_agent TEXT
      )
    `;

    await sql`
      INSERT INTO error_events (
        path,
        error_type,
        message,
        stack,
        source,
        user_agent
      )
      VALUES (
        ${path.slice(0, 1000)},
        ${errorType.slice(0, 80)},
        ${message.slice(0, 1200)},
        ${details.stack?.slice(0, 8000) ?? null},
        ${source?.slice(0, 2000) ?? null},
        ${String(request.headers["user-agent"] ?? "").slice(0, 2000) || null}
      )
    `;
  } catch {
    // Observability must never turn an application error into another failure.
  }
};
