import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ConflictGrid, PageHeader, SectionHead } from "@/components/ui-blocks";

export const Route = createFileRoute("/conflicts")({
  head: () => ({
    meta: [
      { title: "Potential Conflicts — WorksWatch" },
      { name: "description", content: "Nearby projects with overlapping schedules that could mean the same road is dug up twice." },
      { property: "og:title", content: "Potential Conflicts — WorksWatch" },
      { property: "og:description", content: "Nearby projects with overlapping schedules that could mean the same road is dug up twice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <PageHeader eyebrow="Potential Conflicts" title="Projects that may get in each other's way" sub="When nearby works overlap in time, a fresh road can end up dug up again. Automatic detection is coming in a later version." />
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-10">
        <SectionHead title="Flagged overlaps" sub="Based on location and schedule of demo projects." />
        <ConflictGrid />
      </div>
    </AppShell>
  ),
});
