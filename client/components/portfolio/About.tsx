import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.classList.add("is-visible");
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="container py-20">
      <div ref={ref} className="reveal">
        <div className="space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl">About</h2>

          <div className="prose text-foreground/80">
            <p>
              Dynamic Social Media Handler and Outreach Specialist with experience in growing digital presence and audience engagement, and with additional experience in UI/UX design to create user-friendly visuals and interactive content. Skilled in content planning, campaign management, community engagement, analytics, and branding. Passionate about building meaningful interactions, increasing visibility, and delivering engaging experiences across platforms.
            </p>

          
          </div>

        </div>
      </div>
    </section>
  );
}
