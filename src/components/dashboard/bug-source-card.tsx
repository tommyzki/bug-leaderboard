import { Card } from "@/components/ui/card";
import { BUG_SOURCE_COLORS } from "@/lib/dashboard-constants";
import type { BugSourceBreakdown } from "@/types/dashboard";

export function BugSourceCard({ data }: { data: BugSourceBreakdown[] }) {
  return (
    <Card className="gap-4 p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Sumber Bug</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Metode pengujian yang menemukan bug</p>
      </div>

      <ul className="space-y-4">
        {data.map((source, i) => (
          <li key={source.label}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium text-foreground">{source.label}</span>
              <span className="text-muted-foreground">
                {source.count} · {source.percent}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${source.percent}%`, backgroundColor: BUG_SOURCE_COLORS[i % BUG_SOURCE_COLORS.length] }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
