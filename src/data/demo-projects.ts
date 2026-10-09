// DEMO DATA — illustrative only, not official government records.
export type ProjectStatus = "On track" | "Delayed" | "Completed" | "Planned";
export type ProjectType = "Road" | "Drainage" | "Pipeline" | "Streetlight";

export interface TimelineEntry {
  date: string;
  title: string;
  note: string;
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  street: string;
  ward: string;
  location: string;
  department: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  estCompletion: string;
  summary: string;
  delayReason?: string;
  openReports: number;
  timeline: TimelineEntry[];
}

export const PROJECT_TYPES: ProjectType[] = ["Road", "Drainage", "Pipeline", "Streetlight"];
export const PROJECT_STATUSES: ProjectStatus[] = ["On track", "Delayed", "Completed", "Planned"];

export const demoProjects: Project[] = [
  {
    id: "mg-road-resurfacing",
    name: "MG Road resurfacing, Phase 2",
    type: "Road",
    street: "MG Road",
    ward: "Ward 12",
    location: "Ward 12, Central",
    department: "Public Works Dept.",
    status: "On track",
    progress: 64,
    startDate: "Jun 2026",
    estCompletion: "Dec 2026",
    summary: "Removing worn asphalt and laying a new road surface along 2.4 km of MG Road, with new lane markings.",
    openReports: 3,
    timeline: [
      { date: "Jun 2026", title: "Work started", note: "Barricades placed on the northern stretch." },
      { date: "Aug 2026", title: "Northern stretch finished", note: "1.1 km resurfaced and reopened to traffic." },
      { date: "Sep 2026", title: "Southern stretch begun", note: "Night work to reduce daytime traffic jams." },
    ],
  },
  {
    id: "lakeview-storm-drain",
    name: "Lakeview storm-drain upgrade",
    type: "Drainage",
    street: "Lake Road",
    ward: "Ward 7",
    location: "Ward 7, Lakeview",
    department: "Stormwater Division",
    status: "Delayed",
    progress: 38,
    startDate: "Apr 2026",
    estCompletion: "Feb 2027",
    summary: "Replacing old drains with wider ones so streets near the lake flood less during heavy rain.",
    delayReason: "Heavy monsoon flooding filled the open trenches, so digging had to stop for about 5 weeks. The finish date moved from Nov 2026 to Feb 2027.",
    openReports: 9,
    timeline: [
      { date: "Apr 2026", title: "Work started", note: "Excavation began near Lake Road junction." },
      { date: "Jul 2026", title: "Work paused", note: "Flooding made trenches unsafe." },
      { date: "Aug 2026", title: "Work resumed", note: "Pumps installed; digging restarted." },
      { date: "Sep 2026", title: "New finish date", note: "Estimated completion revised to Feb 2027." },
    ],
  },
  {
    id: "station-road-water-main",
    name: "Station Road water main",
    type: "Pipeline",
    street: "Station Road",
    ward: "Ward 4",
    location: "Ward 4, Old Town",
    department: "Water Supply Board",
    status: "Delayed",
    progress: 51,
    startDate: "May 2026",
    estCompletion: "Jan 2027",
    summary: "Laying a new, larger water pipe under Station Road to improve water pressure for nearby homes.",
    delayReason: "The final section crosses a busy junction. Work is waiting for police approval to divert traffic, which has taken longer than planned.",
    openReports: 6,
    timeline: [
      { date: "May 2026", title: "Work started", note: "Trenching began from the railway end." },
      { date: "Jul 2026", title: "Half the pipe laid", note: "First 600 m connected and tested." },
      { date: "Sep 2026", title: "Waiting for permit", note: "Junction section on hold pending traffic diversion approval." },
    ],
  },
  {
    id: "market-street-led",
    name: "Market Street LED lighting",
    type: "Streetlight",
    street: "Market Street",
    ward: "Ward 9",
    location: "Ward 9, Market",
    department: "Electrical Dept.",
    status: "Completed",
    progress: 100,
    startDate: "Mar 2026",
    estCompletion: "Sep 2026",
    summary: "Replacing old sodium streetlights with brighter, energy-saving LED lights along Market Street.",
    openReports: 0,
    timeline: [
      { date: "Mar 2026", title: "Work started", note: "Old fixtures removed in sections." },
      { date: "Jun 2026", title: "120 lights installed", note: "Two-thirds of the street lit with LEDs." },
      { date: "Sep 2026", title: "Completed", note: "All 180 lights working." },
    ],
  },
  {
    id: "ring-road-junction",
    name: "Ring Road junction widening",
    type: "Road",
    street: "Ring Road",
    ward: "Ward 15",
    location: "Ward 15, East",
    department: "Public Works Dept.",
    status: "On track",
    progress: 22,
    startDate: "Aug 2026",
    estCompletion: "Jun 2027",
    summary: "Adding a turning lane and safer pedestrian crossings at the busy Ring Road junction.",
    openReports: 2,
    timeline: [
      { date: "Aug 2026", title: "Work started", note: "Utility lines being shifted." },
      { date: "Oct 2026", title: "Footpath moved", note: "Temporary walkway opened for pedestrians." },
    ],
  },
  {
    id: "station-road-footpath",
    name: "Station Road footpath relaying",
    type: "Road",
    street: "Station Road",
    ward: "Ward 4",
    location: "Ward 4, Old Town",
    department: "Public Works Dept.",
    status: "Planned",
    progress: 0,
    startDate: "Jan 2027",
    estCompletion: "Mar 2027",
    summary: "Relaying broken footpaths with level paving and ramps for wheelchairs and prams.",
    openReports: 1,
    timeline: [{ date: "Sep 2026", title: "Approved", note: "Budget approved; work scheduled for Jan 2027." }],
  },
];

export const getProject = (id: string) => demoProjects.find((p) => p.id === id);

export function matchesQuery(p: Project, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [p.name, p.street, p.ward, p.location, p.department, p.type].join(" ").toLowerCase().includes(s);
}

export interface Conflict {
  id: string;
  a: string;
  b: string;
  area: string;
  overlap: string;
  note: string;
}

export const demoConflicts: Conflict[] = [
  { id: "c1", a: "Station Road water main", b: "Station Road footpath relaying", area: "Ward 4, Old Town", overlap: "Jan – Mar 2027", note: "Footpath may be relaid before pipeline trenching finishes, risking a second dig." },
  { id: "c2", a: "Lakeview storm-drain upgrade", b: "MG Road resurfacing, Phase 2", area: "Lakeview / Central border", overlap: "Nov – Dec 2026", note: "New asphalt at the MG Road end may be cut for drain outfall work." },
];
