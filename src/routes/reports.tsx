import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ui-blocks";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — WorksWatch" },
      { name: "description", content: "Report problems like potholes, blocked drains or unsafe sites, and follow how they are resolved." },
      { property: "og:title", content: "Reports — WorksWatch" },
      { property: "og:description", content: "Report problems like potholes, blocked drains or unsafe sites, and follow how they are resolved." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ComingSoon eyebrow="Reports" title="Report a problem, track the fix" sub="Report problems like potholes, blocked drains or unsafe sites, and follow how they are resolved." />
    </AppShell>
  ),
});
