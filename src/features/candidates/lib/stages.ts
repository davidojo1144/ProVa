import type { Stage } from "@/types/candidate";

import { STAGES } from "@/types/candidate";

interface StageMeta {
  value: Stage;
  label: string;
  /** Short description shown on empty columns. */
  hint: string;
  /** Saturated block — column headers and other colour-blocked surfaces. */
  solidClass: string;
  /** Tinted block — badges and quieter surfaces. */
  softClass: string;
  /** Bare colour, for dots and rules. */
  dotClass: string;
  /** Left edge on candidate cards. Written out in full so Tailwind sees it. */
  edgeClass: string;
}

export const STAGE_META: Record<Stage, StageMeta> = {
  applied: {
    value: "applied",
    label: "Applied",
    hint: "New applications land here",
    solidClass: "bg-brand-ink text-background",
    softClass: "bg-surface-slate text-foreground",
    dotClass: "bg-brand-ink",
    edgeClass: "border-l-brand-ink",
  },
  interview: {
    value: "interview",
    label: "Interview",
    hint: "Screening and interviews",
    solidClass: "bg-brand-blue text-white",
    softClass: "bg-surface-blue text-brand-blue-strong",
    dotClass: "bg-brand-blue",
    edgeClass: "border-l-brand-blue",
  },
  test: {
    value: "test",
    label: "Test",
    hint: "Take-home or technical assessment",
    solidClass: "bg-brand-violet text-white",
    softClass: "bg-surface-violet text-brand-violet",
    dotClass: "bg-brand-violet",
    edgeClass: "border-l-brand-violet",
  },
  offer: {
    value: "offer",
    label: "Offer",
    hint: "Offer extended",
    solidClass: "bg-brand-amber text-brand-ink",
    softClass: "bg-surface-amber text-brand-amber-strong",
    dotClass: "bg-brand-amber",
    edgeClass: "border-l-brand-amber",
  },
  accepted: {
    value: "accepted",
    label: "Accepted",
    hint: "Signed and hired",
    solidClass: "bg-brand-emerald text-white",
    softClass: "bg-surface-emerald text-brand-emerald-strong",
    dotClass: "bg-brand-emerald",
    edgeClass: "border-l-brand-emerald",
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    hint: "Not moving forward",
    solidClass: "bg-brand-rose text-white",
    softClass: "bg-surface-rose text-brand-rose",
    dotClass: "bg-brand-rose",
    edgeClass: "border-l-brand-rose",
  },
};

export const STAGE_LIST = STAGES.map((stage) => STAGE_META[stage]);

/** Shape the Base UI select wants for rendering the selected label. */
export const STAGE_SELECT_ITEMS = STAGE_LIST.map((stage) => ({
  value: stage.value,
  label: stage.label,
}));

/** Stages that represent an open, in-flight candidate. */
const ACTIVE_STAGES: Stage[] = ["applied", "interview", "test", "offer"];

export function isActiveStage(stage: Stage) {
  return ACTIVE_STAGES.includes(stage);
}
