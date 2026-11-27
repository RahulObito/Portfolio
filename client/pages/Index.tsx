import { useState, type FormEvent, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, ArrowUp, Bot, ChartNoAxesCombined, Code2, Github, Globe, GraduationCap, Linkedin, Mail, Menu, Phone, Server, ShoppingCart, Workflow, X, Zap } from "lucide-react";
import "./portfolio-v3.css";
import OptionalAnalytics from "../OptionalAnalytics";

const nav = [["Home","hero"],["About","about"],["Skills","skills"],["Education","education"]];
const skills = [
  {icon: Globe, title:"Web Development", desc:"WordPress, Elementor, ACF and responsive websites."},
  {icon: ShoppingCart, title:"E-commerce", desc:"WooCommerce stores and payment integrations."},
  {icon: Workflow, title:"Automation", desc:"n8n, WhatsApp, CRM and workflow integrations."},
  {icon: Zap, title:"Performance", desc:"Core Web Vitals, caching and speed optimization."},
  {icon: ChartNoAxesCombined, title:"SEO & Analytics", desc:"On-page SEO, GA4, GTM and Search Console."},
  {icon: Server, title:"Hosting & Security", desc:"Cloudflare, cPanel, DNS, SSL and maintenance."}
];
const technologies=["WordPress","Elementor","WooCommerce","n8n","GitHub","Cloudflare","JavaScript","Vercel","MySQL","HTML & CSS","ACF","Google Analytics"];
const contacts=[
  {icon:Mail, label:"Email me", value:"akshirsagar08@gmail.com", href:"mailto:akshirsagar08@gmail.com"},
  {icon:Phone, label:"Call me", value:"+91 7058223778", href:"tel:+917058223778"},
  {icon:Linkedin, label:"Connect with me", value:"LinkedIn", href:"https://www.linkedin.com/in/rahul-kshirsagar03"},
  {icon:Github, label:"Explore my code", value:"GitHub", href:"https://github.com/RahulObito"}
];

export default function Index(){
  const [menu,setMenu]=useState(false);
  const [paused,setPaused]=useState(false);
  const [status,setStatus]=useState("");
  const [sending,setSending]=useState(false);
  const [sent,setSent]=useState(false);
  const accessKey=String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
  const move=(e:PointerEvent<HTMLElement>)=>{
    if(e.pointerType!=="mouse"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const r=e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px",((e.clientX-r.left)/r.width*100)+"%");
    e.currentTarget.style.setProperty("--py",((e.clientY-r.top)/r.height*100)+"%");
  };
  const submit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(sending)return;
    const form=e.currentTarget;
    const f=new FormData(form);
    const name=String(f.get("name")||"").trim(), email=String(f.get("email")||"").trim(), message=String(f.get("message")||"").trim(), subject=String(f.get("subject")||"").trim();
    setSent(false);
    if(!name||!email||!message){setStatus("Please enter your name, email and message.");return;}
    if(!accessKey){
      const body="Name: "+name+"\nEmail: "+email+"\n\n"+message;
      window.location.href="mailto:akshirsagar08@gmail.com?subject="+encodeURIComponent(subject||"Portfolio enquiry from "+name)+"&body="+encodeURIComponent(body);
      setStatus("Please send the prepared message from your email app. Nothing has been sent automatically.");
      return;
    }
    if(f.get("botcheck")){setStatus("Unable to submit the form.");return;}
    setSending(true);setStatus("Sending your message...");
    try{
      const res=await fetch("https://api.web3forms.com/submit",{
        method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({access_key:accessKey,name,email,subject:subject||"Portfolio enquiry from "+name,message,from_name:"Rahul Portfolio"})
      });
      const result=await res.json();
      if(!res.ok||result.success!==true)throw new Error("Submission rejected");
      window.dispatchEvent(new Event("portfolio-contact-success"));
      setSent(true);setStatus("Message sent successfully! Thank you for reaching out.");
      form.reset();
    }catch{
      setStatus("Your message could not be sent. Please try again or use the email link.");
    }finally{setSending(false);}
  };
  return <div className="rk-site">
    <a className="rk-skip" href="#content">Skip to content</a>
    <header className="rk-header"><div className="rk-nav rk-wrap">
      <a className="rk-logo" href="#hero" aria-label="Rahul Kshirsagar home">RK<span>.</span></a>
      <nav id="rk-main-nav" aria-label="Main navigation" className={"rk-links"+(menu?" is-open":"")}>{nav.map(([label,id])=><a href={"#"+id} key={id} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
      <div className="rk-nav-actions"><a className="rk-contact-link" href="#contact" onClick={()=>setMenu(false)}>Get in touch <ArrowUpRight size={15}/></a><button className="rk-mobile" type="button" aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu} aria-controls="rk-main-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
    </div></header>
    <main id="content" tabIndex={-1}>
      <section className="rk-hero" id="hero" onPointerMove={move} onPointerLeave={e=>{e.currentTarget.style.removeProperty("--px");e.currentTarget.style.removeProperty("--py");}}>
        <div className="rk-mesh" aria-hidden="true"/><div className="rk-orb" aria-hidden="true"/><div className="rk-spot" aria-hidden="true"/>
        <div className="rk-float f1" aria-hidden="true"><span className="rk-wp">W</span></div><div className="rk-float f2" aria-hidden="true"><Code2/></div><div className="rk-float f3" aria-hidden="true"><ChartNoAxesCombined/></div><div className="rk-float f4" aria-hidden="true"><Bot/></div>
        <div className="rk-intro"><div className="rk-tag"><i/> WORDPRESS DEVELOPER &amp; AUTOMATION</div><h1>Hi, I'm Rahul.<br/><span className="rk-grad">I Build. Optimize.<br/>Automate.</span></h1>
          <p>Building high-performing websites, intelligent workflows and seamless digital experiences.</p>
          <div className="rk-buttons"><a className="rk-btn primary" href="#skills">Explore My Skills <ArrowUpRight size={17}/></a><a className="rk-btn secondary" href="#experience">My Experience <ArrowDown size={16}/></a></div>
          <div className="rk-social"><a href="https://github.com/RahulObito" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={12}/></a><a href="https://www.linkedin.com/in/rahul-kshirsagar03" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={12}/></a></div>
        </div>
      </section>
      <div className="rk-stats"><div className="rk-wrap rk-stat-grid"><div><strong>1 Year</strong><span>Professional Experience</span></div><div><strong>WordPress</strong><span>Core Specialization</span></div><div><strong>B.Tech</strong><span>Computer Science</span></div></div></div>
      <section className="rk-wrap rk-section rk-about" id="about"><div><p className="rk-eyebrow">01 / ABOUT ME</p><h2>More than just<br/><span className="rk-grad">a website developer.</span></h2><p className="rk-copy">I'm a Computer Science graduate and WordPress Executive at DigitalNil. I combine web development, performance optimization and automation to create websites that work smarter.</p></div>
        <div className="rk-terminal"><div className="rk-terminal-bar"><i/><i/><i/><span>developer.js</span></div><pre><span className="rk-keyword">const</span>{' developer = {\n  name: '}<span className="rk-string">"Rahul Kshirsagar"</span>{',\n  role: "WordPress Developer",\n  focus: [\n    "Web Development",\n    "SEO & Performance",\n    "Automation"\n  ],\n  learning: '}<span className="rk-string">true</span>{'\n};'}<span className="rk-cursor"> ▌</span></pre></div>
      </section>
      <section className="rk-wrap rk-section rk-expertise" id="skills"><p className="rk-eyebrow">02 / EXPERTISE</p><h2>What I <span className="rk-grad">bring to the table.</span></h2><p className="rk-copy">Building smarter websites and efficient digital systems.</p><div className="rk-tiles">{skills.map(({icon:Icon,title,desc})=><article className="rk-tile" key={title}><Icon size={31} strokeWidth={1.6}/><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
      <div className="rk-stack"><div className="rk-stack-head"><span>MY TECHNOLOGY STACK</span><button type="button" onClick={()=>setPaused(!paused)}>{paused?"Play":"Pause"} animation</button></div><div className={"rk-marquee"+(paused?" paused":"")}>{[0,1].map(i=><div className="rk-group" key={i} aria-hidden={i===1}>{technologies.map(t=><span key={t}>{t}</span>)}</div>)}</div></div>
      <section className="rk-wrap rk-section" id="experience"><p className="rk-eyebrow">03 / EXPERIENCE</p><h2>My professional <span className="rk-grad">journey.</span></h2><div className="rk-timeline"><article><span>DEC 2025 — PRESENT</span><h3>WordPress Executive · DigitalNil</h3><p>Website development, Elementor customization, SEO, automation, hosting and performance optimization.</p></article><article><span>2023 — 2024</span><h3>Media &amp; Design Head · RNXG</h3><p>Creative leadership, team coordination, branding and design management.</p></article></div></section>
      <section className="rk-wrap rk-section rk-education" id="education"><p className="rk-eyebrow">04 / EDUCATION</p><h2>Academic <span className="rk-grad">background.</span></h2><article className="rk-edu-card"><div className="rk-symbol"><GraduationCap size={29}/></div><div><span>2022 — 2026 · COMPLETED</span><h3>B.Tech in Computer Science &amp; Engineering</h3><p>Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded.</p></div></article></section>
      <section className="rk-wrap rk-section rk-achievements" aria-labelledby="rk-achievements-title"><p className="rk-eyebrow">CAREER HIGHLIGHTS</p><h2 id="rk-achievements-title">Experience in <span className="rk-grad">action.</span></h2><div className="rk-tiles"><article className="rk-tile"><Globe size={28}/><h3>WordPress development</h3><p>Built responsive business websites, conversion-focused landing pages and reusable Elementor templates.</p></article><article className="rk-tile"><Workflow size={28}/><h3>Workflow automation</h3><p>Developed a personal WhatsApp scheduling system using Node.js, GitHub Actions and Vercel. Project ongoing.</p></article><article className="rk-tile"><GraduationCap size={28}/><h3>Engineering graduate</h3><p>Completed B.Tech in Computer Science and Engineering and previously led media and design at RNXG.</p></article></div></section><section className="rk-contact" id="contact"><div className="rk-wrap rk-section"><p className="rk-eyebrow">05 / GET IN TOUCH</p><h2>Let's build something<br/><span className="rk-grad">meaningful together.</span></h2><p className="rk-copy">Have a project, job opportunity or an idea? I'd love to hear from you.</p><div className="rk-contact-grid"><div><div className="rk-available"><i/> Open to opportunities</div>{contacts.map(({icon:Icon,label,value,href})=><a key={label} className="rk-method" href={href} target={href.startsWith("https:")?"_blank":undefined} rel={href.startsWith("https:")?"noreferrer":undefined}><div className="rk-symbol"><Icon size={21}/></div><div><small>{label}</small><span>{value}</span></div>{href.startsWith("https:")&&<ArrowUpRight className="rk-external" size={16}/>}</a>)}</div><form data-clarity-mask="true" className="rk-form" onSubmit={submit} aria-busy={sending}><input type="checkbox" name="botcheck" hidden tabIndex={-1} aria-hidden="true" style={{display:"none"}}/><label htmlFor="rk-name">Your name</label><input id="rk-name" name="name" required autoComplete="name" maxLength={100} placeholder="John Doe"/><label htmlFor="rk-email">Email address</label><input id="rk-email" name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@example.com"/><label htmlFor="rk-subject">Subject</label><input id="rk-subject" name="subject" maxLength={150} placeholder="Job opportunity / Project"/><label htmlFor="rk-message">Your message</label><textarea id="rk-message" name="message" required maxLength={2000} placeholder="Tell me what you have in mind..."/><button type="submit" className="rk-btn primary" disabled={sending} style={{opacity:sending?.65:1}}>{sending?"Sending...":accessKey?"Send Message":"Open email app"} <ArrowUpRight size={16}/></button><p className="rk-form-note">{accessKey?"Your message is sent to my inbox using Web3Forms.":"The form prepares your message in your email app. You send it from there."}</p><p role="status" aria-live="polite" className="rk-form-note" style={{color:sent?"#86efac":undefined}}>{status}</p></form></div></div></section>
    </main>
    <footer className="rk-footer"><div className="rk-wrap"><span>© {new Date().getFullYear()} Rahul Kshirsagar</span><span>Build. Optimize. Automate. <a href="#hero" aria-label="Back to top"><ArrowUp size={16}/></a></span></div><OptionalAnalytics /></footer>
  </div>;
}
