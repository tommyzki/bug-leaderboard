import { Card } from "@/components/ui/card";
import { STATUS_META } from "@/lib/dashboard-constants";
import { statusTotal } from "@/types/dashboard";
import type { StatusTaskBreakdown } from "@/types/dashboard";

export function StatusTaskCard({ data }: { data: StatusTaskBreakdown }) {
  const totals = statusTotal(data);
  const grandTotal = totals.backlog + totals.development + totals.codeReview + totals.qa + totals.done || 1;

  const columns: {
    key: keyof typeof STATUS_META;
    total: number;
    rows: { label: string; value: number; highlight?: boolean }[];
  }[] = [
    {
      key: "backlog",
      total: totals.backlog,
      rows: [
        { label: "To Do", value: data.backlog.todo },
        { label: "Drop/Hold", value: data.backlog.dropHold },
        { label: "Reopen", value: data.backlog.reopen, highlight: true },
      ],
    },
    {
      key: "development",
      total: totals.development,
      rows: [{ label: "Dev In Progress", value: data.development.inProgress }],
    },
    {
      key: "codeReview",
      total: totals.codeReview,
      rows: [
        { label: "Ready to Code Review", value: data.codeReview.readyToReview },
        { label: "Code Review In Progress", value: data.codeReview.inProgress },
        { label: "Code Review Done", value: data.codeReview.done },
      ],
    },
    {
      key: "qa",
      total: totals.qa,
      rows: [
        { label: "Ready to QA", value: data.qa.ready },
        { label: "QA In Progress", value: data.qa.inProgress },
        { label: "QA Pass", value: data.qa.pass },
        { label: "Failed", value: data.qa.failed, highlight: true },
      ],
    },
    {
      key: "done",
      total: totals.done,
      rows: [{ label: "Done", value: data.done.done }],
    },
  ];

  return (
    <Card className="gap-4 p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Status Task</h2>
      </div>

      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {columns.map((col) => (
          <div
            key={col.key}
            style={{
              width: `${(col.total / grandTotal) * 100}%`,
              backgroundColor: STATUS_META[col.key].color,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-5">
        {columns.map((col) => (
          <div key={col.key}>
            <div className="flex items-center gap-1.5">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: STATUS_META[col.key].color }}
              />
              <span className="text-xs font-medium text-muted-foreground">{STATUS_META[col.key].label}</span>
            </div>
            <p className="mt-0.5 text-xl font-bold text-foreground">{col.total}</p>
            <ul className="mt-2 space-y-1">
              {col.rows.map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-2 text-xs">
                  <span className={row.highlight ? "text-red-600" : "text-muted-foreground"}>{row.label}</span>
                  <span className={row.highlight ? "font-medium text-red-600" : "text-foreground"}>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
