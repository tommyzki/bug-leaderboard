import { Card } from "@/components/ui/card";
import type { LeaderboardEntry } from "@/types/dashboard";

export function LeaderboardBugCard({ entries }: { entries: LeaderboardEntry[] }) {
  const totalBugs = entries.reduce((sum, e) => sum + e.bugCount, 0);
  const maxBugs = Math.max(...entries.map((e) => e.bugCount), 1);

  return (
    <Card className="gap-4 p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Leaderboard Bug</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Seluruh project · sprint aktif · {totalBugs} bug</p>
        <p className="mt-2 text-xs text-muted-foreground">Peringkat project berdasarkan jumlah bug</p>
      </div>

      <ul className="space-y-3">
        {entries.map((entry) => (
          <li key={entry.projectId} className="flex items-start gap-3">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                entry.rank === 1 ? "bg-amber-400 text-amber-950" : "bg-muted text-muted-foreground"
              }`}
            >
              {entry.rank}
            </span>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-[11px] font-semibold text-secondary-foreground">
              {entry.shortCode}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">{entry.projectName}</p>
                <p className="text-sm font-semibold text-foreground">{entry.bugCount}</p>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-red-600" style={{ width: `${(entry.bugCount / maxBugs) * 100}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {entry.activeCount} aktif · {entry.resolvedCount} selesai ·{" "}
                <span className="text-red-600">{entry.failedReopenCount} Failed/Reopen</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
