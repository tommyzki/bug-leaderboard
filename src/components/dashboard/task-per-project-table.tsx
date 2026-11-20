import { Card } from "@/components/ui/card";
import { STATUS_META } from "@/lib/dashboard-constants";
import { statusTotal } from "@/types/dashboard";
import type { ProjectTaskRow } from "@/types/dashboard";

export function TaskPerProjectTable({ rows }: { rows: ProjectTaskRow[] }) {
  const totals = rows.reduce(
    (acc, row) => ({
      todo: acc.todo + row.status.backlog.todo,
      dropHold: acc.dropHold + row.status.backlog.dropHold,
      reopen: acc.reopen + row.status.backlog.reopen,
      dev: acc.dev + row.status.development.inProgress,
      crReady: acc.crReady + row.status.codeReview.readyToReview,
      crInProgress: acc.crInProgress + row.status.codeReview.inProgress,
      crDone: acc.crDone + row.status.codeReview.done,
      qaReady: acc.qaReady + row.status.qa.ready,
      qaInProgress: acc.qaInProgress + row.status.qa.inProgress,
      qaPass: acc.qaPass + row.status.qa.pass,
      qaFailed: acc.qaFailed + row.status.qa.failed,
      done: acc.done + row.status.done.done,
      total: acc.total + row.total,
    }),
    {
      todo: 0, dropHold: 0, reopen: 0, dev: 0, crReady: 0, crInProgress: 0, crDone: 0,
      qaReady: 0, qaInProgress: 0, qaPass: 0, qaFailed: 0, done: 0, total: 0,
    },
  );

  const th = "px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap";
  const td = "px-3 py-2.5 text-sm text-foreground whitespace-nowrap";

  return (
    <Card className="gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Task per Project &amp; Status</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Rincian jumlah task (Story, Task, Bug, Sub-task) tiap project berdasarkan status board
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {Object.entries(STATUS_META).map(([key, meta]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: meta.color }} />
              {meta.label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th rowSpan={2} className={`${th} sticky left-0 bg-muted/40 text-left`}>Project</th>
              <GroupHeader colSpan={3} color={STATUS_META.backlog.color} label="Backlog" />
              <GroupHeader colSpan={1} color={STATUS_META.development.color} label="Development" />
              <GroupHeader colSpan={3} color={STATUS_META.codeReview.color} label="Code Review" />
              <GroupHeader colSpan={4} color={STATUS_META.qa.color} label="QA" />
              <GroupHeader colSpan={1} color={STATUS_META.done.color} label="Done" />
              <th rowSpan={2} className={`${th} text-right`}>Total</th>
            </tr>
            <tr className="border-b border-border">
              <th className={th}>To Do</th>
              <th className={th}>Drop/Hold</th>
              <th className={th}>Reopen</th>
              <th className={th}>In Progress</th>
              <th className={th}>Ready</th>
              <th className={th}>In Progress</th>
              <th className={th}>Done</th>
              <th className={th}>Ready</th>
              <th className={th}>In Progress</th>
              <th className={th}>Pass</th>
              <th className={th}>Failed</th>
              <th className={th}>Done</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const t = statusTotal(row.status);
              const segments = [
                { key: "backlog", value: t.backlog },
                { key: "development", value: t.development },
                { key: "codeReview", value: t.codeReview },
                { key: "qa", value: t.qa },
                { key: "done", value: t.done },
              ] as const;
              return (
                <tr key={row.projectId} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                  <td className={`${td} sticky left-0 bg-card`}>
                    <p className="font-medium">{row.projectName}</p>
                    <div className="mt-1 flex h-1 w-28 overflow-hidden rounded-full bg-muted">
                      {segments.map((seg) => (
                        <div
                          key={seg.key}
                          style={{ width: `${(seg.value / row.total) * 100}%`, backgroundColor: STATUS_META[seg.key].color }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className={td}>{row.status.backlog.todo}</td>
                  <td className={td}>{row.status.backlog.dropHold}</td>
                  <td className={`${td} ${row.status.backlog.reopen > 0 ? "bg-amber-50 font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : ""}`}>
                    {row.status.backlog.reopen}
                  </td>
                  <td className={td}>{row.status.development.inProgress}</td>
                  <td className={td}>{row.status.codeReview.readyToReview}</td>
                  <td className={td}>{row.status.codeReview.inProgress}</td>
                  <td className={td}>{row.status.codeReview.done}</td>
                  <td className={td}>{row.status.qa.ready}</td>
                  <td className={td}>{row.status.qa.inProgress}</td>
                  <td className={td}>{row.status.qa.pass}</td>
                  <td className={`${td} ${row.status.qa.failed > 0 ? "bg-red-50 font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400" : ""}`}>
                    {row.status.qa.failed}
                  </td>
                  <td className={td}>{row.status.done.done}</td>
                  <td className={`${td} text-right font-semibold`}>{row.total}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-muted/40 font-semibold">
              <td className={`${td} sticky left-0 bg-muted/40`}>Total</td>
              <td className={td}>{totals.todo}</td>
              <td className={td}>{totals.dropHold}</td>
              <td className={`${td} text-red-700 dark:text-red-400`}>{totals.reopen}</td>
              <td className={td}>{totals.dev}</td>
              <td className={td}>{totals.crReady}</td>
              <td className={td}>{totals.crInProgress}</td>
              <td className={td}>{totals.crDone}</td>
              <td className={td}>{totals.qaReady}</td>
              <td className={td}>{totals.qaInProgress}</td>
              <td className={td}>{totals.qaPass}</td>
              <td className={`${td} text-red-700 dark:text-red-400`}>{totals.qaFailed}</td>
              <td className={td}>{totals.done}</td>
              <td className={`${td} text-right`}>{totals.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}

function GroupHeader({ colSpan, color, label }: { colSpan: number; color: string; label: string }) {
  return (
    <th colSpan={colSpan} className="border-b border-border px-3 py-1.5 text-left text-xs font-semibold text-foreground">
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </span>
    </th>
  );
}
