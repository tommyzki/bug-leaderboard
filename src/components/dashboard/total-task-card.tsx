import { Card } from "@/components/ui/card";
import type { TotalTaskSummary } from "@/types/dashboard";

export function TotalTaskCard({ data }: { data: TotalTaskSummary }) {
  const stats = [
    { label: "Story", value: data.byType.story },
    { label: "Task", value: data.byType.task },
    { label: "Bug", value: data.byType.bug },
    { label: "Sub-task", value: data.byType.subtask },
  ];

  return (
    <Card className="gap-4 border-0 bg-slate-900 p-5 text-slate-50">
      <div>
        <p className="text-sm font-medium text-slate-300">Total Task</p>
        <p className="mt-1 text-4xl font-bold">{data.total}</p>
        <p className="mt-1 text-xs text-slate-400">Seluruh project · sprint aktif</p>
      </div>

      <div className="grid grid-cols-4 gap-2 border-t border-slate-700/60 pt-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xs text-slate-400">{stat.label}</p>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700/60 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Progres selesai</span>
          <span className="font-medium text-slate-200">{data.progressPercent}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/60">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${data.progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <span className="font-semibold text-red-400">
          {data.failedCount} <span className="font-normal text-slate-400">Failed</span>
        </span>
        <span className="font-semibold text-amber-400">
          {data.reopenCount} <span className="font-normal text-slate-400">Reopen</span>
        </span>
      </div>
    </Card>
  );
}
