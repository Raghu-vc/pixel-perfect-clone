// DEMO DATA — sample citizen reports, not real submissions.
export const REPORT_CATEGORIES = [
  "Stalled work",
  "Unsafe site",
  "Poor construction quality",
  "Duplicate excavation",
  "Missed deadline",
  "Other concern",
] as const;
export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export const REPORT_STATUSES = ["Submitted", "Acknowledged", "Under Review", "Action Taken", "Resolved"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export interface StatusUpdate {
  status: ReportStatus;
  date: string; // ISO date
  note: string;
}

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  projectId?: string;
  location: string;
  description: string;
  observedOn: string; // ISO date
  submittedOn: string; // ISO date
  status: ReportStatus;
  history: StatusUpdate[];
  isUserSubmitted?: boolean;
}

export const seedReports: Report[] = [
  {
    id: "r-1001",
    title: "Open trench without barricades near school",
    category: "Unsafe site",
    projectId: "lakeview-storm-drain",
    location: "Lake Road, Ward 7",
    description: "A deep trench has been left open overnight next to the primary school gate. There are no barricades or warning lights.",
    observedOn: "2026-09-02",
    submittedOn: "2026-09-02",
    status: "Action Taken",
    history: [
      { status: "Submitted", date: "2026-09-02", note: "Report received." },
      { status: "Acknowledged", date: "2026-09-03", note: "Forwarded to the site engineer." },
      { status: "Under Review", date: "2026-09-04", note: "Site inspection scheduled." },
      { status: "Action Taken", date: "2026-09-06", note: "Barricades and reflective tape installed." },
    ],
  },
  {
    id: "r-1002",
    title: "No work seen for three weeks",
    category: "Stalled work",
    projectId: "station-road-water-main",
    location: "Station Road junction, Ward 4",
    description: "Machines are parked but nobody has worked here for about three weeks. The road is half-dug and traffic is backed up.",
    observedOn: "2026-09-18",
    submittedOn: "2026-09-19",
    status: "Under Review",
    history: [
      { status: "Submitted", date: "2026-09-19", note: "Report received." },
      { status: "Acknowledged", date: "2026-09-20", note: "Department notified." },
      { status: "Under Review", date: "2026-09-24", note: "Checking status of traffic diversion permit." },
    ],
  },
  {
    id: "r-1003",
    title: "New road surface already cracking",
    category: "Poor construction quality",
    projectId: "mg-road-resurfacing",
    location: "MG Road, near City Library, Ward 12",
    description: "The stretch resurfaced in August has visible cracks and a small pothole forming near the bus stop.",
    observedOn: "2026-09-25",
    submittedOn: "2026-09-25",
    status: "Acknowledged",
    history: [
      { status: "Submitted", date: "2026-09-25", note: "Report received." },
      { status: "Acknowledged", date: "2026-09-27", note: "Added to contractor defect list." },
    ],
  },
  {
    id: "r-1004",
    title: "Same road dug up twice this year",
    category: "Duplicate excavation",
    projectId: "station-road-footpath",
    location: "Station Road, Ward 4",
    description: "This part of Station Road was dug in May for pipes and is now marked for footpath work. Will it be dug again?",
    observedOn: "2026-10-01",
    submittedOn: "2026-10-02",
    status: "Submitted",
    history: [{ status: "Submitted", date: "2026-10-02", note: "Report received." }],
  },
  {
    id: "r-1005",
    title: "Streetlight outage after upgrade",
    category: "Other concern",
    projectId: "market-street-led",
    location: "Market Street, Ward 9",
    description: "Two of the new LED lights near the vegetable market stopped working.",
    observedOn: "2026-09-10",
    submittedOn: "2026-09-10",
    status: "Resolved",
    history: [
      { status: "Submitted", date: "2026-09-10", note: "Report received." },
      { status: "Acknowledged", date: "2026-09-11", note: "Sent to electrical maintenance team." },
      { status: "Action Taken", date: "2026-09-13", note: "Faulty drivers replaced." },
      { status: "Resolved", date: "2026-09-14", note: "Lights confirmed working." },
    ],
  },
  {
    id: "r-1006",
    title: "Drain work past promised date",
    category: "Missed deadline",
    projectId: "lakeview-storm-drain",
    location: "Lakeview Colony, Ward 7",
    description: "Notice board said work would finish in November but less than half is done.",
    observedOn: "2026-10-04",
    submittedOn: "2026-10-04",
    status: "Acknowledged",
    history: [
      { status: "Submitted", date: "2026-10-04", note: "Report received." },
      { status: "Acknowledged", date: "2026-10-05", note: "Revised schedule shared on project page." },
    ],
  },
];

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
