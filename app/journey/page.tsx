import { supabase } from "@/lib/supabase";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Suspense } from "react";
import { SessionRedirect, NewJourneyBtn } from "./SessionGuard";

export const dynamic = "force-dynamic";

type Conversation = {
  id: string;
  session_id: string;
  created_at: string;
  is_complete: boolean;
  itinerary: string | null;
};

function cleanItinerary(raw: string): string {
  // Strip everything before the evocative trip title (YOUR ...) or OVERVIEW
  const startMatch = raw.search(/^(YOUR [A-Z]|OVERVIEW\b)/m);
  const trimmed = startMatch !== -1 ? raw.slice(startMatch) : raw;

  // Strip the post-itinerary refinement question (full sentence or partial)
  const endMatch = trimmed.search(/Is there anything here you want|before you start booking/i);
  const cleaned = endMatch !== -1 ? trimmed.slice(0, endMatch).trimEnd() : trimmed;

  // Insert blank lines between consecutive field lines in the TRIP AT A GLANCE
  // section so ReactMarkdown renders each field as its own paragraph.
  const lines = cleaned.split("\n");
  const out: string[] = [];
  let inGlance = false;
  let glanceSawContent = false;

  for (const line of lines) {
    if (/TRIP AT A GLANCE/i.test(line)) {
      inGlance = true;
      glanceSawContent = false;
      out.push(line);
      continue;
    }
    if (inGlance) {
      if (line.trim() === "") {
        // A blank line after content closes the section
        if (glanceSawContent) inGlance = false;
        out.push(line);
        continue;
      }
      // Non-empty field: insert a blank separator before it
      if (glanceSawContent) out.push("");
      glanceSawContent = true;
    }
    out.push(line);
  }

  return out.join("\n");
}

const TIME_LABELS = /^(Morning|Afternoon|Evening)\s*[—–-]/i;

const markdownComponents: Components = {
  strong({ children }) {
    const text = typeof children === "string" ? children : String(children ?? "");
    if (TIME_LABELS.test(text)) {
      return <strong className="time-label">{children}</strong>;
    }
    return <strong>{children}</strong>;
  },
};

export default async function JourneyPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;

  // Without a session param, show nothing rather than leaking all rows
  const { data, error } = session
    ? await supabase
        .from("conversations")
        .select("id, session_id, created_at, is_complete, itinerary")
        .eq("session_id", session)
        .eq("is_complete", true)
        .not("itinerary", "is", null)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  const conversations: Conversation[] = data ?? [];

  return (
    <>
      <style>{`
        .journey-root {
          min-height: 100vh;
          background: #0D1B2A;
          color: #F5F0E8;
        }

        .journey-header {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 20px 40px;
          background: #0D1B2A;
          border-bottom: 1px solid rgba(40, 116, 166, 0.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .journey-header-logo {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }

        .journey-header-logo:hover { color: #F5F0E8; }

        .journey-new-link {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.3);
          text-decoration: none;
          transition: color 0.2s;
        }

        .journey-new-link:hover { color: rgba(245, 240, 232, 0.75); }

        .journey-back-btn {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2874A6;
          border: 1px solid #2874A6;
          padding: 7px 18px;
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-block;
        }

        .journey-back-btn:hover {
          background: #2874A6;
          color: #F5F0E8;
        }

        .journey-body {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 48px 120px;
        }

        .journey-page-title {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6B7F8E;
          margin-bottom: 64px;
        }

        .journey-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 120px;
          gap: 36px;
        }

        .journey-empty p {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(245, 240, 232, 0.35);
          line-height: 1.6;
        }

        .journey-empty-link {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.6);
          border: 1px solid #2874A6;
          padding: 13px 36px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .journey-empty-link:hover {
          background: #2874A6;
          color: #F5F0E8;
        }

        .journey-article {
          margin-bottom: 100px;
          padding-bottom: 100px;
          border-bottom: 1px solid rgba(40, 116, 166, 0.2);
        }

        .journey-article:last-child {
          border-bottom: none;
        }

        .journey-error {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          color: #6B7F8E;
          font-size: 15px;
          padding-top: 48px;
        }

        @media (max-width: 768px) {
          .journey-header { padding: 18px 20px; }
          .journey-body { padding: 56px 24px 80px; }
        }
      `}</style>

      <Suspense fallback={null}>
        <SessionRedirect />
      </Suspense>

      <div className="journey-root">
        <header className="journey-header">
          <a href="/" className="journey-header-logo">The Discovery</a>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 10 }}>
            <a href="/chat" className="journey-back-btn">← Back to conversation</a>
            <NewJourneyBtn className="journey-new-link" />
          </div>
        </header>

        <div className="journey-body">
          <p className="journey-page-title">Your Journeys</p>

          {error && (
            <p className="journey-error">Unable to load journeys at this time.</p>
          )}

          {!error && conversations.length === 0 && (
            <div className="journey-empty">
              <p>No completed itineraries yet.</p>
              <a href="/chat" className="journey-empty-link">Begin Your Discovery</a>
            </div>
          )}

          {conversations.map((conv) => (
            <article key={conv.id} className="journey-article">
              <div className="itinerary-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {cleanItinerary(conv.itinerary!)}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
