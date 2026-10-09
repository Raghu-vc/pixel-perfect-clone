import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Building2, CalendarClock, CalendarPlus, AlertTriangle, Megaphone, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BackHome, DemoBadge, ProgressBar, StatusPill } from "@/components/ui-blocks";
import { getProject } from "@/data/demo-projects";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found — WorksWatch" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    const title = `${p.name} — WorksWatch`;
    return {
      meta: [
        { title },
        { name: "description", content: p.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
        <BackHome />
        <h1 className="mt-6 text-3xl font-medium">We couldn't find that project</h1>
        <p className="mt-2 text-muted-foreground">It may have been removed from the demo list.</p>
        <Link to="/explore" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Browse all projects</Link>
      </div>
    </AppShell>
  );
}

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const facts = [
    { icon: MapPin, label: "Location", value: `${p.street}, ${p.location}` },
    { icon: Building2, label: "Responsible department", value: p.department },
    { icon: Tag, label: "Project type", value: p.type },
    { icon: CalendarPlus, label: "Start date", value: p.startDate },
    { icon: CalendarClock, label: "Estimated completion", value: p.estCompletion },
  ];

  return (
    <AppShell>
      <section className="hero-surface border-b">
        <div className="mx-auto max-w-5xl px-5 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BackHome />
            <DemoBadge />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusPill status={p.status} />
            <span className="text-sm text-muted-foreground">{p.openReports} open citizen report{p.openReports === 1 ? "" : "s"}</span>
          </div>
          <h1 className="mt-3 text-3xl font-medium leading-tight md:text-5xl">{p.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
          <div className="mt-8 max-w-xl"><ProgressBar p={p} /></div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:px-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {p.delayReason && (
            <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold"><AlertTriangle className="h-5 w-5 text-destructive" aria-hidden /> Why is this delayed?</h2>
              <p className="mt-3 leading-relaxed">{p.delayReason}</p>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-semibold">Timeline of updates</h2>
            <ol className="mt-6 border-l-2 border-border pl-6">
              {[...p.timeline].reverse().map((t, i) => (
                <li key={i} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t.date}</p>
                  <p className="mt-1 font-semibold">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.note}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-5">
          <dl className="divide-y rounded-xl border bg-card">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3 p-4">
                <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <dt className="text-xs text-muted-foreground">{f.label}</dt>
                  <dd className="font-medium">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <Link to="/reports" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Megaphone className="h-4 w-4" aria-hidden /> Report a problem here
          </Link>
          <p className="text-xs text-muted-foreground">All details on this page are demo data, not official government records.</p>
        </aside>
      </div>
    </AppShell>
  );
}
