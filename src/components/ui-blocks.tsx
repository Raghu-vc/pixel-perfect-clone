import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Building2, CalendarClock, ArrowLeft, Hammer } from "lucide-react";
import type { Project, ProjectStatus } from "@/data/demo-projects";
import { cn } from "@/lib/utils";

export const statusStyle: Record<ProjectStatus, string> = {
  "On track": "bg-success/12 text-success",
  Delayed: "bg-destructive/12 text-destructive",
  Completed: "bg-primary/12 text-primary",
  Planned: "bg-muted text-muted-foreground",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", statusStyle[status])}>{status}</span>;
}

export function DemoBadge() {
  return (
    <span className="rounded-full border border-dashed border-primary/50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
      Demo data
    </span>
  );
}

export function SectionHead({ title, sub }: { title: string; sub: string }) {
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

export function ProgressBar({ p }: { p: Project }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-semibold">{p.progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={p.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.name} progress`}>
        <div className={cn("h-full rounded-full transition-all", p.status === "Delayed" ? "bg-destructive" : "bg-primary")} style={{ width: `${p.progress}%` }} />
      </div>
    </div>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: p.id }}
      className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.type}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:text-primary">{p.name}</h3>
        </div>
        <StatusPill status={p.status} />
      </div>
      <ProgressBar p={p} />
      <dl className="grid gap-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /><dt className="sr-only">Location</dt><dd>{p.location}</dd></div>
        <div className="flex items-center gap-2"><Building2 className="h-4 w-4" aria-hidden /><dt className="sr-only">Department</dt><dd>{p.department}</dd></div>
        <div className="flex items-center gap-2"><CalendarClock className="h-4 w-4" aria-hidden /><dt className="sr-only">Estimated completion</dt><dd>Est. completion {p.estCompletion}</dd></div>
      </dl>
    </Link>
  );
}

export function BackHome() {
  return (
    <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
      <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
    </Link>
  );
}

export function PageHeader({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="hero-surface border-b">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <BackHome />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-medium leading-tight md:text-5xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export function ComingSoon({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} sub={sub} />
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-10">
        <div className="flex flex-col items-center rounded-xl border border-dashed bg-card p-12 text-center">
          <Hammer className="h-8 w-8 text-primary" aria-hidden />
          <p className="mt-4 text-lg font-semibold">This section is under construction</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">We're still building this part of WorksWatch. Check back in a later version.</p>
          <Link to="/explore" className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Explore projects instead
          </Link>
        </div>
      </div>
    </>
  );
}
