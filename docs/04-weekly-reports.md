# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

The value is entirely in writing them **while it is happening**. What took four
hours and why is invisible a month later, and it is exactly what your journal
needs.

---

## Week of 2026-10-05

**Done.** The deployed site now works at phone widths: responsive layout pass on
Oct 8, then a dedicated phone styling pass on Oct 10. Every tracker page shows an
error banner (new `ErrorBanner` component) when loading or saving fails. About
page rewritten and styled, favicon and page description added, default font
changed to Nunito, demo video linked in the README. Seed data and the proposal
were updated to match each other, and the design system PDF is uploaded to
`docs/`. Cleaned up leftover scaffolding comments in `localApi.js` and deleted
`notes.md`.

**Stuck.** Phone layout took two separate passes, because the first fix (176 lines
of CSS on Oct 8) handled general responsiveness but not the sidebar/top bar, which
needed its own changes in `Layout.jsx` on Oct 10.

**Hours.** ~8 hours

**Next.** Finish the mockup with exported images (every screen, one empty state,
one phone view). Write up in the journal anything shown in the mockup that did not
make it into the build.

---

## Week of 2026-09-28

**Done.** The app went from "pages with test data" to a styled, deployed product.
Full game data went into `seed.json` (all crafting recipes, the full museum with
minerals and artifacts, the full fish list, villagers, farm progress, golden
walnuts). Built the sidebar and top bar, card styling across every tracker page,
and a `DataMenu` for exporting and importing progress. Linked Stardrops now
auto-check. Fixed the router so the site works on GitHub Pages. Added the Security
Checklist, a license, screenshots, and the AI-USAGE week 3 update.

**Stuck.** Three specific things, all on Oct 4:
- The site loaded blank on GitHub Pages because the router had no `basename`, so
  routes resolved against the domain root instead of
  `/stardew-perfection-tracker/` (fixed in `App.jsx`).
- Dropping the `httpApi.js` stub and renaming `mockApi` to `localApi` broke
  several components that relied on the old return shapes, which needed a
  follow-up fix commit across 10 files.
- The header overflowed on narrower screens.

**Hours.** ~14 hours

**Next.** Make it work on phones. Add error handling so a failed save does not
fail silently.

---

## Week of 2026-09-21

**Done.** Repo created Sep 20 from the template. Set up routing and the mock API,
built the first tracker page, then all 11 pages with test data and a Dashboard
with category summaries (Sep 23). Decided what data each page needs and added
test data for each, including bundles, produce shipped, monster slayer and cooking
(Sep 27). Simple layout, README, security checklist and the first AI-USAGE entries.

**Stuck.** Deciding the data shape for each page.

**Hours.** ~10 hours

**Next.** Replace test data with the real game data, and start on layout and
styling.