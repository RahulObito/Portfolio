import { useEffect, useRef } from "react";

const items = [
  {
    role: "Media & Designer Coordinator",
    org: "RNXG",
    period: "2022",
    bullets: [
      "Designed posters, event graphics, and social media content, strengthening RNXG’s visual identity.",
      "Boosted audience engagement through creative campaigns and on-brand visuals.",
      "Maintained brand consistency and organized design assets efficiently.",
      "Collaborated using Figma and FigJam for wireframing, layout planning, and brainstorming.",
    ],
  },
  {
    role: "Media & Design Head",
    org: "RNXG",
    period: "2023–24",
    bullets: [
      "Led the media and design team, ensuring consistent branding across platforms.",
      "Managed creative campaigns increasing RNXG’s digital reach and audience interaction.",
      "Mentored junior designers, conducted workshops, and implemented feedback sessions.",
      "Developed reusable Figma templates, components, and design systems.",
      "Produced high-quality graphics, posters, illustrations, and motion content for marketing and events.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) el.classList.add("is-visible");
      });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="container py-20">
      <h2 className="font-heading text-3xl md:text-4xl mb-10">Experience</h2>
      <div ref={ref} className="relative reveal">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/20 to-transparent" />
        <ul className="space-y-10">
          {items.map((it, i) => (
            <li key={i} className="grid md:grid-cols-2 gap-6 items-start">
              <div className="md:text-right md:pr-10 order-2 md:order-1">
                <h3 className="font-semibold text-lg">{it.role}</h3>
                <p className="text-foreground/70">{it.org}</p>
                <p className="text-sm text-foreground/60">{it.period}</p>
              </div>
              <div className="relative order-1 md:order-2">
                <span className="absolute left-4 md:left-[-10px] top-2 size-3 rounded-full bg-gradient-accents shadow" />
                <div className="ml-10 md:ml-0 bg-glass rounded-xl p-4 border border-white/20 shadow">
                  <ul className="list-disc ml-4 space-y-2 text-sm text-foreground/80">
                    {it.bullets?.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
