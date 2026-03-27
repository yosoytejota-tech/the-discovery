"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

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
