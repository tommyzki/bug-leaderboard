"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PIC_OPTIONS, SPRINT_OPTIONS, TYPE_OPTIONS } from "@/lib/dashboard-constants";
import type { DashboardFilters, ProjectMeta } from "@/types/dashboard";

interface DashboardHeaderProps {
  projects: ProjectMeta[];
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  asOfLabel?: string;
}

export function DashboardHeader({ projects, filters, onFiltersChange, asOfLabel }: DashboardHeaderProps) {
  function update<K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Monitoring</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan seluruh task project dari Jira{asOfLabel ? ` · ${asOfLabel}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Project"
          value={filters.projectId}
          onChange={(v) => update("projectId", v)}
          options={[{ value: "all", label: "Semua" }, ...projects.map((p) => ({ value: p.id, label: p.name }))]}
        />
        <FilterSelect label="Sprint" value={filters.sprint} onChange={(v) => update("sprint", v)} options={SPRINT_OPTIONS} />
        <FilterSelect label="Tipe" value={filters.type} onChange={(v) => update("type", v)} options={TYPE_OPTIONS} />
        <FilterSelect label="PIC" value={filters.pic} onChange={(v) => update("pic", v)} options={PIC_OPTIONS} />
        <Button variant="outline" size="sm" className="h-8 gap-1.5" title="Export — segera hadir">
          <Download className="size-3.5" />
          Export
        </Button>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger size="sm" className="h-8 bg-card text-sm">
        <span className="text-muted-foreground">{label}</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
