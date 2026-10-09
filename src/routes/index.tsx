import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, AlertTriangle, MapPin, Building2, CalendarClock, GitMerge, Megaphone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { demoProjects, demoConflicts, type Project, type ProjectStatus } from "@/data/demo-projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorksWatch — Track public works in your city" },
      { name: "description", content: "See progress, delays and coordination conflicts on road, drainage and pipeline projects, and report problems." },
      { property: "og:title", content: "WorksWatch — Track public works in your city" },
      { property: "og:description", content: "Citizen-friendly tracking of public infrastructure projects, delays and reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const statusStyle: Record<ProjectStatus, string> = {
  "On track": "bg-success/12 text-success",
  Delayed: "bg-destructive/12 text-destructive",
  Completed: "bg-primary/12 text-primary",
  Planned: "bg-muted text-muted-foreground",
};

function DemoBadge() {
  return (
    <span className="rounded-full border border-dashed border-primary/50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
      Demo data
    </span>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
      <DemoBadge />
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.type}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug">{p.name}</h3>
        </div>
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", statusStyle[p.status])}>{p.status}</span>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold">{p.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={p.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.name} progress`}>
          <div className={cn("h-full rounded-full transition-all", p.status === "Delayed" ? "bg-destructive" : "bg-primary")} style={{ width: `${p.progress}%` }} />
        </div>
      </div>
      <dl className="grid gap-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /><dt className="sr-only">Location</dt><dd>{p.location}</dd></div>
        <div className="flex items-center gap-2"><Building2 className="h-4 w-4" aria-hidden /><dt className="sr-only">Department</dt><dd>{p.department}</dd></div>
        <div className="flex items-center gap-2"><CalendarClock className="h-4 w-4" aria-hidden /><dt className="sr-only">Estimated completion</dt><dd>Est. completion {p.estCompletion}</dd></div>
      </dl>
    </article>
  );
}

function Index() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return demoProjects;
    return demoProjects.filter((p) => [p.name, p.location, p.department, p.type].join(" ").toLowerCase().includes(s));
  }, [q]);

  const delayed = demoProjects.filter((p) => p.status === "Delayed");
  const stats = [
    { label: "Total projects", value: demoProjects.length },
    { label: "Ongoing", value: demoProjects.filter((p) => p.status === "On track" || p.status === "Delayed").length },
    { label: "Delayed", value: delayed.length },
    { label: "Unresolved reports", value: demoProjects.reduce((n, p) => n + p.openReports, 0) },
  ];

  return (
    <AppShell>
      <section className="hero-surface border-b">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">WorksWatch</p>
          <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] md:text-6xl">
              Know what's being built on your street — <em className="text-primary">and why it's late.</em>
            </h1>
            <button className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl md:self-auto">
              <Megaphone className="h-5 w-5" aria-hidden /> Report a Problem
            </button>
          </div>
          <label htmlFor="search" className="mt-10 block text-sm font-medium">Search projects</label>
          <div className="relative mt-2 max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try a street, ward, or department…"
              className="w-full rounded-xl border bg-card py-4 pl-12 pr-4 text-base shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 md:px-10">
        <section>
          <SectionHead title={q ? `Results for “${q}”` : "Projects near you"} sub="Sample projects to show how WorksWatch will look." />
          {results.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{results.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
          ) : (
            <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">No projects match that search.</p>
          )}
        </section>

        <section aria-label="Summary">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5">
                <p className="font-display text-4xl font-medium">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Figures calculated from demo data, not live government records.</p>
        </section>

        <section>
          <SectionHead title="Delayed projects" sub="Where work is behind schedule, in plain words." />
          <ul className="divide-y rounded-xl border bg-card">
            {delayed.map((p) => (
              <li key={p.id} className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.delayReason}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground md:text-right">{p.progress}% done · now {p.estCompletion}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHead title="Potential coordination conflicts" sub="Nearby projects with overlapping schedules that could mean digging the same road twice." />
          <div className="grid gap-5 md:grid-cols-2">
            {demoConflicts.map((c) => (
              <article key={c.id} className="rounded-xl border border-warning/40 bg-card p-5 transition-colors hover:border-warning">
                <div className="flex items-center gap-2 text-sm font-semibold text-warning">
                  <GitMerge className="h-4 w-4" aria-hidden /> Overlap {c.overlap}
                </div>
                <p className="mt-3 font-semibold">{c.a}</p>
                <p className="text-sm text-muted-foreground">and</p>
                <p className="font-semibold">{c.b}</p>
                <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" aria-hidden />{c.area}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
