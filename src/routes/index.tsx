import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, AlertTriangle, MapPin, GitMerge, Megaphone, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProjectCard, SectionHead } from "@/components/ui-blocks";
import { demoProjects, demoConflicts, matchesQuery } from "@/data/demo-projects";

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

function Index() {
  const [q, setQ] = useState("");
  const results = useMemo(() => demoProjects.filter((p) => matchesQuery(p, q)), [q]);

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
            <Link to="/reports" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl md:self-auto">
              <Megaphone className="h-5 w-5" aria-hidden /> Report a Problem
            </Link>
          </div>
          <label htmlFor="search" className="mt-10 block text-sm font-medium">Search projects</label>
          <div className="relative mt-2 max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, street, ward, or department…"
              className="w-full rounded-xl border bg-card py-4 pl-12 pr-4 text-base shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 md:px-10">
        <section>
          <SectionHead title={q ? `Results for “${q}”` : "Projects near you"} sub="Sample projects to show how WorksWatch will look. Select one for details." />
          {results.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{results.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
          ) : (
            <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">No projects match that search.</p>
          )}
          <Link to="/explore" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Explore all projects with filters <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
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
              <li key={p.id}>
                <Link to="/projects/$projectId" params={{ projectId: p.id }} className="flex flex-col gap-2 p-5 transition-colors hover:bg-muted/50 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.delayReason}</p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm text-muted-foreground md:text-right">{p.progress}% done · now {p.estCompletion}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHead title="Potential coordination conflicts" sub="Nearby projects with overlapping schedules that could mean digging the same road twice." />
          <ConflictGrid />
        </section>
      </div>
    </AppShell>
  );
}

export function ConflictGrid() {
  return (
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
  );
}
