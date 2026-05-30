import { NextResponse } from "next/server";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqzvro";

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Origin: "https://www.guigolo.com",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        { ok: false, status: response.status, error: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}