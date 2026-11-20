"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BurndownData, ProjectMeta } from "@/types/dashboard";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
}

export function BurndownChartCard({
  projects,
  selectedProjectId,
  onProjectChange,
  data,
  loading,
}: {
  projects: ProjectMeta[];
  selectedProjectId: string;
  onProjectChange: (id: string) => void;
  data: BurndownData | null;
  loading: boolean;
}) {
  const chartData = data?.points.map((p) => ({ ...p, dateLabel: formatDate(p.date) })) ?? [];
  const weekendStart = data?.nonWorkingDays[0];
  const weekendEnd = data?.nonWorkingDays[data.nonWorkingDays.length - 1];

  return (
    <Card className="gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Burndown Chart</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {data ? `${data.sprintKey} · Sprint aktif ${data.sprintRangeLabel} · Story Point` : "Memuat..."}
          </p>
        </div>
        <Select value={selectedProjectId} onValueChange={onProjectChange}>
          <SelectTrigger size="sm" className="h-8 bg-card text-sm">
            <span className="text-muted-foreground">Project</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading || !data ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Total Story Point" value={data.totalStoryPoint} />
            <StatTile label="Selesai" value={`${data.completedStoryPoint} (${Math.round((data.completedStoryPoint / data.totalStoryPoint) * 100)}%)`} />
            <StatTile label="Sisa" value={data.remainingStoryPoint} />
            <StatTile label={`Dibanding ideal (${data.idealRemaining})`} value={data.comparisonLabel} valueClassName="text-emerald-600" />
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="dateLabel" tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={32} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "var(--border)" }}
                  labelFormatter={(label) => label}
                />
                {weekendStart && weekendEnd && (
                  <ReferenceArea x1={formatDate(weekendStart)} x2={formatDate(weekendEnd)} fill="var(--muted-foreground)" fillOpacity={0.12} />
                )}
                <ReferenceLine
                  x={formatDate(data.todayDate)}
                  stroke="#2563eb"
                  strokeDasharray="4 4"
                  label={{ value: "Hari ini", position: "top", fontSize: 11, fill: "#2563eb" }}
                />
                <Line type="monotone" dataKey="guideline" stroke="#94a3b8" strokeWidth={2} dot={false} name="Guideline" />
                <Line type="stepAfter" dataKey="remaining" stroke="#dc2626" strokeWidth={2} dot={false} name="Remaining Values" connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <LegendDot color="#94a3b8" label="Guideline" />
            <LegendDot color="#dc2626" label="Remaining Values" />
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-muted-foreground/30" /> Non-Working Days
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-0.5 bg-blue-600" /> Hari ini
            </span>
          </div>
        </>
      )}
    </Card>
  );
}

function StatTile({ label, value, valueClassName }: { label: string; value: string | number; valueClassName?: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-lg font-semibold text-foreground ${valueClassName ?? ""}`}>{value}</p>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-0.5 w-3 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
