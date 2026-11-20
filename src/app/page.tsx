"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TotalTaskCard } from "@/components/dashboard/total-task-card";
import { StatusTaskCard } from "@/components/dashboard/status-task-card";
import { BurndownChartCard } from "@/components/dashboard/burndown-chart-card";
import { LeaderboardBugCard } from "@/components/dashboard/leaderboard-bug-card";
import { TaskPerProjectTable } from "@/components/dashboard/task-per-project-table";
import { WeeklyTrendChart } from "@/components/dashboard/weekly-trend-chart";
import { BugSourceCard } from "@/components/dashboard/bug-source-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBurndown, fetchDashboardOverview, fetchProjects } from "@/lib/services/dashboard-service";
import type { BurndownData, DashboardFilters, DashboardOverview, ProjectMeta } from "@/types/dashboard";

const DEFAULT_FILTERS: DashboardFilters = {
  projectId: "all",
  sprint: "active",
  type: "all",
  pic: "all",
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_FILTERS);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loadedFiltersKey, setLoadedFiltersKey] = useState<string | null>(null);

  const [burndownProjectId, setBurndownProjectId] = useState("project-a");
  const [burndown, setBurndown] = useState<BurndownData | null>(null);
  const [loadedBurndownId, setLoadedBurndownId] = useState<string | null>(null);

  const filtersKey = JSON.stringify(filters);
  const overviewLoading = loadedFiltersKey !== filtersKey;
  const burndownLoading = loadedBurndownId !== burndownProjectId;

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  useEffect(() => {
    let active = true;
    fetchDashboardOverview(filters).then((data) => {
      if (active) {
        setOverview(data);
        setLoadedFiltersKey(filtersKey);
      }
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  useEffect(() => {
    let active = true;
    fetchBurndown(burndownProjectId).then((data) => {
      if (active) {
        setBurndown(data);
        setLoadedBurndownId(burndownProjectId);
      }
    });
    return () => {
      active = false;
    };
  }, [burndownProjectId]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <DashboardHeader
          projects={projects}
          filters={filters}
          onFiltersChange={setFilters}
          asOfLabel={overview?.asOfLabel}
        />

        {overviewLoading || !overview ? (
          <DashboardSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <TotalTaskCard data={overview.totalTaskSummary} />
              </div>
              <div className="lg:col-span-3">
                <StatusTaskCard data={overview.statusTask} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <BurndownChartCard
                  projects={projects}
                  selectedProjectId={burndownProjectId}
                  onProjectChange={setBurndownProjectId}
                  data={burndown}
                  loading={burndownLoading}
                />
              </div>
              <div className="lg:col-span-1">
                <LeaderboardBugCard entries={overview.leaderboard} />
              </div>
            </div>

            <TaskPerProjectTable rows={overview.taskPerProject} />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <WeeklyTrendChart data={overview.weeklyTrend} />
              </div>
              <div className="lg:col-span-1">
                <BugSourceCard data={overview.bugSources} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <Skeleton className="h-64 rounded-xl lg:col-span-1" />
        <Skeleton className="h-64 rounded-xl lg:col-span-3" />
      </div>
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );
}
