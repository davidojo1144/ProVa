"use client";

import type { Stage } from "@/types/candidate";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STAGE_SELECT_ITEMS } from "@/features/candidates/lib/stages";

/** Single stage picker shared by the candidate form and the detail panel. */
export function StageSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: Stage;
  onChange: (stage: Stage) => void;
  ariaLabel?: string;
}) {
  return (
    <Select
      items={STAGE_SELECT_ITEMS}
      value={value}
      onValueChange={(next) => onChange(next as Stage)}
    >
      <SelectTrigger className="w-full" aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STAGE_SELECT_ITEMS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
