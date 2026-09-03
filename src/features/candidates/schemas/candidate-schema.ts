import { z } from "zod";

import { STAGES } from "@/types/candidate";

export const candidateSchema = z.object({
  name: z.string().trim().min(2, "Enter the candidate's name"),
  email: z.email("Enter a valid email address"),
  role: z.string().trim().min(2, "Enter the role they applied for"),
  stage: z.enum(STAGES),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  source: z.string().trim().optional(),
  resumeUrl: z.union([z.url("Enter a valid link"), z.literal("")]).optional(),
  /** Comma separated in the form, split into an array on submit. */
  tags: z.string().optional(),
});

export type CandidateFormValues = z.infer<typeof candidateSchema>;

export function parseTags(input: string | undefined) {
  return (input ?? "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}
