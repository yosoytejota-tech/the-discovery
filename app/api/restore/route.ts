import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get("session");
  if (!session) return NextResponse.json({ messages: [] });

  const { data } = await supabase
    .from("conversations")
    .select("transcript")
    .eq("session_id", session)
    .is("itinerary", null)
    .maybeSingle();

  return NextResponse.json({ messages: data?.transcript ?? [] });
}
