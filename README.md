# RoamRoute — Frontend

React + TypeScript + Vite frontend for the RoamRoute trip-booking app. Companion to the Spring Boot backend at https://github.com/IDATA2301/idata2306-group-11.

## Stack

- React 19, TypeScript, Vite 7
- React Router 7, Heroicons, Leaflet
- Backend API and image storage proxied through Vite during dev

## Prerequisites

- Node.js 20.19+ (or 22.12+ / 24+)
- npm
- Backend reachable somewhere — either on NTNU campus network at `10.212.27.62`, or running locally (see the backend repo).

## Setup

```bash
git clone <this-repo>
cd idata2301-group11
npm install
cp .env.example .env
```

`.env` holds the campus-default proxy targets and is gitignored. For machine-specific overrides (e.g. when working from home), create `.env.local` — Vite loads it on top of `.env` and it's also gitignored.

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Path prefix every API call uses. Leave as `/api`. | `/api` |
| `VITE_API_TARGET` | Dev-server proxy target for `/api/*`. Set empty to disable. | `http://10.212.27.62` |
| `VITE_IMAGES_TARGET` | Dev-server proxy target for `/images/trip/*` and `/images/destination/*`. Set empty to fall back to `public/images/`. | `http://10.212.27.62` |

Static images that aren't trip/destination content (`fly.png`, `index-hero.webp`, `TeamMember.png`, …) live in `public/images/` and are always served by Vite — they don't go through the proxy.

## Running

```bash
npm run dev      # dev server on http://localhost:5173 with HMR
npm run build    # type-check + production build into dist/
npm run preview  # serve the built dist/ locally
npm run lint     # run ESLint
```

## Working modes

**On campus (default).** `.env` already points at `10.212.27.62`. Just `npm run dev`.

**At home with a local backend.** Create `.env.local`:

```env
VITE_API_TARGET=http://localhost:8080
VITE_IMAGES_TARGET=
```

Then start the backend (see backend README) and `npm run dev`. API calls hit `localhost:8080`; image requests fall through to Vite, which serves files from `public/images/`. Make sure the filenames in `public/images/destination/` and `public/images/trip/` match what the database `image_url` values reference.

**Off network entirely.** Either VPN into NTNU or run the backend locally. There is no API mock layer — Home and most other pages need the backend to render real data.

## Project layout

```
src/
  pages/              route components
  components/         feature-grouped UI
  services/           API helpers (apiFetch, destinations, auth, ...)
  context/            React context (auth, etc.)
  types/              shared TypeScript types
  utils/imageUrls.ts  getTripImageUrl / getDestinationImageUrl
  assets/styles/      global CSS
public/
  images/             static images (hero, logos) + local-dev fallbacks
```
