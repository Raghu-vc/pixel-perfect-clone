// DEMO DATA — illustrative only, not official government records.
export type ProjectStatus = "On track" | "Delayed" | "Completed" | "Planned";

export interface Project {
  id: string;
  name: string;
  type: "Road" | "Drainage" | "Pipeline" | "Streetlight";
  location: string;
  department: string;
  status: ProjectStatus;
  progress: number;
  estCompletion: string;
  delayReason?: string;
  openReports: number;
}

export const demoProjects: Project[] = [
  { id: "p1", name: "MG Road resurfacing, Phase 2", type: "Road", location: "Ward 12, Central", department: "Public Works Dept.", status: "On track", progress: 64, estCompletion: "Dec 2026", openReports: 3 },
  { id: "p2", name: "Lakeview storm-drain upgrade", type: "Drainage", location: "Ward 7, Lakeview", department: "Stormwater Division", status: "Delayed", progress: 38, estCompletion: "Feb 2027", delayReason: "Monsoon flooding paused excavation for 5 weeks.", openReports: 9 },
  { id: "p3", name: "Station Road water main", type: "Pipeline", location: "Ward 4, Old Town", department: "Water Supply Board", status: "Delayed", progress: 51, estCompletion: "Jan 2027", delayReason: "Waiting on traffic diversion permit.", openReports: 6 },
  { id: "p4", name: "Market Street LED lighting", type: "Streetlight", location: "Ward 9, Market", department: "Electrical Dept.", status: "Completed", progress: 100, estCompletion: "Sep 2026", openReports: 0 },
  { id: "p5", name: "Ring Road junction widening", type: "Road", location: "Ward 15, East", department: "Public Works Dept.", status: "On track", progress: 22, estCompletion: "Jun 2027", openReports: 2 },
  { id: "p6", name: "Station Road footpath relaying", type: "Road", location: "Ward 4, Old Town", department: "Public Works Dept.", status: "Planned", progress: 0, estCompletion: "Mar 2027", openReports: 1 },
];

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
