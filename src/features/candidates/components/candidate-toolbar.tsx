"use client";

import { ListFilter, Search, X } from "lucide-react";

import type { Stage } from "@/types/candidate";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_FILTERS,
  hasActiveFilters,
  type CandidateFilters,
  type SortKey,
} from "@/features/candidates/lib/filters";
import { STAGE_LIST } from "@/features/candidates/lib/stages";
import { cn } from "@/lib/utils";

interface CandidateToolbarProps {
  filters: CandidateFilters;
  onChange: (filters: CandidateFilters) => void;
  resultCount: number;
  totalCount: number;
  /** Board/list switch, rendered inline so it shares the toolbar row. */
  viewSwitch: React.ReactNode;
}

const RATING_ITEMS = [
  { value: "0", label: "Any rating" },
  { value: "3", label: "3 stars and up" },
  { value: "4", label: "4 stars and up" },
  { value: "5", label: "5 stars only" },
];

const SORT_ITEMS: { value: SortKey; label: string }[] = [
  { value: "recent", label: "Recently updated" },
  { value: "name", label: "Name (A–Z)" },
  { value: "rating", label: "Highest rated" },
];

export function CandidateToolbar({
  filters,
  onChange,
  resultCount,
  totalCount,
  viewSwitch,
}: CandidateToolbarProps) {
  const filtered = hasActiveFilters(filters);

  const toggleStage = (stage: Stage) => {
    const stages = filters.stages.includes(stage)
      ? filters.stages.filter((value) => value !== stage)
      : [...filters.stages, stage];
    onChange({ ...filters, stages });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
            placeholder="Search name, role, tag or location…"
            aria-label="Search candidates"
            className="px-8"
          />
          {filters.query && (
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Clear search"
              className="text-muted-foreground absolute top-1/2 right-1.5 -translate-y-1/2"
              onClick={() => onChange({ ...filters, query: "" })}
            >
              <X />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <ListFilter />
            Stage
            {filters.stages.length > 0 && (
              <Badge variant="secondary" className="ml-0.5">
                {filters.stages.length}
              </Badge>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Filter by stage</DropdownMenuLabel>
            {STAGE_LIST.map((stage) => (
              <DropdownMenuCheckboxItem
                key={stage.value}
                checked={filters.stages.includes(stage.value)}
                onCheckedChange={() => toggleStage(stage.value)}
                closeOnClick={false}
              >
                <span
                  className={cn("size-2 rounded-full", stage.accentClass)}
                  aria-hidden
                />
                {stage.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Select
          items={RATING_ITEMS}
          value={String(filters.minRating)}
          onValueChange={(value) =>
            onChange({ ...filters, minRating: Number(value) })
          }
        >
          <SelectTrigger aria-label="Filter by rating">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RATING_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={SORT_ITEMS}
          value={filters.sort}
          onValueChange={(value) =>
            onChange({ ...filters, sort: value as SortKey })
          }
        >
          <SelectTrigger aria-label="Sort candidates">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {viewSwitch}
      </div>

      {filtered && (
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span>
            Showing {resultCount} of {totalCount} candidates
          </span>
          <Button
            variant="link"
            size="xs"
            className="h-auto p-0"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
