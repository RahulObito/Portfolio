import { useEffect, useState } from "react";

const gaId = String(import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();
const clarityId = String(import.meta.env.VITE_CLARITY_PROJECT_ID || "").trim();
const hasGA = /^G-[A-Z0-9]+$/.test(gaId);
const hasClarity = /^[a-z0-9]+$/i.test(clarityId);
const enabled = hasGA || hasClarity;
const consentKey = "rk_optional_analytics_v2_" + (hasGA ? "ga" : "") + (hasClarity ? "clarity" : "");
type Consent = "accepted" | "declined" | null;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] } };
const w = window as AnalyticsWindow;
let started = false;

function addScript(src: string) {
  const el = document.createElement("script");
  el.async = true; el.src = src; document.head.appendChild(el);
}
function startOptionalAnalytics() {
  if (started || !enabled) return;
  started = true;
  if (hasGA) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function() { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("js", new Date());
    w.gtag("config", gaId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    w.gtag("event", "page_view", { page_location: location.origin + location.pathname, page_title: document.title, page_referrer: document.referrer ? new URL(document.referrer).origin : "" });
    addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId));
    window.addEventListener("portfolio-contact-success", () => w.gtag?.("event", "generate_lead"));
  }
  if (hasClarity) {
    const c: NonNullable<AnalyticsWindow["clarity"]> = (...args: unknown[]) => { (c.q ||= []).push(args); };
    w.clarity = c;
    c("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
    addScript("https://www.clarity.ms/tag/" + encodeURIComponent(clarityId));
  }
}
function readConsent(): Consent {
  try { const v=localStorage.getItem(consentKey); return v==="accepted"||v==="declined"?v:null; } catch { return null; }
}
export default function OptionalAnalytics() {
  const [choice, setChoice] = useState<Consent>(readConsent);
  const [open, setOpen] = useState(false);
  useEffect(() => { if (choice === "accepted") startOptionalAnalytics(); }, [choice]);
  if (!enabled) return null;
  function choose(next: Exclude<Consent,null>) {
    try { localStorage.setItem(consentKey,next); } catch {}
    if (next === "declined" && started) {
      w.gtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
      w.clarity?.("consentv2",{ad_Storage:"denied",analytics_Storage:"denied"});
      location.reload();
    }
    setChoice(next); setOpen(false);
  }
  const shown = choice === null || open;
  return <div style={{position:"fixed",bottom:16,left:16,right:16,zIndex:1000,maxWidth:420,color:"#eee",fontFamily:"inherit"}}>
    {shown ? <section aria-label="Privacy choices" style={{background:"#171322",border:"1px solid #57466d",borderRadius:14,padding:16,boxShadow:"0 4px 25px #0008"}}>
      <strong>Optional website analytics</strong>
      <p style={{fontSize:13,lineHeight:1.5,margin:"8px 0 12px"}}>This site uses Vercel's cookieless visitor statistics. With your permission, {hasGA && "Google Analytics measures visits and successful contact submissions without form contents. "}{hasClarity && "Microsoft Clarity measures interactions and masked session recordings; contact form fields are masked. "}You can change your choice anytime.</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button type="button" onClick={()=>choose("accepted")} style={{background:"#7c3aed",color:"white",border:0,borderRadius:8,padding:"9px 14px"}}>Allow optional analytics</button>
        <button type="button" onClick={()=>choose("declined")} style={{background:"transparent",color:"#eee",border:"1px solid #777",borderRadius:8,padding:"9px 14px"}}>Decline</button>
      </div>
    </section> : <button type="button" onClick={()=>setOpen(true)} style={{background:"#171322",color:"#ddd",border:"1px solid #57466d",borderRadius:8,padding:"6px 10px",fontSize:12}}>Privacy choices</button>}
  </div>;
}
