# Skills and résumé update

The skills section now contains exactly the 13 user-approved tools across five groups. The former table, filters and inspector are removed. The résumé download is replaced with the new AAKIF AHAMED.pdf. Updated validation results are appended below.

## Original release verification (historical)

# Verification report

Tested on the local production export with Chrome and Playwright. These are measured development-machine results, not a guarantee for every host or device.

## Build

- `npm run build`: passed, including TypeScript and Next.js lint checks.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- First-load JavaScript reported by Next.js: **128 kB**.
- Production dependency audit: **0 vulnerabilities**.
- All runtime assets are local. No external runtime requests.

## Mobile Lighthouse

Default simulated mobile configuration, Lighthouse CLI, Chrome headless, local production export:

| Metric | Result |
| --- | --- |
| Performance | **92** |
| Accessibility | **100** |
| First Contentful Paint | 1.1 s |
| Largest Contentful Paint | 2.4 s |
| Speed Index | 2.1 s |
| Total Blocking Time | 290 ms |
| Cumulative Layout Shift | 0 |

Raw report delivered as `lighthouse-mobile.json` alongside the source archive. Local test server supports compression and byte-range media requests.

## Browser behavior

Thirty automated checks passed:

- Sound button unmutes/plays and mutes the intro.
- Video loops across the endpoint.
- Video and voice pause below the hero visibility threshold and resume on return.
- ID card flips with Enter and returns with Space.
- Skill filters dim other families; keyboard focus updates the inspector and matching projects.
- Project gallery opens the focused panel.
- Achievement track moves horizontally and stays pinned during its travel.
- Copy button announces success; clipboard contains the correct email.
- No horizontal overflow at **360, 390, 768, 1024, 1440 and 1920 px**.
- Mobile menu opens, locks scrolling, closes with Escape and navigates to the chosen section.
- Reduced motion disables automatic hero playback and gallery pinning, and remains overflow-free.
- No JavaScript runtime errors or failed resource requests.

## Media

The original is an animated avatar, identified as such in image descriptions. Both primary files decode to 228 frames at 24 fps (9.5 seconds). Mobile files preserve the same timing and audio. The circular 0.5-second dissolve avoids a hard cut, but overlapping speech or pose changes may remain perceptible. Captions follow the actual spoken intro and the exported timeline.

## Content audit

All résumé text and hyperlink annotations were extracted. Nine projects, four freelance roles, three education entries and two completed courses are represented. No unsupported external links, employment dates, clients, platform ranks or certifications were added. Graduation year, CGPA and student ID use the user's explicit follow-up. Model metrics remain scoped to project test data.

## Known constraints

- Audible autoplay depends on browser permissions; the visitor can enable it with the sound button.
- The original résumé download is unchanged; the user's additional academic details appear on the website only.
- Next.js 15's lint tooling has a development-only `braces` advisory without an upstream patch; the published static site excludes that tooling. Production audit is clean.
- Courses have no certificate links, projects have no repository links, and no GitHub/LinkedIn profile URLs were supplied; these controls are omitted.

## Desktop and touch verification

- Desktop Lighthouse: **99 performance / 100 accessibility**.
- Saved and visually inspected screenshots at **1440×900** and **390×844**.
- The mobile hero selects the 480×600 media variants.
- Pointer-based screenshots verified the white video background blends into the page and mobile text/CTA spacing clears the avatar.
- Touch ID-card checks use coordinate/forced tapping because the specified continuous pendulum sway intentionally prevents Playwright's stationary-element heuristic from settling.

## Updated validation

- Production build passed, including lint and type checks; first-load JS is 126 kB.
- Exactly 13 selected skills across five groups (the earlier proposal miscounted the list as 14).
- No periodic table, filters, inspector, percentages or proficiency claims.
- Desktop (1440×900) and mobile (390×844) screenshots visually reviewed.
- No horizontal overflow at 360, 390, 768, 1440 and 1920 px.
- No runtime errors.
- Both résumé links and an actual browser download match the new PDF SHA-256: `5ecc8de128bd9d428f211e5888ad29bf1c4cbee7156477afc42f1d3791f0cf4e`.
