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
    document.addEventListener("click", (event) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const explicit = link.getAttribute("data-analytics-event");
      let name = explicit === "resume_download" ? explicit : "";
      if (!name && href.startsWith("mailto:")) name="email_click";
      if (!name && href.startsWith("tel:")) name="phone_click";
      if (!name && /^https:\/\/(www\.)?linkedin\.com\//.test(href)) name="linkedin_click";
      if (!name && /^https:\/\/github\.com\//.test(href)) name="github_click";
      if (!name && href === "#contact") name="contact_cta_click";
      if (!name && href === "#skills") name="skills_cta_click";
      if (!name && href === "#experience") name="experience_cta_click";
      if (name) w.gtag?.("event",name);
    });
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
  useEffect(() => {
    if (location.hash === "#privacy-settings") setOpen(true);
  }, []);
  function choose(next: Exclude<Consent,null>) {
    try { localStorage.setItem(consentKey,next); } catch {}
    if (next === "declined" && started) {
      w.gtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
      w.clarity?.("consentv2",{ad_Storage:"denied",analytics_Storage:"denied"});
      // Expire analytics cookies accessible on this website.
      for (const entry of document.cookie.split(";")) {
        const name = entry.split("=")[0].trim();
        if (/^(_ga($|_)|_clck$|_clsk$)/.test(name)) {
          document.cookie = name + "=; Max-Age=0; Path=/";
          document.cookie = name + "=; Max-Age=0; Path=/; Domain=" + location.hostname;
        }
      }
      location.reload();
      return;
    }
    setChoice(next); setOpen(false);
  }
  const shown = enabled && (choice === null || open);
  return <>
    <nav className="rk-wrap rk-privacy-footer" aria-label="Privacy">
      <a href="/privacy.html">Privacy Policy</a>
      {enabled && <><span aria-hidden="true">·</span><button id="privacy-settings" type="button" aria-expanded={shown} onClick={()=>setOpen(true)}>Privacy Settings</button></>}
    </nav>
    {shown && <section className="rk-privacy-notice" aria-label="Privacy choices" aria-live="polite">
      <div className="rk-privacy-heading"><span aria-hidden="true">◇</span><strong>Your privacy matters</strong></div>
      <p>This site uses Vercel's cookieless visitor statistics. With your permission, {hasGA && "Google Analytics measures visits and successful contact submissions without form contents. "}{hasClarity && "Microsoft Clarity measures interactions and masked session recordings. Contact form fields are masked. "}Optional analytics start only with your consent.</p>
      <div className="rk-privacy-actions">
        <button type="button" onClick={()=>choose("accepted")}>Accept analytics</button>
        <button type="button" onClick={()=>choose("declined")}>Decline</button>
      </div>
      <div className="rk-privacy-note"><a href="/privacy.html">Privacy Policy</a><span>Change your choice anytime in the footer.</span>{choice !== null && <button type="button" onClick={()=>setOpen(false)}>Close</button>}</div>
    </section>}
  </>;
}
