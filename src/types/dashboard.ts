// Shared types for the Dashboard Monitoring MVP.
// These shapes are the contract the backend team should mirror when the real API lands —
// swapping the mock service for real `fetch` calls should not require changing consumers.

export interface ProjectMeta {
  id: string;
  name: string;
  shortCode: string;
}

export interface DashboardFilters {
  projectId: string; // "all" | ProjectMeta["id"]
  sprint: string; // "active" | sprint id
  type: string; // "all" | "story" | "task" | "bug" | "subtask"
  pic: string; // "all" | pic id
}

export interface TaskTypeBreakdown {
  story: number;
  task: number;
  bug: number;
  subtask: number;
}

export interface TotalTaskSummary {
  total: number;
  byType: TaskTypeBreakdown;
  progressPercent: number;
  failedCount: number;
  reopenCount: number;
}

export interface BacklogCounts {
  todo: number;
  dropHold: number;
  reopen: number;
}

export interface DevelopmentCounts {
  inProgress: number;
}

export interface CodeReviewCounts {
  readyToReview: number;
  inProgress: number;
  done: number;
}

export interface QaCounts {
  ready: number;
  inProgress: number;
  pass: number;
  failed: number;
}

export interface DoneCounts {
  done: number;
}

export interface StatusTaskBreakdown {
  backlog: BacklogCounts;
  development: DevelopmentCounts;
  codeReview: CodeReviewCounts;
  qa: QaCounts;
  done: DoneCounts;
}

export function statusTotal(status: StatusTaskBreakdown) {
  return {
    backlog: status.backlog.todo + status.backlog.dropHold + status.backlog.reopen,
    development: status.development.inProgress,
    codeReview: status.codeReview.readyToReview + status.codeReview.inProgress + status.codeReview.done,
    qa: status.qa.ready + status.qa.inProgress + status.qa.pass + status.qa.failed,
    done: status.done.done,
  };
}

export interface ProjectTaskRow {
  projectId: string;
  projectName: string;
  status: StatusTaskBreakdown;
  total: number;
}

export interface BurndownPoint {
  date: string; // ISO date
  guideline: number;
  remaining: number | null; // null once we run out of actuals
}

export interface BurndownData {
  projectId: string;
  sprintKey: string;
  sprintRangeLabel: string;
  totalStoryPoint: number;
  completedStoryPoint: number;
  remainingStoryPoint: number;
  idealRemaining: number;
  comparisonLabel: string;
  todayDate: string;
  nonWorkingDays: string[];
  points: BurndownPoint[];
}

export interface LeaderboardEntry {
  rank: number;
  projectId: string;
  projectName: string;
  shortCode: string;
  bugCount: number;
  activeCount: number;
  resolvedCount: number;
  failedReopenCount: number;
}

export interface WeeklyTrendPoint {
  week: string;
  created: number;
  resolved: number;
}

export interface BugSourceBreakdown {
  label: string;
  count: number;
  percent: number;
}

export interface DashboardOverview {
  asOfLabel: string;
  totalTaskSummary: TotalTaskSummary;
  statusTask: StatusTaskBreakdown;
  taskPerProject: ProjectTaskRow[];
  leaderboard: LeaderboardEntry[];
  weeklyTrend: WeeklyTrendPoint[];
  bugSources: BugSourceBreakdown[];
}
