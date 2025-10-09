import { useEffect, useState } from "react";

export default function LoadingOverlay({ minTime = 600 }: { minTime?: number }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let minTimer: number | undefined;
    const onLoaded = () => {
      // ensure minimum display time
      minTimer = window.setTimeout(() => setVisible(false), minTime);
    };

    if (document.readyState === "complete") {
      onLoaded();
    } else {
      window.addEventListener("load", onLoaded);
    }

    return () => {
      window.removeEventListener("load", onLoaded);
      if (minTimer) clearTimeout(minTimer);
    };
  }, [minTime]);

  if (!visible) return null;

  return (
    <div
      aria-hidden={!visible}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md transition-opacity duration-500"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-glass border border-white/10 shadow-lg mb-6">
          <svg className="animate-spin w-12 h-12 text-gradient" viewBox="0 0 50 50" aria-hidden>
            <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeOpacity="0.12" fill="none" />
            <path d="M25 5 a20 20 0 0 1 0 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Loading…</h2>
        <p className="mt-2 text-sm text-foreground/70">Preparing your portfolio experience</p>
      </div>
    </div>
  );
}
