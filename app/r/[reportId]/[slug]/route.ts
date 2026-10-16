import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fermor.in";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string; slug: string }> }
) {
  const { reportId, slug } = await params;
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "";

  try {
    // Call backend to log click and get target URL
    const res = await fetch(`${API_BASE}/api/v1/r/${reportId}/${slug}`, {
      redirect: "manual",
      headers: { "x-forwarded-for": ip },
    });

    // Backend returns a 301 redirect — extract Location header
    const location = res.headers.get("location");
    if (location) {
      return NextResponse.redirect(location, { status: 301 });
    }
  } catch {
    // Fall through to default
  }

  // Fallback if backend unreachable
  return NextResponse.redirect(new URL("/", request.url), { status: 302 });
}
