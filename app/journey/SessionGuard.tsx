"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SessionRedirect() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.get("session")) {
      const stored = localStorage.getItem("discovery_session_id");
      if (stored) {
        router.replace(`/journey?session=${stored}`);
      }
    }
  }, [params, router]);

  return null;
}

export function ScrollToBottomBtn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setShow(distFromBottom > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="scroll-btn"
      onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
      aria-label="Scroll to bottom"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export function NewJourneyBtn({ className }: { className?: string }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("discovery_session_id");
    router.push("/chat");
  };

  return (
    <button className={className} onClick={handleClick}>
      New Journey
    </button>
  );
}
