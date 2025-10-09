import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Keep overlay at least 600ms, hide when window load fired
    const min = 600;
    let minTimer: number | undefined;
    const onLoaded = () => {
      minTimer = window.setTimeout(() => setShowOverlay(false), min);
    };
    if (document.readyState === "complete") onLoaded();
    else window.addEventListener("load", onLoaded);
    return () => {
      window.removeEventListener("load", onLoaded);
      if (minTimer) clearTimeout(minTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showOverlay && <LoadingOverlay minTime={400} />}
        <BrowserRouter>
          <Routes>
            {/* Single page app: render Index for all routes */}
            <Route path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
