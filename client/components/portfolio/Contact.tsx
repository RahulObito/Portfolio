import { useRef, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    // visual ripple
    const target = btnRef.current as HTMLElement | null;
    if (target) {
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
      ripple.style.left = `${rect.width / 2 - Math.max(rect.width, rect.height) / 2}px`;
      ripple.style.top = `${rect.height / 2 - Math.max(rect.width, rect.height) / 2}px`;
      target.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast({ title: "Message sent", description: "Thanks — I will get back to you soon." });
        form.reset();
        return;
      }

      if (res.status === 501) {
        // Fallback: open mail client with prefilled content
        const owner = "akshirsagar08@gmail.com";
        const subject = encodeURIComponent(`Contact from ${name || email}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
        toast({ title: "Opened mail client", description: "Your message was opened in your email client." });
        form.reset();
        return;
      }

      const data = await res.json();
      toast({ title: "Error", description: data?.error || "Could not send message." });
    } catch (err) {
      // network error -> fallback to mailto
      const owner = "akshirsagar08@gmail.com";
      const subject = encodeURIComponent(`Contact from ${name || email}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
      toast({ title: "Opened mail client", description: "Your message was opened in your email client." });
      form.reset();
    }
  };

  return (
    <section id="contact" className="container py-20">
      <h2 className="font-heading text-3xl md:text-4xl mb-6">Contact</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <label className="text-sm">Name</label>
            <input name="name" type="text" required className="input-glow" placeholder="Your name" />
          </div>
          <div className="group">
            <label className="text-sm">Email</label>
            <input name="email" type="email" required className="input-glow" placeholder="you@example.com" />
          </div>
          <div className="group">
            <label className="text-sm">Message</label>
            <textarea name="message" required className="input-glow min-h-[140px]" placeholder="Tell me about your project" />
          </div>
          <button ref={btnRef} className={cn("btn-glow inline-flex items-center rounded-full px-6 py-3")}>Send Message</button>
        </form>
        <div className="space-y-4">
          <p className="text-foreground/80">
            Let’s collaborate. I’m open to freelance projects, internships, and design collaborations.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="size-4" /> <a href="mailto:akshirsagar08@gmail.com" className="hover:underline">akshirsagar08@gmail.com</a></li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> <a href="tel:+917058223778" className="hover:underline">+91-7058223778</a></li>
          </ul>
          <div className="flex items-center gap-4 pt-2">
            <a aria-label="GitHub" href="https://github.com/Rahul032004" target="_blank" rel="noreferrer" className="icon-link"><Github /></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/rahul-kshirsagar-959b74281/" target="_blank" rel="noreferrer" className="icon-link"><Linkedin /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
