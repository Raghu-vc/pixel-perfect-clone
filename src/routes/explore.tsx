import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ProjectCard, SectionHead } from "@/components/ui-blocks";
import { demoProjects, matchesQuery, PROJECT_STATUSES, PROJECT_TYPES } from "@/data/demo-projects";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Projects — WorksWatch" },
      { name: "description", content: "Search and filter public works projects by type, status and location." },
      { property: "og:title", content: "Explore Projects — WorksWatch" },
      { property: "og:description", content: "Search and filter public works projects by type, status and location." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

const locations = Array.from(new Set(demoProjects.map((p) => p.location)));
const selectCls = "w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20";

function Explore() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [loc, setLoc] = useState("all");

  const results = useMemo(
    () =>
      demoProjects.filter(
        (p) => matchesQuery(p, q) && (type === "all" || p.type === type) && (status === "all" || p.status === status) && (loc === "all" || p.location === loc),
      ),
    [q, type, status, loc],
  );
  const filtered = q || type !== "all" || status !== "all" || loc !== "all";

  return (
    <AppShell>
      <PageHeader eyebrow="Explore Projects" title="Every project, in one place" sub="Search by name, street, ward, or department, then narrow down with filters.">
        <div className="mt-8 grid max-w-4xl gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <label htmlFor="q" className="mb-1.5 block text-xs font-medium">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Station Road, Ward 7" className={`${selectCls} pl-9`} />
            </div>
          </div>
          <Filter id="type" label="Project type" value={type} onChange={setType} options={PROJECT_TYPES} />
          <Filter id="status" label="Status" value={status} onChange={setStatus} options={PROJECT_STATUSES} />
          <Filter id="loc" label="Location" value={loc} onChange={setLoc} options={locations} />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-10">
        <SectionHead title={`${results.length} project${results.length === 1 ? "" : "s"}`} sub="Select a project to see its timeline and details." />
        {filtered && (
          <button onClick={() => { setQ(""); setType("all"); setStatus("all"); setLoc("all"); }} className="mb-5 text-sm font-semibold text-primary hover:underline">
            Clear search and filters
          </button>
        )}
        {results.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{results.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
        ) : (
          <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">No projects match. Try removing a filter.</p>
        )}
      </div>
    </AppShell>
  );
}

function Filter({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        <option value="all">All</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
