import type { Stage } from "@/types/candidate";

import { Badge } from "@/components/ui/badge";
import { STAGE_META } from "@/features/candidates/lib/stages";
import { cn } from "@/lib/utils";

export function StageBadge({
  stage,
  className,
}: {
  stage: Stage;
  className?: string;
}) {
  const meta = STAGE_META[stage];

  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", meta.softClass, className)}
    >
      {meta.label}
    </Badge>
  );
}
