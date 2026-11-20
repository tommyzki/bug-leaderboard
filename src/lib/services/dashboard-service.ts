import {
  buildOverview,
  getBurndown,
  PROJECTS,
} from "@/lib/mock/dashboard-mock-data";
import type { BurndownData, DashboardFilters, DashboardOverview, ProjectMeta } from "@/types/dashboard";

// ---------------------------------------------------------------------------
// Dashboard data-fetching service.
//
// The backend team is building the real Jira-backed API in parallel. Every
// exported function here already has the final async signature the UI will
// call forever — only the body changes once an endpoint is live.
//
// To cut over a function: delete its mock branch, uncomment the `fetch`
// branch below it, and point `API_BASE_URL` at the real host. Nothing in
// src/components needs to change.
// ---------------------------------------------------------------------------

const USE_MOCK_DATA = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const MOCK_LATENCY_MS = 350;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProjects(): Promise<ProjectMeta[]> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_LATENCY_MS);
    return PROJECTS;
  }

  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchDashboardOverview(filters: DashboardFilters): Promise<DashboardOverview> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_LATENCY_MS);
    // NOTE: sprint/type/pic filters are accepted and typed here so the UI is
    // already wired end-to-end, but the mock only varies by project for now.
    // The real endpoint should apply all four filters server-side.
    return buildOverview(filters.projectId);
  }

  const params = new URLSearchParams({
    project: filters.projectId,
    sprint: filters.sprint,
    type: filters.type,
    pic: filters.pic,
  });
  const res = await fetch(`${API_BASE_URL}/dashboard/overview?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch dashboard overview");
  return res.json();
}

export async function fetchBurndown(projectId: string): Promise<BurndownData> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_LATENCY_MS);
    return getBurndown(projectId);
  }

  const res = await fetch(`${API_BASE_URL}/dashboard/burndown?project=${encodeURIComponent(projectId)}`);
  if (!res.ok) throw new Error("Failed to fetch burndown chart");
  return res.json();
}
