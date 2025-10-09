import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#instagram", label: "Instagram" },
  { href: "#contact", label: "Contact" },
];

import { Mail, Phone, Linkedin } from "lucide-react";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen antialiased">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-background text-foreground px-3 py-2 rounded-md shadow"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-white/20">
        <div className="container flex items-center justify-between h-16">
          <a href="#hero" className="font-heading text-sm md:text-base tracking-tight leading-tight">
            <div className="text-gradient text-lg md:text-2xl">Rahul Kshirsagar</div>
            <div className="text-foreground/70 text-xs md:text-sm">UI/UX &amp; Graphic Designer</div>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              n.href.startsWith('#') ? (
                <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-foreground transition-colors">{n.label}</a>
              ) : (
                <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-foreground transition-colors">{n.label}</a>
              )
            ))}
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <a
              href="mailto:akshirsagar08@gmail.com"
              className={cn(
                "btn-glow inline-flex items-center rounded-full px-4 py-2 text-sm font-medium",
              )}
            >
              Contact
            </a>
          </div>
        </div>
      </header>
      <main id="content">{children}</main>
      <footer className="border-t border-white/10 mt-20">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/70">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-heading">RK</span>
              <span className="text-xs text-foreground/60">UI/UX & Graphic Designer</span>
            </div>
            <div className="pl-4 border-l border-white/10 text-xs">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-foreground/60" aria-hidden="true" /><a href="mailto:akshirsagar08@gmail.com" className="hover:underline">akshirsagar08@gmail.com</a></div>
              <div className="flex items-center gap-2 text-foreground/60"><Phone className="h-4 w-4 text-foreground/60" aria-hidden="true" /><a href="tel:+917058223778" className="hover:underline">+91-7058223778</a></div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-foreground/70">© {new Date().getFullYear()} Rahul Kshirsagar</div>

            <div className="flex items-center gap-3 ml-4">
              <a href="https://github.com/Rahul032004" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-foreground flex items-center gap-2" aria-label="GitHub">
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.305-.536-1.535.117-3.195 0 0 1.01-.323 3.3 1.23a11.5 11.5 0 013.003-.405c1.02.005 2.045.138 3.003.405 2.29-1.553 3.297-1.23 3.297-1.23.655 1.66.243 2.89.12 3.195.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/rahul-kshirsagar-959b74281/" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-foreground flex items-center gap-2" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>

              <a href="https://www.figma.com/design/o0uTa6xWHWod8jf4jXdShy/freshflod?node-id=0-1&t=zbwyMmd8IeZlOALW-1" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-foreground flex items-center gap-2 px-2 py-1 rounded bg-foreground/2" aria-label="Figma">
                Figma
              </a>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const email = String(data.get("footer_email") ?? "").trim();
                if (!email || !/\S+@\S+\.\S+/.test(email)) {
                  toast({ title: "Invalid email", description: "Please enter a valid email." });
                  return;
                }
                const owner = "akshirsagar08@gmail.com";
                const subject = encodeURIComponent("Newsletter signup");
                const body = encodeURIComponent(`Please add ${email} to the newsletter list.`);
                window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
                toast({ title: "Opened mail client", description: "Please confirm the subscription in your email client." });
                form.reset();
              }}
              className="ml-6 flex items-center gap-2"
            >
              <input name="footer_email" type="email" placeholder="Your email" className="input-glow text-sm" />
              <button type="submit" className="btn-glow px-3 py-2 rounded-full text-sm">Subscribe</button>
            </form>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="ml-4 bg-transparent border border-white/10 rounded-full px-3 py-2 text-sm hover:bg-white/2"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
