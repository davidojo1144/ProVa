# ProVA Hiring Tracker

A small hiring pipeline tracker: add candidates, move them through stages, rate
them, keep interview notes, and find anyone in the pipeline quickly. Everything
persists in the browser, so it runs with no backend and no sign-in.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The board starts empty —
use **Load sample data** (or the ⋮ menu in the header) to fill it with eight
demo candidates spread across the pipeline.

No environment variables are required. `.env.example` has the single optional
one (`NEXT_PUBLIC_SITE_URL`), used only to build absolute URLs for SEO metadata
in a deployed environment.

### Scripts

| Command                           | Description                |
| --------------------------------- | -------------------------- |
| `npm run dev`                     | Dev server                 |
| `npm run build` / `npm run start` | Production build and serve |
| `npm run lint` / `lint:fix`       | ESLint                     |
| `npm run format` / `format:check` | Prettier                   |
| `npm run type-check`              | `tsc --noEmit`             |

## Features

**Candidate management** — add and edit candidates through one validated form
(name, email, phone, role, location, source, résumé link, tags, stage). Deleting
asks for confirmation and can be undone from the toast.

**Pipeline management** — six stages: Applied → Interview → Test → Offer →
Accepted / Rejected. Drag a card between columns on the board, or use the
per-card menu, which is the same action for keyboard and touch users. Every move
is undoable.

**Evaluation tools** — a 1–5 star rating (click the same star again to clear it)
and timestamped notes, both in the candidate detail panel. Each candidate also
keeps an activity trail of stage changes, ratings and notes.

**Search and discovery** — search across name, email, role, location, source and
tags (all terms must match, so "react lagos" narrows), filter by any combination
of stages and by minimum rating, and sort by recency, name or rating. Filters
apply to both the board and the list view.

**Persistence** — state is written to `localStorage` on every change and
rehydrated on load. If the browser refuses to store (private mode, quota), the
app says so in an error toast rather than losing the data silently.

**Extras** — a dashboard summary row (pipeline counts, offers out, hires, average
rating), a list view alongside the board, dark mode, and a toast system with
undo for every destructive action.

## Technical decisions

**Next.js App Router + TypeScript.** The brief allows any stack; this one gives
strict typing, a fast dev loop, and a straightforward deployment story. The app
is one route — the tracker is a single workspace, and splitting it across pages
would add navigation without adding clarity.

**Zustand + `localStorage` for persistence, not a database.** The requirement is
that data survives a refresh. A backend would mean hosting, schemas and auth for
what is a single-user MVP, and a file-based store would not survive on serverless
hosting anyway. Zustand's `persist` middleware satisfies the requirement with no
infrastructure, and the trade-off is stated plainly: data is per-browser and per
device. Swapping in an API later means replacing the store's action bodies —
components talk to a `useCandidateActions()` hook, not to storage.

**A store that holds data, and a hook that handles feedback.** `candidates-store`
is a plain data model with no UI concerns. `useCandidateActions` wraps it to add
toasts, undo and haptics, so every component reports changes identically and the
model stays testable.

**Native HTML5 drag-and-drop instead of a DnD library.** Dragging cards between
columns needs about thirty lines with the platform API. Since HTML5 drag events
do not fire on touch, the card menu offers the same stage moves — that fallback
is what makes the feature work on phones and keyboards, so the library was not
worth the bundle.

**shadcn/ui on Base UI primitives.** Accessible dialogs, menus, selects and
sheets without hand-rolling focus traps, with the component source in the repo
where it can be edited. Unused primitives were deleted rather than left lying
around.

**React Hook Form + Zod.** One schema validates the candidate form and types it,
so the form values and the stored record cannot drift apart.

**Custom toast layer over sonner.** Four typed toasts, each with its own icon and
left border rather than a background tint alone: success and info clear after 4s,
warnings after 7s, and errors wait to be acknowledged before dismissing 10s
later. At most three stack; sonner handles swipe-to-dismiss and pause-on-hover,
and the stack transition is a sampled `linear()` curve of a real spring
(stiffness 180, damping 20), which keeps the motion on the compositor with no
animation library.

**Haptics where the platform allows.** The Vibration API on Android/Chrome, and
the hidden `switch` input that Safari maps to the system haptic on iOS 17.4+.
Both are silenced under `prefers-reduced-motion`, and everywhere else it is a
no-op — feedback is a bonus, never load-bearing.

**Responsiveness by layout, not by hiding things.** The board swipes stage by
stage on phones (snap points, one column at a time), becomes a three-column grid
on tablets and a six-column board from `xl` up. The table drops columns as space
runs out, folding role and email under the name. Type sizes use `clamp()` from a
single fluid root size, so the whole UI scales with the viewport instead of
jumping at breakpoints.

**Deferred loading.** The candidate form and detail panel — and React Hook Form
and Zod with them — only load when a user first opens them, which cut the largest
client chunk from 663 KB to 409 KB.

## Project structure

```
src/
  app/            route, layout, error/loading/not-found, robots, sitemap, OG image
  components/
    ui/           shadcn primitives (only the ones in use)
    common/       providers, theme toggle, toast system
  features/
    candidates/
      components/ board, table, cards, form, detail panel, toolbar, stats
      hooks/      useCandidateActions — store mutations plus feedback
      lib/        stage config, filtering, stats, demo data
      schemas/    zod schema for the candidate form
  hooks/          shared hooks
  lib/            formatting, ids, haptics, seo, cn
  store/          zustand store with persistence
  types/          candidate domain model
```

## Accessibility

Stage changes, ratings and dismissal are all reachable without a pointer; the
drag-and-drop board has an equivalent menu on every card. Dialogs and menus come
from Base UI with focus management intact, icon-only controls carry labels, and
toasts announce as `status`/`alert`. Motion and haptics respect
`prefers-reduced-motion`.

## Known limitations

- Data lives in one browser: no sync across devices, and clearing site data
  clears the pipeline. Undo covers accidental deletes within a session.
- Drag-and-drop is pointer-only by design; the card menu covers touch and
  keyboard.
- No automated tests. Given more time the filtering, stats and store reducers are
  the first things worth covering — they are pure functions and already isolated
  for it.
