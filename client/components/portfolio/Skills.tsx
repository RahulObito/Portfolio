import { useCallback, useState, KeyboardEvent, memo } from "react";
import { cn } from "@/lib/utils";

const skills = [
  {
    title: "UI / UX Design",
    front: [
      "User research",
      "Wireframing",
      "Prototyping",
      "High-fidelity mockups",
      "User flows & interaction design",
      "Usability testing",
    ],
    back: ["Figma (advanced)", "Design systems", "Responsive design", "Accessibility"],
  },
  {
    title: "Visual & Graphic Design",
    front: [
      "Branding",
      "Poster & event graphics",
      "Social media creatives",
      "Illustration",
      "Typography & color theory",
    ],
    back: ["Layout design", "Motion basics", "Print-ready assets", "Guidelines & stylesheets"],
  },
  {
    title: "Technical & Web",
    front: ["Webflow", "Framer", "HTML", "CSS", "JavaScript"],
    back: ["Git & GitHub", "SQL basics", "Prototyping to dev handoff", "Performance-minded UI"],
  },
  {
    title: "Social Media Management",
    front: [
      "Content strategy",
      "Calendar planning",
      "Community engagement",
      "Analytics tracking",
    ],
    back: [
      "Platform-specific strategies (Instagram, Facebook, LinkedIn, Twitter, YouTube)",
      "Campaign optimization",
    ],
  },
  {
    title: "Outreach & Engagement",
    front: ["Influencer collaboration", "Partnerships", "Client communication"],
    back: ["Email campaigns", "Audience targeting", "Stakeholder coordination"],
  },
  {
    title: "Content Creation",
    front: ["Graphics", "Posts & stories", "Reels and short videos"],
    back: ["Basic motion graphics", "Branding consistency", "Video editing basics"],
  },
  {
    title: "Tools & Platforms",
    front: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva", "Webflow", "Framer"],
    back: ["Buffer", "Hootsuite", "Google Analytics", "Notion", "Miro", "Jira"],
  },
  {
    title: "Collaboration & Leadership",
    front: ["Team coordination", "Mentoring", "Project planning"],
    back: ["Workshops", "Agile workflows", "Design critiques"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="container py-20">
      <h2 className="font-heading text-3xl md:text-4xl mb-10">Skills</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((s) => (
          <div key={s.title} className="h-[400px]">
            <MemoFlipCard title={s.title} front={s.front} back={s.back} />
          </div>
        ))}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-foreground/80 space-y-2 overflow-y-auto">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-foreground/60 mt-0.5 flex-shrink-0">•</span>
          <span className="leading-relaxed break-words">{i}</span>
        </li>
      ))}
    </ul>
  );
}

function FlipCard({ title, front, back }: { title: string; front: string[]; back: string[] }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback(() => setFlipped((v) => !v), []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }, [toggle]);

  return (
    <div className={cn("group perspective relative h-full")}>
      {/* circular border-only glow (visible on hover) */}
      <div className="absolute -inset-3 rounded-2xl blur-xl opacity-20 transition-all duration-500 pointer-events-none group-hover:opacity-60 dark:opacity-12" />

      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${title} skills card. Press Enter or Space to flip.`}
        onKeyDown={onKeyDown}
        onClick={toggle}
        className={cn(
          "relative z-10 w-full h-full rounded-2xl shadow-lg transition-transform duration-400 ease-in-out",
          "[transform-style:preserve-3d]",
          "bg-glass border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "p-6 flex flex-col",
          flipped && "[transform:rotateY(180deg)]",
          "motion-safe:transition-transform",
          "group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(99,102,241,0.18)] group-hover:ring-4 group-hover:ring-indigo-400/20",
        )}
      >
        <div className="absolute inset-0 p-6 [backface-visibility:hidden] flex flex-col">
          <h3 className="font-semibold mb-4 text-lg">{title}</h3>
          <div className="flex-1 overflow-hidden">
            <List items={front} />
          </div>
        </div>

        <div className="absolute inset-0 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">
          <h3 className="font-semibold mb-4 text-lg">{title}</h3>
          <div className="flex-1 overflow-hidden">
            <List items={back} />
          </div>
        </div>

        <div className="absolute -inset-px rounded-2xl ring-1 ring-white/20 pointer-events-none" />
      </div>
    </div>
  );
}

const MemoFlipCard = memo(FlipCard);

MemoFlipCard.displayName = "MemoFlipCard";
