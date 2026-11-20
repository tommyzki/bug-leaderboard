"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { TREND_COLORS } from "@/lib/dashboard-constants";
import type { WeeklyTrendPoint } from "@/types/dashboard";

export function WeeklyTrendChart({ data }: { data: WeeklyTrendPoint[] }) {
  return (
    <Card className="gap-4 p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Tren Task Mingguan</h2>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={28} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "var(--border)" }} cursor={{ fill: "var(--muted)" }} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => (value === "created" ? "Dibuat" : "Selesai")}
            />
            <Bar dataKey="created" name="created" fill={TREND_COLORS.created} radius={[3, 3, 0, 0]} />
            <Bar dataKey="resolved" name="resolved" fill={TREND_COLORS.resolved} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
