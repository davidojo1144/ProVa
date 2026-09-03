import type { Stage } from "@/types/candidate";

import { STAGES } from "@/types/candidate";

interface StageMeta {
  value: Stage;
  label: string;
  /** Short description shown on empty columns. */
  hint: string;
  /** Tailwind classes for the stage badge/accent. */
  badgeClass: string;
  accentClass: string;
}

export const STAGE_META: Record<Stage, StageMeta> = {
  applied: {
    value: "applied",
    label: "Applied",
    hint: "New applications land here",
    badgeClass:
      "bg-slate-500/10 text-slate-700 dark:text-slate-300 ring-slate-500/20",
    accentClass: "bg-slate-400",
  },
  interview: {
    value: "interview",
    label: "Interview",
    hint: "Screening and interviews",
    badgeClass:
      "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-blue-500/20",
    accentClass: "bg-blue-500",
  },
  test: {
    value: "test",
    label: "Test",
    hint: "Take-home or technical assessment",
    badgeClass:
      "bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/20",
    accentClass: "bg-violet-500",
  },
  offer: {
    value: "offer",
    label: "Offer",
    hint: "Offer extended",
    badgeClass:
      "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/20",
    accentClass: "bg-amber-500",
  },
  accepted: {
    value: "accepted",
    label: "Accepted",
    hint: "Signed and hired",
    badgeClass:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20",
    accentClass: "bg-emerald-500",
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    hint: "Not moving forward",
    badgeClass:
      "bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-rose-500/20",
    accentClass: "bg-rose-500",
  },
};

export const STAGE_LIST = STAGES.map((stage) => STAGE_META[stage]);

/** Stages that represent an open, in-flight candidate. */
export const ACTIVE_STAGES: Stage[] = ["applied", "interview", "test", "offer"];

export function isActiveStage(stage: Stage) {
  return ACTIVE_STAGES.includes(stage);
}
