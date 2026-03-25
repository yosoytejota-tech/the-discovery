import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

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

        .journey-body {
          max-width: 760px;
          margin: 0 auto;
          padding: 72px 32px 96px;
        }

        .journey-page-title {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6B7F8E;
          margin-bottom: 56px;
        }

        .journey-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 100px;
          gap: 32px;
        }

        .journey-empty p {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 1.2rem;
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
          padding: 12px 32px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .journey-empty-link:hover {
          background: #2874A6;
          color: #F5F0E8;
        }

        .journey-article {
          margin-bottom: 80px;
          padding-bottom: 80px;
          border-bottom: 1px solid rgba(40, 116, 166, 0.2);
        }

        .journey-article:last-child {
          border-bottom: none;
        }

        .journey-meta {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #2874A6;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .journey-meta::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #2874A6;
          flex-shrink: 0;
        }

        .journey-error {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          color: #6B7F8E;
          font-size: 15px;
          padding-top: 48px;
        }

        @media (max-width: 600px) {
          .journey-header { padding: 18px 20px; }
          .journey-body { padding: 48px 20px 72px; }
        }
      `}</style>

      <div className="journey-root">
        <header className="journey-header">
          <a href="/" className="journey-header-logo">The Discovery</a>
          <a href="/chat" className="journey-new-link">New Journey</a>
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

          {conversations.map((conv, index) => {
            const itinerary = getItinerary(conv.transcript);
            return (
              <article key={conv.id} className="journey-article">
                <p className="journey-meta">
                  {formatDate(conv.created_at)} &nbsp;·&nbsp; Journey {conversations.length - index}
                </p>
                <div className="itinerary-body">
                  <ReactMarkdown>{itinerary}</ReactMarkdown>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
