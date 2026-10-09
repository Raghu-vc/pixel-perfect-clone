import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Home, Compass, FileWarning, GitMerge, Users, UserCircle, Menu, X, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", icon: Home, active: true },
  { label: "Explore Projects", icon: Compass },
  { label: "Reports", icon: FileWarning },
  { label: "Potential Conflicts", icon: GitMerge },
  { label: "Community Insights", icon: Users },
  { label: "Account", icon: UserCircle },
];

const themeOpts: { id: Theme; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "radiant", label: "Radiant", icon: Sparkles },
];

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-1 rounded-lg bg-sidebar-accent/60 p-1">
      {themeOpts.map((o) => (
        <button
          key={o.id}
          role="radio"
          aria-checked={theme === o.id}
          onClick={() => setTheme(o.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-md py-1.5 text-[11px] font-medium transition-colors",
            theme === o.id ? "bg-background text-foreground shadow-sm" : "text-sidebar-foreground/75 hover:text-sidebar-foreground",
          )}
        >
          <o.icon className="h-3.5 w-3.5" aria-hidden />
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SidebarBody({ onNav }: { onNav?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <Link to="/" onClick={onNav} className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold">WorksWatch</span>
      </Link>
      <nav aria-label="Main" className="flex flex-col gap-1">
        {nav.map((n) => (
          <button
            key={n.label}
            onClick={onNav}
            aria-current={n.active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
              n.active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <n.icon className="h-4 w-4" aria-hidden />
            {n.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60">Theme</p>
        <ThemeSelector />
        <p className="pt-2 text-xs text-sidebar-foreground/60">A civic-tech project by team 404 ERROR</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
        <SidebarBody />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-72 bg-sidebar text-sidebar-foreground shadow-xl animate-in slide-in-from-left duration-200">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute right-3 top-4 rounded-md p-2 hover:bg-sidebar-accent">
              <X className="h-5 w-5" />
            </button>
            <SidebarBody onNav={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-5 py-3 lg:hidden">
          <span className="font-display text-xl font-semibold">WorksWatch</span>
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-md p-2 hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
