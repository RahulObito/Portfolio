import { useMemo } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast as showToast } from "@/hooks/use-toast";

const instagramPosts = [
  {
    id: 1,
    title: "Instagram Reel — CoR4D-vOotS",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&crop=center",
    url: "https://www.instagram.com/reel/CoR4D-vOotS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    title: "Instagram Post — Cn9_CWcPMw4",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
    url: "https://www.instagram.com/p/Cn9_CWcPMw4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    title: "Instagram Reel — Cnei1RGoodQ",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop&crop=center",
    url: "https://www.instagram.com/reel/Cnei1RGoodQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 4,
    title: "Instagram Reel — CoX4GPBsDj0",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=center",
    url: "https://www.instagram.com/reel/CoX4GPBsDj0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    title: "Instagram Reel — CwXr5cjIkaS",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center",
    url: "https://www.instagram.com/reel/CwXr5cjIkaS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    title: "Instagram Post — C1Haqh2i3ei",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center",
    url: "https://www.instagram.com/p/C1Haqh2i3ei/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  }
];

export default function Instagram() {
  const posts = useMemo(() => instagramPosts, []);

  const openPost = (post: typeof posts[number]) => {
    if (!post?.url) return;
    try {
      window.open(post.url, "_blank", "noopener,noreferrer");
      showToast({
        title: "Opening Instagram post",
        description: post.title,
      });
    } catch (e) {
      // fallback
      window.location.href = post.url;
    }
  };

  return (
    <section id="instagram" className="container py-20">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-heading text-3xl md:text-4xl">Instagram</h2>
        <p className="text-sm text-foreground/70">Latest posts and reels</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {posts.map((post) => (
          <Dialog key={post.id}>
            <DialogTrigger asChild>
              <button
                className={cn(
                  "w-full aspect-square rounded-xl overflow-hidden border border-white/20 shadow",
                  "bg-glass group relative",
                )}
                onClick={() => openPost(post)}
              >
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-xs text-white font-medium line-clamp-2">{post.title}</span>
                </div>
              </button>
            </DialogTrigger>
            <DialogOverlay />
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              <DialogTitle className="sr-only">{post.title}</DialogTitle>
              <div className="w-full flex justify-center py-8 bg-background">
                <div className="w-full max-w-3xl overflow-hidden rounded-lg">
                  <img
                    src={`${post.img}?format=webp&width=1200`}
                    srcSet={`${post.img}?format=webp&width=400 400w, ${post.img}?format=webp&width=800 800w, ${post.img}?format=webp&width=1200 1200w`}
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 360px, 420px"
                    width={1200}
                    height={711}
                    loading="lazy"
                    decoding="async"
                    alt={post.title}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
              <div className="p-4 flex justify-center">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glow inline-block rounded-full px-4 py-2"
                >
                  View on Instagram
                </a>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}