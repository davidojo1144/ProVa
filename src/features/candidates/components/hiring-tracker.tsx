"use client";

import { useMemo, useState } from "react";
import {
  Database,
  KanbanSquare,
  MoreVertical,
  Plus,
  Rows3,
  Sparkles,
  Trash2,
} from "lucide-react";

import type { Candidate, Stage } from "@/types/candidate";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { CandidateBoard } from "@/features/candidates/components/candidate-board";
import { CandidateDetailSheet } from "@/features/candidates/components/candidate-detail-sheet";
import { CandidateFormDialog } from "@/features/candidates/components/candidate-form-dialog";
import { CandidateTable } from "@/features/candidates/components/candidate-table";
import { CandidateToolbar } from "@/features/candidates/components/candidate-toolbar";
import {
  NoCandidates,
  NoResults,
} from "@/features/candidates/components/empty-state";
import { PipelineStats } from "@/features/candidates/components/pipeline-stats";
import {
  DEFAULT_FILTERS,
  filterCandidates,
  hasActiveFilters,
  type CandidateFilters,
} from "@/features/candidates/lib/filters";
import { useCandidateActions } from "@/features/candidates/hooks/use-candidate-actions";
import { createSampleCandidates } from "@/features/candidates/lib/sample-data";
import { useMounted } from "@/hooks/use-mounted";
import { useCandidatesStore } from "@/store/candidates-store";

export function HiringTracker() {
  const mounted = useMounted();
  const candidates = useCandidatesStore((state) => state.candidates);
  const actions = useCandidateActions();

  const [filters, setFilters] = useState<CandidateFilters>(DEFAULT_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Candidate | null>(null);
  const [formStage, setFormStage] = useState<Stage>("applied");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Candidate | null>(null);

  const visible = useMemo(
    () => filterCandidates(candidates, filters),
    [candidates, filters],
  );

  // Read through the store so the panel reflects edits made inside it.
  const detailCandidate =
    candidates.find((candidate) => candidate.id === detailId) ?? null;

  const openAdd = (stage: Stage = "applied") => {
    setEditing(null);
    setFormStage(stage);
    setFormOpen(true);
  };

  const openEdit = (candidate: Candidate) => {
    setEditing(candidate);
    setFormOpen(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-[120rem] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-title font-semibold tracking-tight">
            Hiring Tracker
          </h1>
          <p className="text-muted-foreground text-body">
            Track every applicant from first application to signed offer.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Data options"
                />
              }
            >
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <Database className="mr-1.5 inline size-3" />
                  Demo data
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => actions.loadSample(createSampleCandidates())}
                >
                  <Sparkles />
                  Load sample pipeline
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={candidates.length === 0}
                  onClick={() => actions.clearAll()}
                >
                  <Trash2 />
                  Clear all candidates
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => openAdd()}>
            <Plus />
            Add candidate
          </Button>
        </div>
      </header>

      {!mounted ? (
        <TrackerSkeleton />
      ) : candidates.length === 0 ? (
        <NoCandidates
          onAdd={() => openAdd()}
          onSeed={() => actions.loadSample(createSampleCandidates())}
        />
      ) : (
        <>
          <PipelineStats candidates={candidates} />

          <Tabs defaultValue="board" className="gap-4">
            <CandidateToolbar
              filters={filters}
              onChange={setFilters}
              resultCount={visible.length}
              totalCount={candidates.length}
              viewSwitch={
                <TabsList>
                  <TabsTrigger value="board" className="gap-1.5">
                    <KanbanSquare className="size-3.5" />
                    Board
                  </TabsTrigger>
                  <TabsTrigger value="list" className="gap-1.5">
                    <Rows3 className="size-3.5" />
                    List
                  </TabsTrigger>
                </TabsList>
              }
            />

            {visible.length === 0 ? (
              <NoResults onClear={() => setFilters(DEFAULT_FILTERS)} />
            ) : (
              <>
                <TabsContent value="board">
                  <CandidateBoard
                    candidates={visible}
                    onOpen={(candidate) => setDetailId(candidate.id)}
                    onEdit={openEdit}
                    onDelete={setPendingDelete}
                    onAdd={openAdd}
                  />
                </TabsContent>
                <TabsContent value="list">
                  <CandidateTable
                    candidates={visible}
                    onOpen={(candidate) => setDetailId(candidate.id)}
                    onEdit={openEdit}
                    onDelete={setPendingDelete}
                  />
                </TabsContent>
              </>
            )}
          </Tabs>

          {hasActiveFilters(filters) && visible.length > 0 && (
            <p className="text-muted-foreground text-xs">
              Filters apply to both views.
            </p>
          )}
        </>
      )}

      <CandidateFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        candidate={editing}
        defaultStage={formStage}
      />

      <CandidateDetailSheet
        candidate={detailCandidate}
        onOpenChange={(open) => !open && setDetailId(null)}
        onEdit={(candidate) => {
          setDetailId(null);
          openEdit(candidate);
        }}
      />

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete candidate?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete?.name} and their notes will be removed from the
              tracker. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDelete) actions.remove(pendingDelete);
                setPendingDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/** Placeholder shown until the persisted store has rehydrated. */
function TrackerSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-muted h-20 animate-pulse rounded-xl" />
        ))}
      </div>
      <div className="bg-muted h-9 animate-pulse rounded-lg" />
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted h-48 animate-pulse rounded-xl not-first:max-sm:hidden"
          />
        ))}
      </div>
    </div>
  );
}
