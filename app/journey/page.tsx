import { supabase } from "@/lib/supabase";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  session_id: string;
  transcript: Message[];
  created_at: string;
  is_complete: boolean;
};

function getItinerary(transcript: Message[]): string {
  const assistantMessages = transcript.filter(m => m.role === "assistant");
  return assistantMessages[assistantMessages.length - 1]?.content ?? "";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function JourneyPage() {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("is_complete", true)
    .order("created_at", { ascending: false });

  const conversations: Conversation[] = data ?? [];

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      color: "#f5f0e8",
      fontFamily: "'Georgia', serif",
    }}>
      {/* Header */}
      <header style={{
        padding: "24px 40px",
        borderBottom: "1px solid #1f1f1f",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a href="/" style={{ color: "#f5f0e8", textDecoration: "none", fontSize: "18px", letterSpacing: "0.05em" }}>
          The Discovery
        </a>
        <a href="/chat" style={{ color: "#666", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
          New Journey
        </a>
      </header>

      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "64px 24px",
      }}>
        <h1 style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666", fontWeight: 400, marginBottom: "48px" }}>
          Your Journeys
        </h1>

        {error && (
          <p style={{ color: "#666", fontSize: "16px" }}>
            Unable to load journeys at this time.
          </p>
        )}

        {!error && conversations.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "80px" }}>
            <p style={{ color: "#555", fontSize: "17px", lineHeight: 1.75, marginBottom: "32px" }}>
              No completed itineraries yet.
            </p>
            <a
              href="/chat"
              style={{
                color: "#f5f0e8",
                border: "1px solid #333",
                padding: "12px 28px",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Begin Your Discovery
            </a>
          </div>
        )}

        {conversations.map((conv, index) => {
          const itinerary = getItinerary(conv.transcript);
          return (
            <article
              key={conv.id}
              style={{
                borderBottom: "1px solid #1f1f1f",
                paddingBottom: "64px",
                marginBottom: "64px",
              }}
            >
              <p style={{ color: "#555", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px" }}>
                {formatDate(conv.created_at)} · Journey {conversations.length - index}
              </p>
              <div style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "#c8c0b0",
                whiteSpace: "pre-wrap",
              }}>
                {itinerary}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
