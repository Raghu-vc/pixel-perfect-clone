import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ui-blocks";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — WorksWatch" },
      { name: "description", content: "Manage your profile, saved projects and notification preferences." },
      { property: "og:title", content: "Account — WorksWatch" },
      { property: "og:description", content: "Manage your profile, saved projects and notification preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ComingSoon eyebrow="Account" title="Your WorksWatch account" sub="Manage your profile, saved projects and notification preferences." />
    </AppShell>
  ),
});
