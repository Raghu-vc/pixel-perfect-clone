import { useSyncExternalStore } from "react";
import { seedReports, type Report } from "@/data/demo-reports";

// Frontend-only demo store: seed reports + user submissions kept in localStorage.
const KEY = "workswatch-demo-reports";
const listeners = new Set<() => void>();
let cache: Report[] | null = null;

function readUser(): Report[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getSnapshot(): Report[] {
  if (!cache) cache = [...readUser(), ...seedReports];
  return cache;
}
const getServerSnapshot = () => seedReports;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useReports() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Saves a report. Throws if it could not be stored, so callers never show false success. */
export function addReport(r: Report) {
  const next = [r, ...readUser()];
  localStorage.setItem(KEY, JSON.stringify(next));
  if (!readUser().some((x) => x.id === r.id)) throw new Error("Report could not be saved");
  cache = null;
  listeners.forEach((l) => l());
}
