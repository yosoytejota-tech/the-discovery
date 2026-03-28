"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setShowScrollBtn(distFromBottom > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore session from localStorage on mount — skip Begin screen if session exists
  useEffect(() => {
    const savedSession = localStorage.getItem("discovery_session_id");
    if (!savedSession) return;
    setSessionId(savedSession);
    setStarted(true);
    setLoading(true);
    fetch(`/api/restore?session=${savedSession}`)
      .then(r => r.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const startDiscovery = async () => {
    const newSessionId = crypto.randomUUID();
    localStorage.setItem("discovery_session_id", newSessionId);
    setSessionId(newSessionId);
    setStarted(true);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [], session_id: newSessionId }),
      });
      const data = await res.json();
      setMessages([{ role: "assistant", content: data.message }]);
    } catch {
      setMessages([{ role: "assistant", content: "Something went wrong. Please refresh and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const startOver = () => {
    localStorage.removeItem("discovery_session_id");
    setMessages([]);
    setInput("");
    setStarted(false);
    setSessionId("");
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, session_id: sessionId }),
      });
      const data = await res.json();
      const phase1Messages = [...newMessages, { role: "assistant", content: data.message }];
      setMessages(phase1Messages);

      if (data.phase === "build") {
        // Phase 1 displayed — auto-trigger Phase 2 (loading stays true, dots remain visible)
        const res2 = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: phase1Messages, session_id: sessionId, phase: "build" }),
        });
        const data2 = await res2.json();
        setMessages([...phase1Messages, { role: "assistant", content: data2.message }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .chat-root {
          min-height: 100vh;
          background: #0D1B2A;
          color: #F5F0E8;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .chat-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 20px 40px;
          background: #0D1B2A;
          border-bottom: 1px solid rgba(40, 116, 166, 0.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-header-logo {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }

        .chat-header-logo:hover { color: #F5F0E8; }

        .chat-header-actions {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .btn-ghost {
          background: none;
          border: none;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.3);
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-ghost:hover { color: rgba(245, 240, 232, 0.75); }

        /* ── Body ── */
        .chat-body {
          flex: 1;
          max-width: 740px;
          width: 100%;
          margin: 0 auto;
          padding: 120px 28px 110px;
          display: flex;
          flex-direction: column;
        }

        /* ── Begin screen ── */
        .begin-screen {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0;
          padding-bottom: 48px;
        }

        .begin-subline {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.35);
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeInUp 0.7s ease both;
          animation-delay: 0.2s;
        }

        .begin-headline {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 400;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          line-height: 1.35;
          color: #F5F0E8;
          margin-bottom: 48px;
          opacity: 0;
          animation: fadeInUp 0.7s ease both;
          animation-delay: 0.65s;
        }

        .begin-btn {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.8rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.75);
          background: transparent;
          border: 1px solid #2874A6;
          padding: 14px 48px;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.7s ease both;
          animation-delay: 1.1s;
        }

        .begin-btn:hover {
          background: #2874A6;
          color: #F5F0E8;
          letter-spacing: 0.33em;
        }

        /* ── Messages ── */
        .messages-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 36px;
          padding-bottom: 0;
        }

        .msg-row { display: flex; }
        .msg-row-user { justify-content: flex-end; }

        .msg-assistant {
          max-width: 88%;
          background: #0D1B2A;
          border: 1px solid rgba(245, 240, 232, 0.2);
          padding: 12px 18px;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          line-height: 1.9;
          color: #F5F0E8;
        }

        .msg-user {
          max-width: 70%;
          background: #162435;
          border: 1px solid rgba(245, 240, 232, 0.2);
          padding: 12px 18px;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(245, 240, 232, 0.75);
        }

        /* ── Itinerary ready card ── */
        .itinerary-ready-card {
          max-width: 88%;
          background: #0D1B2A;
          border: 1px solid rgba(245, 240, 232, 0.2);
          padding: 24px 22px;
        }

        .itinerary-ready-text {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 17px;
          line-height: 1.85;
          color: rgba(245, 240, 232, 0.85);
          margin-bottom: 22px;
        }

        .journey-cta-btn {
          display: inline-block;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #2874A6;
          border: 1px solid #2874A6;
          padding: 11px 26px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .journey-cta-btn:hover {
          background: #2874A6;
          color: #F5F0E8;
        }

        /* ── Typing indicator ── */
        .typing-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 18px;
          border: 1px solid rgba(245, 240, 232, 0.12);
          background: #0D1B2A;
        }

        .typing-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2874A6;
          opacity: 0.2;
          animation: pulse 1.4s ease-in-out infinite;
        }

        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        /* ── Scroll to bottom button ── */
        .scroll-btn {
          position: fixed;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          background: #0D1B2A;
          border: 1px solid #2874A6;
          color: #2874A6;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          padding: 0;
        }

        .scroll-btn:hover {
          background: #2874A6;
          color: #F5F0E8;
        }

        /* ── Input area ── */
        .input-area {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: #0D1B2A;
          border-top: 1px solid rgba(40, 116, 166, 0.2);
          padding: 20px 28px 24px;
        }

        .input-area-inner {
          max-width: 740px;
          margin: 0 auto;
          display: flex;
          gap: 14px;
          align-items: flex-end;
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(40, 116, 166, 0.3);
          color: #F5F0E8;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 15px;
          padding: 8px 0;
          resize: none;
          overflow: hidden;
          outline: none;
          line-height: 1.6;
          transition: border-color 0.2s;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .chat-textarea::-webkit-scrollbar { display: none; }
        .chat-textarea::placeholder { color: rgba(245, 240, 232, 0.25); }
        .chat-textarea:focus { border-bottom-color: #2874A6; }

        .send-btn {
          background: transparent;
          border: 1px solid rgba(40, 116, 166, 0.4);
          color: rgba(245, 240, 232, 0.4);
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 8px 22px;
          cursor: not-allowed;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .send-btn.active {
          border-color: #2874A6;
          color: rgba(245, 240, 232, 0.8);
          cursor: pointer;
        }

        .send-btn.active:hover {
          background: #2874A6;
          color: #F5F0E8;
        }

        @media (max-width: 600px) {
          .chat-header { padding: 18px 20px; }
          .chat-body { padding: 100px 20px 110px; }
          .input-area { padding: 16px 20px 20px; }
          .msg-assistant { font-size: 16px; }
        }
      `}</style>

      <div className="chat-root">
        <header className="chat-header">
          <a href="/" className="chat-header-logo">The Discovery</a>
          <div className="chat-header-actions">
            {started && (
              <button className="btn-ghost" onClick={startOver}>Start Over</button>
            )}
            <a href={sessionId ? `/journey?session=${sessionId}` : "/journey"} className="btn-ghost">Your Journey</a>
          </div>
        </header>

        <div className="chat-body">
          {!started ? (
            <div className="begin-screen">
              <p className="begin-subline">A different kind of travel conversation</p>
              <h1 className="begin-headline">
                Most trips start with a destination.<br />We start with you.
              </h1>
              <button className="begin-btn" onClick={startDiscovery}>
                Begin
              </button>
            </div>
          ) : (
            <>
              <div className="messages-area">
                {messages.map((msg, i) => {
                  const isItineraryMessage = msg.role === "assistant" &&
                    /Your itinerary is ready/i.test(msg.content);

                  return (
                    <div
                      key={i}
                      className={`msg-row message-fade-in ${msg.role === "user" ? "msg-row-user" : ""}`}
                    >
                      {msg.role === "assistant" ? (
                        isItineraryMessage ? (
                          <div className="itinerary-ready-card">
                            <p className="itinerary-ready-text">
                              Your itinerary is ready. Take a look and come back here if you want to adjust anything.
                            </p>
                            <a href={`/journey?session=${sessionId}`} className="journey-cta-btn">
                              View Your Journey →
                            </a>
                          </div>
                        ) : (
                          <div className="msg-assistant assistant-message">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )
                      ) : (
                        <div className="msg-user">{msg.content}</div>
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="msg-row">
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {showScrollBtn && (
                <button
                  className="scroll-btn"
                  onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
                  aria-label="Scroll to bottom"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}

              <div className="input-area">
                <div className="input-area-inner">
                  <textarea
                    ref={textareaRef}
                    className="chat-textarea"
                    value={input}
                    onChange={e => { setInput(e.target.value); resizeTextarea(); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Your answer..."
                    disabled={loading}
                    rows={1}
                  />
                  <button
                    className={`send-btn${!loading && input.trim() ? " active" : ""}`}
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
