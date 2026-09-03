"use client";

import { toast } from "sonner";

import type { Candidate, CandidateDraft, Stage } from "@/types/candidate";

import { STAGE_META } from "@/features/candidates/lib/stages";
import { useCandidatesStore } from "@/store/candidates-store";

/**
 * Wraps the store mutations with the feedback layer, so the store stays a
 * plain data model and every component reports changes the same way.
 */
export function useCandidateActions() {
  const addCandidate = useCandidatesStore((state) => state.addCandidate);
  const updateCandidate = useCandidatesStore((state) => state.updateCandidate);
  const removeCandidate = useCandidatesStore((state) => state.removeCandidate);
  const restoreCandidate = useCandidatesStore(
    (state) => state.restoreCandidate,
  );
  const moveCandidate = useCandidatesStore((state) => state.moveCandidate);
  const rateCandidate = useCandidatesStore((state) => state.rateCandidate);
  const addNote = useCandidatesStore((state) => state.addNote);
  const removeNote = useCandidatesStore((state) => state.removeNote);
  const replaceAll = useCandidatesStore((state) => state.replaceAll);

  return {
    add(draft: CandidateDraft) {
      const candidate = addCandidate(draft);
      toast.success(`${candidate.name} added`, {
        description: `Now in ${STAGE_META[candidate.stage].label}.`,
      });
      return candidate;
    },

    update(candidate: Candidate, draft: CandidateDraft) {
      updateCandidate(candidate.id, draft);
      toast.success("Changes saved", {
        description: `${draft.name}'s details are up to date.`,
      });
    },

    remove(candidate: Candidate) {
      removeCandidate(candidate.id);
      toast(`${candidate.name} removed`, {
        description: "Their notes and history went with them.",
        action: {
          label: "Undo",
          onClick: () => restoreCandidate(candidate),
        },
      });
    },

    move(candidate: Candidate, stage: Stage) {
      if (candidate.stage === stage) return;
      const from = candidate.stage;
      moveCandidate(candidate.id, stage);
      toast.success(`${candidate.name} → ${STAGE_META[stage].label}`, {
        description: `Moved out of ${STAGE_META[from].label}.`,
        action: {
          label: "Undo",
          onClick: () => moveCandidate(candidate.id, from),
        },
      });
    },

    /** Move by id, for the board where only the dragged id is known. */
    moveById(id: string, stage: Stage) {
      const candidate = useCandidatesStore
        .getState()
        .candidates.find((item) => item.id === id);
      if (!candidate) return;
      this.move(candidate, stage);
    },

    rate(candidate: Candidate, rating: number) {
      const cleared = candidate.rating === rating;
      rateCandidate(candidate.id, rating);
      toast.success(cleared ? "Rating cleared" : `Rated ${rating}/5`, {
        description: candidate.name,
      });
    },

    addNote(candidate: Candidate, body: string) {
      addNote(candidate.id, body);
      toast.success("Note added", { description: candidate.name });
    },

    removeNote(candidate: Candidate, noteId: string) {
      removeNote(candidate.id, noteId);
      toast("Note deleted");
    },

    loadSample(candidates: Candidate[]) {
      const previous = useCandidatesStore.getState().candidates;
      replaceAll(candidates);
      toast.success("Sample pipeline loaded", {
        description: `${candidates.length} candidates added.`,
        action: {
          label: "Undo",
          onClick: () => replaceAll(previous),
        },
      });
    },

    clearAll() {
      const previous = useCandidatesStore.getState().candidates;
      if (previous.length === 0) return;
      replaceAll([]);
      toast("All candidates cleared", {
        description: `${previous.length} removed from the tracker.`,
        action: {
          label: "Undo",
          onClick: () => replaceAll(previous),
        },
      });
    },
  };
}
