"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startDiscovery = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [] }),
      });
      const data = await res.json();
      setMessages([{ role: "assistant", content: data.message }]);
    } catch {
      setMessages([{ role: "assistant", content: "Something went wrong. Please refresh and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
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
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      color: "#f5f0e8",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
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
        <span style={{ color: "#666", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Your Journey
        </span>
      </header>

      {/* Chat area */}
      <div style={{
        flex: 1,
        maxWidth: "720px",
        width: "100%",
        margin: "0 auto",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
      }}>
        {!started ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "32px" }}>
            <div>
              <p style={{ color: "#888", fontSize: "26px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                A different kind of travel conversation
              </p>
              <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: "300", lineHeight: 1.3, margin: 0 }}>
                Most trips start with a destination.<br />We start with you.
              </h1>
            </div>
            <button
              onClick={startDiscovery}
              style={{
                background: "transparent",
                border: "1px solid #f5f0e8",
                color: "#f5f0e8",
                padding: "14px 36px",
                fontSize: "14px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.background = "#f5f0e8";
                (e.target as HTMLButtonElement).style.color = "#0a0a0a";
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.background = "transparent";
                (e.target as HTMLButtonElement).style.color = "#f5f0e8";
              }}
            >
              Begin
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "24px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "85%",
                    padding: msg.role === "assistant" ? "0" : "14px 20px",
                    background: msg.role === "user" ? "#1a1a1a" : "transparent",
                    border: msg.role === "user" ? "1px solid #2a2a2a" : "none",
                    fontSize: "17px",
                    lineHeight: "1.75",
                    color: msg.role === "assistant" ? "#f5f0e8" : "#ccc",
                    whiteSpace: "pre-wrap",
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#555" }}>
                  <span style={{ fontSize: "24px", animation: "pulse 1.5s infinite" }}>·</span>
                  <span style={{ fontSize: "24px", animation: "pulse 1.5s infinite 0.3s" }}>·</span>
                  <span style={{ fontSize: "24px", animation: "pulse 1.5s infinite 0.6s" }}>·</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div style={{
              borderTop: "1px solid #1f1f1f",
              paddingTop: "24px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-end",
            }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your answer..."
                disabled={loading}
                rows={1}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid #333",
                  color: "#f5f0e8",
                  fontSize: "16px",
                  fontFamily: "'Georgia', serif",
                  padding: "8px 0",
                  resize: "none",
                  outline: "none",
                  lineHeight: "1.5",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  color: loading || !input.trim() ? "#444" : "#f5f0e8",
                  padding: "8px 20px",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
