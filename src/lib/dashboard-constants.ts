export const STATUS_META = {
  backlog: { label: "Backlog", color: "#94a3b8" },
  development: { label: "Development", color: "#2563eb" },
  codeReview: { label: "Code Review", color: "#7c3aed" },
  qa: { label: "QA", color: "#0891b2" },
  done: { label: "Done", color: "#059669" },
} as const;

export const SPRINT_OPTIONS = [
  { value: "active", label: "Aktif" },
  { value: "all", label: "Semua Sprint" },
];

export const TYPE_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "story", label: "Story" },
  { value: "task", label: "Task" },
  { value: "bug", label: "Bug" },
  { value: "subtask", label: "Sub-task" },
];

export const PIC_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "pic-a", label: "PIC A" },
  { value: "pic-b", label: "PIC B" },
  { value: "pic-c", label: "PIC C" },
];

export const TREND_COLORS = {
  created: "#2563eb",
  resolved: "#f59e0b",
};

export const BUG_SOURCE_COLORS = ["#2563eb", "#f59e0b", "#7c3aed"];
