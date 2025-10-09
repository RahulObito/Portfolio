export default function Education() {
  return (
    <section id="education" className="container py-20">
      <h2 className="font-heading text-3xl md:text-4xl mb-6">Education</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-glass rounded-xl p-6 border border-white/20 shadow">
          <h3 className="font-semibold">SGGS Nanded</h3>
          <p className="text-foreground/70">B.Tech in Computer Science and Engineering (2022–26) — Pursuing</p>
        </div>
        <div className="bg-glass rounded-xl p-6 border border-white/20 shadow">
          <h3 className="font-semibold">Om Satya Sai Junior College</h3>
          <p className="text-foreground/70">Class 12th (2021–2022) — Maharashtra Board</p>
        </div>
        <div className="bg-glass rounded-xl p-6 border border-white/20 shadow">
          <h3 className="font-semibold">B.L. Nutan Maharashtra</h3>
          <p className="text-foreground/70">Class 10th (2019–2020) — Maharashtra Board</p>
        </div>
      </div>
    </section>
  );
}
