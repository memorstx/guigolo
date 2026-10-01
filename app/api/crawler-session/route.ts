import { NextResponse } from "next/server";
import {
  CRAWLER_SESSION_COOKIE,
  createCrawlerSession,
} from "@/lib/crawlerSession";

export const runtime = "nodejs";

type LoginPayload = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export async function POST(request: Request) {
  const expectedUsername = process.env.CRAWLER_DASHBOARD_USER || "guigolo";
  const expectedPassword = process.env.CRAWLER_DASHBOARD_PASSWORD;
  const signingSecret = process.env.CRAWLER_INGEST_SECRET;

  if (!expectedPassword || !signingSecret) {
    return NextResponse.json(
      { ok: false, error: "Crawler Radar no está configurado." },
      { status: 503 }
    );
  }

  let payload: LoginPayload;

  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (
    payload.username !== expectedUsername ||
    payload.password !== expectedPassword
  ) {
    return NextResponse.json(
      { ok: false, error: "Usuario o contraseña incorrectos." },
      { status: 401 }
    );
  }

  const session = await createCrawlerSession(
    expectedUsername,
    signingSecret,
    Boolean(payload.remember)
  );
  const response = NextResponse.json({ ok: true });

  response.cookies.set(CRAWLER_SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: session.maxAge,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(CRAWLER_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });

  return response;
}
