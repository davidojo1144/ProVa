import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  Activity,
  ActivityType,
  Candidate,
  CandidateDraft,
  Stage,
} from "@/types/candidate";
import { STAGE_META } from "@/features/candidates/lib/stages";
import { uid } from "@/lib/id";

const STORAGE_KEY = "prova-hiring-tracker";

function logActivity(type: ActivityType, message: string): Activity {
  return { id: uid(), type, message, createdAt: new Date().toISOString() };
}

/**
 * Writes can fail for real reasons — a full quota, or private-mode Safari
 * refusing storage — and silently losing data is the worst outcome for a
 * tracker. The toast module is pulled in lazily to keep this file UI-free.
 */
function reportStorageFailure() {
  void import("@/components/common/toast").then(({ notify }) => {
    notify.error("Changes could not be saved", {
      description:
        "This browser is blocking local storage, so your edits will be lost on refresh.",
    });
  });
}

const guardedStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      reportStorageFailure();
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // Nothing to recover from a failed delete.
    }
  },
}));

interface CandidatesState {
  candidates: Candidate[];
  addCandidate: (draft: CandidateDraft) => Candidate;
  updateCandidate: (id: string, draft: CandidateDraft) => void;
  removeCandidate: (id: string) => void;
  moveCandidate: (id: string, stage: Stage) => void;
  rateCandidate: (id: string, rating: number) => void;
  addNote: (id: string, body: string) => void;
  removeNote: (candidateId: string, noteId: string) => void;
  /** Puts a deleted candidate back, so a delete can be undone. */
  restoreCandidate: (candidate: Candidate) => void;
  replaceAll: (candidates: Candidate[]) => void;
  clearAll: () => void;
}

/** Applies `patch` to one candidate and refreshes its updatedAt stamp. */
function mapCandidate(
  candidates: Candidate[],
  id: string,
  patch: (candidate: Candidate) => Candidate,
) {
  return candidates.map((candidate) =>
    candidate.id === id
      ? { ...patch(candidate), updatedAt: new Date().toISOString() }
      : candidate,
  );
}

export const useCandidatesStore = create<CandidatesState>()(
  persist(
    (set) => ({
      candidates: [],

      addCandidate: (draft) => {
        const now = new Date().toISOString();
        const candidate: Candidate = {
          ...draft,
          id: uid(),
          rating: 0,
          notes: [],
          activity: [
            logActivity("created", `Added to ${STAGE_META[draft.stage].label}`),
          ],
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ candidates: [candidate, ...state.candidates] }));
        return candidate;
      },

      updateCandidate: (id, draft) =>
        set((state) => ({
          candidates: mapCandidate(state.candidates, id, (candidate) => {
            const stageChanged = candidate.stage !== draft.stage;
            return {
              ...candidate,
              ...draft,
              activity: [
                stageChanged
                  ? logActivity(
                      "stage_changed",
                      `Moved from ${STAGE_META[candidate.stage].label} to ${
                        STAGE_META[draft.stage].label
                      }`,
                    )
                  : logActivity("updated", "Details updated"),
                ...candidate.activity,
              ],
            };
          }),
        })),

      removeCandidate: (id) =>
        set((state) => ({
          candidates: state.candidates.filter(
            (candidate) => candidate.id !== id,
          ),
        })),

      moveCandidate: (id, stage) =>
        set((state) => ({
          candidates: mapCandidate(state.candidates, id, (candidate) => {
            if (candidate.stage === stage) return candidate;
            return {
              ...candidate,
              stage,
              activity: [
                logActivity(
                  "stage_changed",
                  `Moved from ${STAGE_META[candidate.stage].label} to ${
                    STAGE_META[stage].label
                  }`,
                ),
                ...candidate.activity,
              ],
            };
          }),
        })),

      rateCandidate: (id, rating) =>
        set((state) => ({
          candidates: mapCandidate(state.candidates, id, (candidate) => {
            const next = candidate.rating === rating ? 0 : rating;
            return {
              ...candidate,
              rating: next,
              activity: [
                logActivity(
                  "rated",
                  next === 0 ? "Rating cleared" : `Rated ${next}/5`,
                ),
                ...candidate.activity,
              ],
            };
          }),
        })),

      addNote: (id, body) =>
        set((state) => ({
          candidates: mapCandidate(state.candidates, id, (candidate) => ({
            ...candidate,
            notes: [
              { id: uid(), body, createdAt: new Date().toISOString() },
              ...candidate.notes,
            ],
            activity: [
              logActivity("note_added", "Note added"),
              ...candidate.activity,
            ],
          })),
        })),

      removeNote: (candidateId, noteId) =>
        set((state) => ({
          candidates: mapCandidate(
            state.candidates,
            candidateId,
            (candidate) => ({
              ...candidate,
              notes: candidate.notes.filter((note) => note.id !== noteId),
            }),
          ),
        })),

      restoreCandidate: (candidate) =>
        set((state) =>
          state.candidates.some((existing) => existing.id === candidate.id)
            ? state
            : { candidates: [candidate, ...state.candidates] },
        ),

      replaceAll: (candidates) => set({ candidates }),

      clearAll: () => set({ candidates: [] }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: guardedStorage,
    },
  ),
);
