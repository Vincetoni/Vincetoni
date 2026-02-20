# VinceToni Demo App

Liquid-glass styled Expo app with:

- 4 modern round-tab pages
- Home loading screen
- GSAP + Three.js motion badge
- Random GIF cards with joke text and adaptive card shape
- Troll song video modal on sign-in attempt

## Run

```bash
npm install
npm run start
```

## GIF Auto-Update

Drop any `.gif` into `assets/random gifs/` and run:

```bash
npm run start
```

The `prestart` script runs `scripts/generate-gif-manifest.js` and updates `app/data/gifManifest.ts` automatically.

## Easy Edit Points

- Main text/jokes: `app/config/appContent.ts`
- Tab pages: `app/(tabs)/`
- GIF card layout: `app/components/RandomGifCard.tsx`
- Home loading + sign-in behavior: `app/(tabs)/index.tsx`
- Troll video modal: `app/components/TrollVideoModal.tsx`
# Vincetoni
