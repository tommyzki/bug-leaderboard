import type {
  BugSourceBreakdown,
  BurndownData,
  BurndownPoint,
  DashboardOverview,
  LeaderboardEntry,
  ProjectMeta,
  ProjectTaskRow,
  StatusTaskBreakdown,
  TaskTypeBreakdown,
  WeeklyTrendPoint,
} from "@/types/dashboard";
import { statusTotal } from "@/types/dashboard";

// ---------------------------------------------------------------------------
// Mock dataset for the Dashboard Monitoring MVP.
//
// Project names are intentionally genericized (Project A/B/C/D) since this
// repo only hosts the frontend MVP — real client/project names live in the
// backend the other team owns. Numbers below are cross-checked so every
// card's totals reconcile with each other, mirroring the shape the real
// Jira-backed API is expected to return.
// ---------------------------------------------------------------------------

export const PROJECTS: ProjectMeta[] = [
  { id: "project-a", name: "Project A", shortCode: "PA" },
  { id: "project-b", name: "Project B", shortCode: "PB" },
  { id: "project-c", name: "Project C", shortCode: "PC" },
  { id: "project-d", name: "Project D", shortCode: "PD" },
];

const STATUS_BY_PROJECT: Record<string, StatusTaskBreakdown> = {
  "project-a": {
    backlog: { todo: 22, dropHold: 1, reopen: 3 },
    development: { inProgress: 6 },
    codeReview: { readyToReview: 2, inProgress: 1, done: 3 },
    qa: { ready: 3, inProgress: 3, pass: 7, failed: 4 },
    done: { done: 30 },
  },
  "project-b": {
    backlog: { todo: 18, dropHold: 2, reopen: 1 },
    development: { inProgress: 5 },
    codeReview: { readyToReview: 2, inProgress: 1, done: 2 },
    qa: { ready: 3, inProgress: 2, pass: 6, failed: 2 },
    done: { done: 24 },
  },
  "project-c": {
    backlog: { todo: 14, dropHold: 1, reopen: 1 },
    development: { inProgress: 4 },
    codeReview: { readyToReview: 2, inProgress: 1, done: 2 },
    qa: { ready: 3, inProgress: 2, pass: 4, failed: 2 },
    done: { done: 20 },
  },
  "project-d": {
    backlog: { todo: 10, dropHold: 1, reopen: 1 },
    development: { inProgress: 3 },
    codeReview: { readyToReview: 1, inProgress: 1, done: 2 },
    qa: { ready: 2, inProgress: 1, pass: 4, failed: 1 },
    done: { done: 22 },
  },
};

const TYPE_BY_PROJECT: Record<string, TaskTypeBreakdown> = {
  "project-a": { story: 29, task: 23, bug: 26, subtask: 7 },
  "project-b": { story: 24, task: 19, bug: 19, subtask: 6 },
  "project-c": { story: 20, task: 16, bug: 15, subtask: 5 },
  "project-d": { story: 19, task: 16, bug: 10, subtask: 4 },
};

const LEADERBOARD_BASE: Omit<LeaderboardEntry, "rank">[] = [
  { projectId: "project-a", projectName: "Project A", shortCode: "PA", bugCount: 26, activeCount: 17, resolvedCount: 9, failedReopenCount: 5 },
  { projectId: "project-b", projectName: "Project B", shortCode: "PB", bugCount: 19, activeCount: 12, resolvedCount: 7, failedReopenCount: 3 },
  { projectId: "project-c", projectName: "Project C", shortCode: "PC", bugCount: 15, activeCount: 9, resolvedCount: 6, failedReopenCount: 2 },
  { projectId: "project-d", projectName: "Project D", shortCode: "PD", bugCount: 10, activeCount: 5, resolvedCount: 5, failedReopenCount: 1 },
];

export const LEADERBOARD: LeaderboardEntry[] = LEADERBOARD_BASE
  .sort((a, b) => b.bugCount - a.bugCount)
  .map((entry, index) => ({ ...entry, rank: index + 1 }));

const WEEKLY_TREND: WeeklyTrendPoint[] = [
  { week: "W40", created: 18, resolved: 12 },
  { week: "W41", created: 24, resolved: 20 },
  { week: "W42", created: 21, resolved: 17 },
  { week: "W43", created: 29, resolved: 15 },
  { week: "W44", created: 16, resolved: 23 },
  { week: "W45", created: 22, resolved: 19 },
  { week: "W46", created: 13, resolved: 21 },
  { week: "W47", created: 26, resolved: 20 },
];

const BUG_SOURCES: BugSourceBreakdown[] = [
  { label: "Total Bug Test Case", count: 38, percent: 54 },
  { label: "Total Bug Exploratory", count: 20, percent: 29 },
  { label: "Total Bug Explore AC", count: 12, percent: 17 },
];

const SPRINT_DATES = [
  "2026-11-09",
  "2026-11-10",
  "2026-11-11",
  "2026-11-12",
  "2026-11-13",
  "2026-11-14",
  "2026-11-15",
  "2026-11-16",
  "2026-11-17",
  "2026-11-18",
  "2026-11-19",
  "2026-11-20",
];

const NON_WORKING_DAYS = ["2026-11-14", "2026-11-15"];
const TODAY = "2026-11-18";

function buildBurndownPoints(totalStoryPoint: number, remaining: (number | null)[]): BurndownPoint[] {
  const steps = SPRINT_DATES.length - 1;
  return SPRINT_DATES.map((date, index) => ({
    date,
    guideline: Math.round((totalStoryPoint * (steps - index) / steps) * 10) / 10,
    remaining: remaining[index] ?? null,
  }));
}

const BURNDOWN_BY_PROJECT: Record<string, BurndownData> = {
  "project-a": {
    projectId: "project-a",
    sprintKey: "PROJECT_A_MOBILE",
    sprintRangeLabel: "9–20 Nov 2026",
    totalStoryPoint: 196,
    completedStoryPoint: 158,
    remainingStoryPoint: 38,
    idealRemaining: 49,
    comparisonLabel: "Lebih cepat 11 SP",
    todayDate: TODAY,
    nonWorkingDays: NON_WORKING_DAYS,
    points: buildBurndownPoints(196, [196, 196, 150, 127, 100, 100, 100, 75, 75, 38, null, null]),
  },
  "project-b": {
    projectId: "project-b",
    sprintKey: "PROJECT_B_CMS",
    sprintRangeLabel: "9–20 Nov 2026",
    totalStoryPoint: 150,
    completedStoryPoint: 109,
    remainingStoryPoint: 41,
    idealRemaining: 41,
    comparisonLabel: "Sesuai target",
    todayDate: TODAY,
    nonWorkingDays: NON_WORKING_DAYS,
    points: buildBurndownPoints(150, [150, 150, 130, 118, 95, 95, 95, 70, 60, 41, null, null]),
  },
  "project-c": {
    projectId: "project-c",
    sprintKey: "PROJECT_C_WEB",
    sprintRangeLabel: "9–20 Nov 2026",
    totalStoryPoint: 120,
    completedStoryPoint: 95,
    remainingStoryPoint: 25,
    idealRemaining: 33,
    comparisonLabel: "Lebih cepat 8 SP",
    todayDate: TODAY,
    nonWorkingDays: NON_WORKING_DAYS,
    points: buildBurndownPoints(120, [120, 118, 100, 88, 70, 70, 70, 50, 40, 25, null, null]),
  },
  "project-d": {
    projectId: "project-d",
    sprintKey: "PROJECT_D_PHASE4",
    sprintRangeLabel: "9–20 Nov 2026",
    totalStoryPoint: 90,
    completedStoryPoint: 62,
    remainingStoryPoint: 28,
    idealRemaining: 25,
    comparisonLabel: "Lebih lambat 3 SP",
    todayDate: TODAY,
    nonWorkingDays: NON_WORKING_DAYS,
    points: buildBurndownPoints(90, [90, 88, 80, 75, 65, 65, 65, 50, 40, 28, null, null]),
  },
};

function sumStatus(a: StatusTaskBreakdown, b: StatusTaskBreakdown): StatusTaskBreakdown {
  return {
    backlog: {
      todo: a.backlog.todo + b.backlog.todo,
      dropHold: a.backlog.dropHold + b.backlog.dropHold,
      reopen: a.backlog.reopen + b.backlog.reopen,
    },
    development: { inProgress: a.development.inProgress + b.development.inProgress },
    codeReview: {
      readyToReview: a.codeReview.readyToReview + b.codeReview.readyToReview,
      inProgress: a.codeReview.inProgress + b.codeReview.inProgress,
      done: a.codeReview.done + b.codeReview.done,
    },
    qa: {
      ready: a.qa.ready + b.qa.ready,
      inProgress: a.qa.inProgress + b.qa.inProgress,
      pass: a.qa.pass + b.qa.pass,
      failed: a.qa.failed + b.qa.failed,
    },
    done: { done: a.done.done + b.done.done },
  };
}

const EMPTY_STATUS: StatusTaskBreakdown = {
  backlog: { todo: 0, dropHold: 0, reopen: 0 },
  development: { inProgress: 0 },
  codeReview: { readyToReview: 0, inProgress: 0, done: 0 },
  qa: { ready: 0, inProgress: 0, pass: 0, failed: 0 },
  done: { done: 0 },
};

export function getProjectIds(projectFilter: string): string[] {
  return projectFilter === "all" ? PROJECTS.map((p) => p.id) : [projectFilter];
}

export function buildOverview(projectFilter: string): DashboardOverview {
  const ids = getProjectIds(projectFilter);

  const taskPerProject: ProjectTaskRow[] = PROJECTS.filter((p) => ids.includes(p.id)).map((p) => {
    const status = STATUS_BY_PROJECT[p.id];
    const totals = statusTotal(status);
    return {
      projectId: p.id,
      projectName: p.name,
      status,
      total: totals.backlog + totals.development + totals.codeReview + totals.qa + totals.done,
    };
  });

  const combinedStatus = ids.reduce((acc, id) => sumStatus(acc, STATUS_BY_PROJECT[id]), EMPTY_STATUS);

  const byType = ids.reduce(
    (acc, id) => ({
      story: acc.story + TYPE_BY_PROJECT[id].story,
      task: acc.task + TYPE_BY_PROJECT[id].task,
      bug: acc.bug + TYPE_BY_PROJECT[id].bug,
      subtask: acc.subtask + TYPE_BY_PROJECT[id].subtask,
    }),
    { story: 0, task: 0, bug: 0, subtask: 0 },
  );

  const total = taskPerProject.reduce((sum, row) => sum + row.total, 0);
  const doneTotal = taskPerProject.reduce((sum, row) => sum + row.status.done.done, 0);
  const failedTotal = taskPerProject.reduce((sum, row) => sum + row.status.qa.failed, 0);
  const reopenTotal = taskPerProject.reduce((sum, row) => sum + row.status.backlog.reopen, 0);

  const leaderboard = LEADERBOARD.filter((entry) => ids.includes(entry.projectId));
  const bugTotal = leaderboard.reduce((sum, entry) => sum + entry.bugCount, 0);

  return {
    asOfLabel: "data contoh per 18 Nov 2026, 00.00 WIB",
    totalTaskSummary: {
      total,
      byType,
      progressPercent: total === 0 ? 0 : Math.round((doneTotal / total) * 100),
      failedCount: failedTotal,
      reopenCount: reopenTotal,
    },
    statusTask: combinedStatus,
    taskPerProject,
    leaderboard,
    weeklyTrend: WEEKLY_TREND,
    bugSources: BUG_SOURCES.map((source) => ({
      ...source,
      count: projectFilter === "all" ? source.count : Math.round((source.count * bugTotal) / 70),
    })),
  };
}

export function getBurndown(projectId: string): BurndownData {
  return BURNDOWN_BY_PROJECT[projectId] ?? BURNDOWN_BY_PROJECT["project-a"];
}
