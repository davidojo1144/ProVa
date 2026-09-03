import type { Candidate, Stage } from "@/types/candidate";

interface SampleSpec {
  name: string;
  email: string;
  phone?: string;
  role: string;
  location?: string;
  source?: string;
  stage: Stage;
  rating: number;
  tags: string[];
  notes: string[];
  /** Days ago the candidate applied. */
  age: number;
}

const SAMPLES: SampleSpec[] = [
  {
    name: "Amara Okafor",
    email: "amara.okafor@example.com",
    phone: "+234 802 118 4402",
    role: "Senior Frontend Engineer",
    location: "Lagos, NG",
    source: "Referral",
    stage: "offer",
    rating: 5,
    tags: ["react", "typescript", "design systems"],
    notes: [
      "Offer sent at ₦-band 4. Waiting on signature by Friday.",
      "Panel was unanimous — strongest portfolio of the batch.",
    ],
    age: 21,
  },
  {
    name: "Daniel Mensah",
    email: "d.mensah@example.com",
    role: "Backend Engineer",
    location: "Accra, GH",
    source: "LinkedIn",
    stage: "test",
    rating: 4,
    tags: ["node", "postgres"],
    notes: ["Take-home sent Monday, due end of week."],
    age: 12,
  },
  {
    name: "Priya Raman",
    email: "priya.raman@example.com",
    phone: "+91 98450 22119",
    role: "Product Designer",
    location: "Remote",
    source: "Dribbble",
    stage: "interview",
    rating: 4,
    tags: ["figma", "research"],
    notes: ["Great systems thinking. Schedule the founder chat."],
    age: 9,
  },
  {
    name: "Tunde Bakare",
    email: "tunde.bakare@example.com",
    role: "Senior Frontend Engineer",
    location: "Abuja, NG",
    source: "Careers page",
    stage: "interview",
    rating: 3,
    tags: ["vue", "typescript"],
    notes: ["Solid, but mostly Vue — check React depth in round two."],
    age: 7,
  },
  {
    name: "Chloe Bennett",
    email: "chloe.bennett@example.com",
    role: "Product Designer",
    location: "London, UK",
    source: "Referral",
    stage: "applied",
    rating: 0,
    tags: ["figma", "b2b"],
    notes: [],
    age: 3,
  },
  {
    name: "Ifeanyi Eze",
    email: "ifeanyi.eze@example.com",
    role: "Backend Engineer",
    location: "Enugu, NG",
    source: "Job board",
    stage: "applied",
    rating: 0,
    tags: ["go", "kubernetes"],
    notes: [],
    age: 2,
  },
  {
    name: "Sara Haddad",
    email: "sara.haddad@example.com",
    role: "QA Engineer",
    location: "Remote",
    source: "LinkedIn",
    stage: "accepted",
    rating: 5,
    tags: ["playwright", "automation"],
    notes: ["Signed. Starts the first of next month."],
    age: 34,
  },
  {
    name: "Marcus Cole",
    email: "marcus.cole@example.com",
    role: "Backend Engineer",
    location: "Remote",
    source: "Job board",
    stage: "rejected",
    rating: 2,
    tags: ["python"],
    notes: ["Not enough depth on system design. Keep warm for junior roles."],
    age: 18,
  },
];

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Demo candidates so the board is not empty on a first visit. */
export function createSampleCandidates(): Candidate[] {
  return SAMPLES.map((sample) => {
    const createdAt = daysAgo(sample.age);
    const updatedAt = daysAgo(Math.max(0, sample.age - 2));

    return {
      id: uid(),
      name: sample.name,
      email: sample.email,
      phone: sample.phone,
      role: sample.role,
      location: sample.location,
      source: sample.source,
      stage: sample.stage,
      rating: sample.rating,
      tags: sample.tags,
      notes: sample.notes.map((body, index) => ({
        id: uid(),
        body,
        createdAt: daysAgo(Math.max(0, sample.age - 2 - index)),
      })),
      activity: [
        {
          id: uid(),
          type: "created" as const,
          message: "Added to Applied",
          createdAt,
        },
      ],
      createdAt,
      updatedAt,
    };
  });
}
