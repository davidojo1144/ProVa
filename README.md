# ProVa

Production-ready Next.js App Router boilerplate.

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, PostCSS + Autoprefixer, CSS-variable theme tokens, class-based dark mode (`next-themes`)
- **State & data:** Zustand, TanStack React Query, Axios (centralized client in `src/services/api-client.ts`)
- **Auth:** Auth.js (NextAuth v5), JWT sessions, Google OAuth + Credentials providers, route protection via `src/proxy.ts`
- **Forms:** React Hook Form + Zod (`@hookform/resolvers`)
- **UI:** shadcn/ui, lucide-react icons, `clsx` + `tailwind-merge`
- **Tooling:** ESLint, Prettier (with `prettier-plugin-tailwindcss`), Husky, lint-staged, Commitlint

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                                    | Description                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| `NEXTAUTH_URL`                              | Public URL of the app (e.g. `http://localhost:3000`)                               |
| `NEXTAUTH_SECRET`                           | Random secret for signing sessions — generate with `openssl rand -base64 32`       |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `NEXT_PUBLIC_API_URL`                       | Base URL for the Axios API client                                                  |

## Scripts

| Command                           | Description                 |
| --------------------------------- | --------------------------- |
| `npm run dev`                     | Start the dev server        |
| `npm run build`                   | Production build            |
| `npm run start`                   | Start the production server |
| `npm run lint` / `lint:fix`       | ESLint                      |
| `npm run format` / `format:check` | Prettier                    |
| `npm run type-check`              | `tsc --noEmit`              |

## Folder structure

```
src/
  app/          # routes, layouts, loading/error/not-found
  components/
    ui/         # shadcn/ui primitives
    common/      # shared app components (providers, header, theme toggle)
  features/     # feature-scoped components, schemas, logic
  hooks/        # shared React hooks
  lib/          # cross-cutting utilities (auth, query client, seo, cn)
  services/     # API client + service functions
  store/        # Zustand stores
  styles/       # globals.css
  types/        # shared TypeScript types
```

## Auth

Auth.js config lives in `src/lib/auth.ts` and is mounted at `src/app/api/auth/[...nextauth]/route.ts`. `src/proxy.ts` protects the routes listed in its `matcher` (defaults to `/dashboard/:path*`) — extend the matcher as new protected routes are added. The Credentials provider's `authorize` function is a stub; wire it up to your real user store before shipping.

## Git hooks

Husky runs `lint-staged` on commit (ESLint + Prettier on staged files) and Commitlint on the commit message (Conventional Commits). Hooks are installed automatically via the `prepare` script on `npm install`.
