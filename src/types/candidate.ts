export const STAGES = [
  "applied",
  "interview",
  "test",
  "offer",
  "accepted",
  "rejected",
] as const;

export type Stage = (typeof STAGES)[number];

export interface Note {
  id: string;
  body: string;
  createdAt: string;
}

export type ActivityType =
  "created" | "updated" | "stage_changed" | "rated" | "note_added";

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  location?: string;
  source?: string;
  resumeUrl?: string;
  stage: Stage;
  /** 0 means unrated; otherwise 1-5. */
  rating: number;
  tags: string[];
  notes: Note[];
  activity: Activity[];
  createdAt: string;
  updatedAt: string;
}

/** The fields a user fills in on the candidate form. */
export type CandidateDraft = Pick<
  Candidate,
  | "name"
  | "email"
  | "phone"
  | "role"
  | "location"
  | "source"
  | "resumeUrl"
  | "stage"
  | "tags"
>;
