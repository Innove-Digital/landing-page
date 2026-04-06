import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await fetch(process.env.WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // webhook failure is non-blocking — client proceeds to scheduling
  }

  return NextResponse.json({ ok: true });
}
