"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";

import { ChevronDown, Grid, List, MapPin } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Status = "all" | "active" | "off-market" | "draft";
type View = "grid" | "list" | "map";
type SortOption = "newest" | "oldest";

interface FilterBarProps {
  status: Status;
  view: View;
  sort: SortOption;
  onStatusChange: (status: Status) => void;
  onViewChange: (view: View) => void;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterBar({
  status,
  view,
  sort,
  onStatusChange,
  onViewChange,
  onSortChange,
}: FilterBarProps) {
  const statusOptions = [
    { value: "all", label: "All", count: 8 },
    { value: "active", label: "Active", count: 5 },
    { value: "off-market", label: "Off Market", count: 2 },
    { value: "draft", label: "Draft", count: 1 },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest to Oldest" },
    { value: "oldest", label: "Oldest to Newest" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-2 border-gray-200",
                status === option.value && "bg-primary text-primary-foreground"
              )}
              onClick={() => onStatusChange(option.value as Status)}
            >
              {option.label}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-100 px-1 text-xs",
                  status === option.value
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-gray-600"
                )}
              >
                {option.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show as</span>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value: any) => value && onViewChange(value as View)}
          >
            <ToggleGroupItem
              value="grid"
              aria-label="Grid view"
              className={view === "grid" ? "!bg-gray-300" : ""}
            >
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="list"
              aria-label="List view"
              className={view === "list" ? "!bg-gray-300" : ""}
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="map"
              aria-label="Map view"
              className={view === "map" ? "!bg-gray-300" : ""}
            >
              <MapPin className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-2">
              Sort by
              <span className="font-medium">
                {sortOptions.find((opt) => opt.value === sort)?.label}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value as SortOption)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
