import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast as showToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const sampleProjects = [
  {
    id: 1,
    title: "FreshFold (Figma)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F38e7d27277494062b492107fcfb67047%2Fef1d0d4f900441ff9093799d60fccee5",
    source: "figma",
    url: "https://www.figma.com/design/DWhDr59KdnAJK2FhRT2XhI/FreshFold?node-id=0-1&t=SLzP8kSeoG93nWNC-1",
    desc: "A modern e-commerce concept focusing on curated collections and smooth onboarding flows.",
    tags: ["UI/UX", "Prototyping", "Branding"],
  },
  {
    id: 2,
    title: "Instagram Reel",
    img: "/placeholder.svg",
    source: "instagram",
    url: "https://www.instagram.com/reel/CoR4D-vOotS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    desc: "Short-form reel showcasing social content and engagement.",
    tags: ["Social", "Reel", "Video"],
  },
  {
    id: 3,
    title: "Instagram Post",
    img: "/placeholder.svg",
    source: "instagram",
    url: "https://www.instagram.com/p/Cn9_CWcPMw4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    desc: "Image post from portfolio showcasing visual design work.",
    tags: ["Social", "Post", "Graphic"],
  },
  {
    id: 4,
    title: "Instagram Reel",
    img: "/placeholder.svg",
    source: "instagram",
    url: "https://www.instagram.com/reel/Cnei1RGoodQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    desc: "Reel focusing on outreach and community engagement.",
    tags: ["Social", "Reel", "Outreach"],
  },
  {
    id: 5,
    title: "Instagram Reel",
    img: "/placeholder.svg",
    source: "instagram",
    url: "https://www.instagram.com/reel/CoX4GPBsDj0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    desc: "Short-form content highlighting campaign creative.",
    tags: ["Social", "Reel", "Campaign"],
  },
  {
    id: 6,
    title: "Instagram Reel",
    img: "/placeholder.svg",
    source: "instagram",
    url: "https://www.instagram.com/reel/CwXr5cjIkaS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    desc: "Reel demonstrating motion graphics and branding.",
    tags: ["Social", "Reel", "Motion"],
  },
  {
    id: 7,
    title: "Instagram Post",
    img: "/placeholder.svg",
    source: "instagram",
    url: "https://www.instagram.com/p/C1Haqh2i3ei/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    desc: "Portfolio post featuring design and campaign visuals.",
    tags: ["Social", "Post", "Portfolio"],
  },
  {
    id: 8,
    title: "YouTube",
    img: "https://img.youtube.com/vi/aro3TLotwXw/hqdefault.jpg",
    source: "youtube",
    url: "https://youtu.be/aro3TLotwXw?si=rfPmje3lZn2CIWLw",
    desc: "YouTube video project showcasing longer-form content.",
    tags: ["Video", "YouTube", "Content"],
  },
  {
    id: 9,
    title: "YouTube",
    img: "https://img.youtube.com/vi/PPvDQY-0uI0/hqdefault.jpg",
    source: "youtube",
    url: "https://youtu.be/PPvDQY-0uI0?si=CLfq5uNP2xhGOnHp",
    desc: "YouTube video project showcasing longer-form content.",
    tags: ["Video", "YouTube", "Content"],
  },
  {
    id: 10,
    title: "YouTube",
    img: "https://img.youtube.com/vi/LWFizyd0ml0/hqdefault.jpg",
    source: "youtube",
    url: "https://youtu.be/LWFizyd0ml0?si=GWdGU7KAkQFp2fJS",
    desc: "YouTube video project showcasing longer-form content.",
    tags: ["Video", "YouTube", "Content"],
  },
];

export default function Projects() {
  const items = useMemo(() => sampleProjects, []);
  const [active, setActive] = useState<typeof items[number] | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const s = new Set<string>();
    items.forEach((it) => it.tags?.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((it) => it.tags?.includes(filter));
  }, [items, filter]);

  const openProject = (project: typeof items[number]) => {
    if (!project || !project.url) return;
    try {
      window.open(project.url, "_blank", "noopener,noreferrer");
      showToast({
        title: "Opened project",
        description: project.title,
      });
    } catch (e) {
      window.location.href = project.url;
    }
  };

  return (
    <section id="projects" className="container py-20">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-heading text-3xl md:text-4xl">My Work</h2>
        <p className="text-sm text-foreground/70">Selected projects — social, video, UI/UX and more</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn("px-3 py-1 rounded-full text-sm", filter === "all" ? "bg-foreground text-background" : "bg-transparent border border-white/10")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn("px-3 py-1 rounded-full text-sm", filter === c ? "bg-foreground text-background" : "bg-transparent border border-white/10")}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        {filteredItems.map((p) => (
          <Dialog key={p.id} open={active?.id === p.id} onOpenChange={(o) => !o && setActive(null)}>
            <DialogTrigger asChild>
              <button
                className="min-w-[240px] snap-center bg-glass rounded-2xl overflow-hidden border border-white/20 shadow project-card"
                onClick={() => openProject(p)}
              >
                <div className="w-full flex justify-center bg-background">
                  <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={p.source === "instagram" ? "/placeholder.svg" : p.img}
                      loading="lazy"
                      decoding="async"
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="project-meta p-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{p.title}</span>
                    <span className="text-xs text-white/80 mt-1 hidden sm:block">{p.desc}</span>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogOverlay />
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              <DialogTitle className="sr-only">{p.title}</DialogTitle>
              <div className="w-full flex justify-center py-8 bg-background">
                <div className="w-full max-w-3xl overflow-hidden rounded-lg">
                  <img
                    src={p.source === "instagram" ? "/placeholder.svg" : `${p.img}?format=webp&width=1200`}
                    srcSet={
                      p.source === "instagram"
                        ? "/placeholder.svg"
                        : `${p.img}?format=webp&width=400 400w, ${p.img}?format=webp&width=800 800w, ${p.img}?format=webp&width=1200 1200w`
                    }
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 360px, 420px"
                    width={1200}
                    height={711}
                    loading="lazy"
                    decoding="async"
                    alt={p.title}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{p.desc}</p>
                    <div className="flex gap-2 mt-3">
                      {p.tags?.map((t) => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.source === "figma" && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="btn-glow inline-block rounded-full px-4 py-2">
                        Open in Figma
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((p) => (
          <Dialog key={p.id} open={active?.id === p.id} onOpenChange={(o) => !o && setActive(null)}>
            <DialogTrigger asChild>
              <button
                className={cn("w-full rounded-2xl overflow-hidden border border-white/20 shadow project-card", "bg-glass group")}
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  const r = t.getBoundingClientRect();
                  const px = (e.clientX - r.left) / r.width - 0.5;
                  const py = (e.clientY - r.top) / r.height - 0.5;
                  t.style.transform = `perspective(800px) rotateX(${py * 6}deg) rotateY(${-px * 6}deg)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
                onClick={() => openProject(p)}
              >
                <div className="w-full flex justify-center bg-background">
                  <div className="w-full max-w-[320px] overflow-hidden rounded-lg">
                    <img
                      src={p.source === "instagram" ? "/placeholder.svg" : p.img}
                      loading="lazy"
                      decoding="async"
                      alt={p.title}
                      className="w-full h-[240px] md:h-[280px] lg:h-[320px] object-cover"
                    />
                  </div>
                </div>
                <div className="project-meta p-3 text-center">
                  <span className="font-semibold text-sm">{p.title}</span>
                </div>
              </button>
            </DialogTrigger>
            <DialogOverlay />
            <DialogContent className="max-w-5xl p-0 overflow-hidden">
              <DialogTitle className="sr-only">{p.title}</DialogTitle>
              <div className="w-full flex justify-center py-10 bg-background">
                <div className="w-full max-w-5xl overflow-hidden rounded-lg">
                  <img
                    src={p.source === "instagram" ? "/placeholder.svg" : `${p.img}?format=webp&width=1200`}
                    srcSet={
                      p.source === "instagram"
                        ? "/placeholder.svg"
                        : `${p.img}?format=webp&width=800 800w, ${p.img}?format=webp&width=1200 1200w, ${p.img}?format=webp&width=1600 1600w`
                    }
                    sizes="(max-width: 768px) 420px, (max-width: 1200px) 520px, 640px"
                    width={1200}
                    height={711}
                    loading="lazy"
                    decoding="async"
                    alt={p.title}
                    className="w-full h-auto object-contain rounded-lg crop-watermark"
                  />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{p.desc}</p>
                    <div className="flex gap-2 mt-3">
                      {p.tags?.map((t) => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.source === "figma" && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="btn-glow inline-block rounded-full px-4 py-2">
                        Open in Figma
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
