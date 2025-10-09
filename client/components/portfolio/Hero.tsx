import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dribbble, Github, Linkedin } from "lucide-react";

function useTypewriter(text: string, speed = 50, delay = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    setHasStarted(false);
    
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
      }
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        setHasStarted(true);
        typeNextChar();
      }, delay);
    } else {
      setHasStarted(true);
      typeNextChar();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, delay]);

  return [displayText, isComplete, hasStarted] as const;
}

export default function Hero() {
  const title = "Hi, I'm Rahul — UI/UX & Graphic Designer";
  const [typed, typedDone] = useTypewriter(title, 80);
  const [tagline, taglineDone, taglineStarted] = useTypewriter(
    "I create sleek, user-friendly designs that tell stories.",
    60,
    3000, // Start tagline 3 seconds after component mounts
  );

  const floaters = useMemo(
    () => [
      { icon: Github, className: "left-[5%] top-[20%] animation-delay-1000" },
      { icon: Linkedin, className: "right-[8%] top-[35%] animation-delay-500" },
      { icon: Dribbble, className: "left-[12%] bottom-[15%] animation-delay-700" },
    ],
    [],
  );

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", String(px));
      el.style.setProperty("--my", String(py));
    };
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-hero",
        "pt-24 md:pt-32 pb-24",
      )}
    >
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-6xl leading-tight tracking-tight">
            <span className={cn("type-caret", typedDone && "no-caret")}>
              {typed}
              {!typedDone && <span className="inline-block w-0.5 h-[1em] bg-current animate-pulse ml-1"></span>}
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80">
            <span className={cn("type-caret", taglineDone && "no-caret")}>
              {tagline}
              {!taglineDone && taglineStarted && <span className="inline-block w-0.5 h-[1em] bg-current animate-pulse ml-1"></span>}
            </span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <GlowButton asChild>
              <a href="#projects">View My Work</a>
            </GlowButton>
            <GlowButton variant="secondary" asChild>
              <a href="#contact">Contact Me</a>
            </GlowButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="parallax-blobs" />
      </div>

      {floaters.map(({ icon: Icon, className }, i) => (
        <div
          key={i}
          className={cn(
            "pointer-events-none absolute z-0 text-foreground/15",
            "animate-float",
            className,
          )}
        >
          <Icon className="h-10 w-10 md:h-12 md:w-12" />
        </div>
      ))}
    </section>
  );
}

function GlowButton({
  className,
  asChild,
  variant = "default",
  children,
  ...props
}: any) {
  const Comp = asChild ? ("span" as any) : Button;
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <Comp
      className={cn(
        "relative overflow-hidden btn-glow rounded-full px-6 py-3",
        variant === "secondary" && "btn-glow-secondary",
        className,
      )}
      onClick={(e: any) => {
        const target = (ref.current ?? e.currentTarget) as HTMLElement;
        const ripple = document.createElement("span");
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.className = "ripple";
        target.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
      }}
      ref={ref as any}
      {...props}
    >
      {children}
    </Comp>
  );
}
