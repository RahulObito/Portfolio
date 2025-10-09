import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/"), 1500);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-glass border border-white/10 shadow-md mb-6">
          <svg className="animate-spin w-12 h-12 text-accent-foreground" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeOpacity="0.15" fill="none" />
            <path d="M25 5 a20 20 0 0 1 0 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Loading Rahul's portfolio…</h2>
        <p className="mt-2 text-sm text-foreground/70">Preparing the experience — redirecting shortly.</p>
      </div>
    </div>
  );
}
