import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ui-blocks";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Community Insights — WorksWatch" },
      { name: "description", content: "See what neighbours are reporting and which areas need the most attention." },
      { property: "og:title", content: "Community Insights — WorksWatch" },
      { property: "og:description", content: "See what neighbours are reporting and which areas need the most attention." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ComingSoon eyebrow="Community Insights" title="What your neighbourhood is saying" sub="See what neighbours are reporting and which areas need the most attention." />
    </AppShell>
  ),
});
