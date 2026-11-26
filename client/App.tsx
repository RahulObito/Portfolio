import "./global.css";
import { createRoot } from "react-dom/client";
import Index from "./pages/Index";
import OptionalAnalytics from "./OptionalAnalytics";
createRoot(document.getElementById("root")!).render(<><Index /><OptionalAnalytics /></>);
