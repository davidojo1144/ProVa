import { STAGE_LIST } from "@/features/candidates/lib/stages";
import { cn } from "@/lib/utils";

/** Counts and name lengths only — enough to read as the product, no data needed. */
const PREVIEW = [
  { cards: [10, 7], names: ["Ifeanyi Eze", "Chloe Bennett"] },
  { cards: [9, 8], names: ["Tunde Bakare", "Priya Raman"] },
  { cards: [8], names: ["Daniel Mensah"] },
  { cards: [9], names: ["Amara Okafor"] },
  { cards: [8], names: ["Sara Haddad"] },
  { cards: [], names: [] },
];

/**
 * Static picture of the board for the marketing route. Deliberately not the
 * live board — it must not depend on the visitor's stored candidates.
 */
export function BoardPreview() {
  return (
    <div className="grid h-full grid-cols-3 gap-2 overflow-hidden p-3 xl:grid-cols-6">
      {STAGE_LIST.map((stage, stageIndex) => (
        <section
          key={stage.value}
          className="bg-muted flex flex-col overflow-hidden rounded-md"
        >
          <header
            className={cn(
              "flex items-center gap-1.5 px-2 py-1.5",
              stage.solidClass,
            )}
          >
            <h3 className="label-caps text-[0.6rem]">{stage.label}</h3>
            <span className="rounded-sm bg-current/15 px-1 text-[0.6rem] font-bold tabular-nums">
              {PREVIEW[stageIndex].names.length}
            </span>
          </header>

          <div className="flex flex-col gap-1.5 p-1.5">
            {PREVIEW[stageIndex].names.map((name) => (
              <div
                key={name}
                className={cn(
                  "bg-card flex flex-col gap-1.5 rounded-sm border-l-2 p-2",
                  stage.edgeClass,
                )}
              >
                <p className="text-[0.65rem] leading-none font-bold">{name}</p>
                <div className="bg-foreground/10 h-1 w-3/4 rounded-full" />
                <div className="bg-foreground/10 h-1 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
