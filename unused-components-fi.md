# Unused Homepage Components

## 1. Hero 3D Phone (WebGL)
Location: `app/_home/FermorPhone3D.tsx`
Component: `FermorPhone3D` (default export)
Status: Retained in codebase, not rendered on homepage.
Description: The real Three.js iPhone 15 Pro Max model (Draco-compressed glTF, `public/models/scene.glb`)
with the live Fermor dashboard screen captured into a CanvasTexture, plus the GSAP ScrollTrigger
timeline that pinned the hero and tumbled the phone into view on scroll. Removed from the hero in
`app/_home/HomepageClient.tsx` and replaced with a `HeroVideo` component (same file) rendering
`public/videos/fermor-phone-hero.mp4` - a pre-rendered clip of the same phone tumble/reveal. Unlike
the 3D phone, this video sits in normal document flow below the waitlist box rather than pinned
over the copy, starts paused and is only played once via IntersectionObserver when the user scrolls
it into view (`mixBlendMode: 'multiply'` is what makes its white background disappear into the
hero's own near-white ground, not real alpha transparency - the source file is an opaque 3840x2160
clip). The GSAP timeline inside `FermorPhone3D.tsx` also drove the hero globe's scroll-shrink/fade
and the copy's scroll-lift/fade via `[data-hero-globe-layer]` and `[data-hero-copy]`; those data
attributes and the scroll-only styling (`transformOrigin`, `willChange`) were removed from the hero
along with it, since they had no other consumer. The globe and copy now render only in their
resting composition. `Phone`, `PhoneScreenSurface` and `StatusBar` (the CSS/DOM phone shell
`FermorPhone3D` used as its fallback) remain in active use elsewhere on the homepage and were not
touched.

## 2. Manage Money Together — Circle Orb
Location: `app/_home/ForecastSection.tsx`
Component: `SharedMoneySection`
Status: Retained in codebase, not rendered on homepage.
Description: Previous circular/radiating-energy "Manage money together" section.

## 3. Unify Showcase — Final Green Product Stage
Location: `app/_home/UnifyShowcase.tsx`
Status: Retained in codebase, not rendered on homepage.
Description: Final green product stage containing the phone with "Simple" / "fast & safe".
Reachable by passing `showFinalStage` to `UnifyShowcase`.

(StartShowcase, previously listed here, was restored to band 3 of the homepage and is in active
use again - see `app/_home/HomepageClient.tsx`.)
