import { NextRequest, NextResponse } from "next/server";

import serverAuth from "../../lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    return NextResponse.json({ currentUser, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Not authenticated", status: 401 });
  }
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: "Method Not Allowed", status: 405 });
}
