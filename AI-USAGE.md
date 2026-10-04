# AI usage

This project was built with AI assistance. This file is the record of it. I am adding to it as I go, one entry per real use.

## 1. How I used AI

### September 22-23, 2026 - Rebuilding the API around my data

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** How to replace the template's sample "sightings" API with one that fits my Stardew Valley categories instead of one flat resource.
- **What it gave back:** A category-based mock API design with `listCategory` and `toggleItem`.
- **What I kept, what I changed, and why:** I replaced the template's sample with Claude's help because I wasn't 100% sure which files I could and couldn't delete.
- **Commit:** [`f04c592`](https://github.com/hrspnd/stardew-perfection-tracker/commit/f04c592), [`eb92f12`](https://github.com/hrspnd/stardew-perfection-tracker/commit/eb92f12)

### September 23, 2026 - Reusable page components

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help structuring the three layout patterns from my wireframes as reusable components.
- **What it gave back:** The `ListTracker`, `CardGridTracker`, and `SkillTracker` component structure.
- **What I kept, what I changed, and why:** I kept the structure it gave me and added my own comments as notes for the future. For this commit, I also kept the dummy data it gave me.
- **Commit:** [`1f7be55`](https://github.com/hrspnd/stardew-perfection-tracker/commit/1f7be55)

### September 23, 2026 - Windows command and git merge conflict help

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Why `cp` failed in Windows cmd, and how to resolve a merge conflict in `README.md` on push.
- **What it gave back:** Use `copy` or Git Bash instead of `cp`, and how to resolve the conflict by hand.
- **What I kept, what I changed, and why:** I did not follow this. I realized that I only had to `cd`, and that using `cp` was pointless in this situation.
- **Commit:** [`8f5aec8`](https://github.com/hrspnd/stardew-perfection-tracker/commit/8f5aec8)

### September 23, 2026 - Stale `localStorage` data after editing the seed file

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Why my updated seed file data was not showing up in the app.
- **What it gave back:** The explanation that the mock API was reading old data cached in `localStorage`.
- **What I kept, what I changed, and why:** I wipe the cache and reseed whenever I change the seed file, because I am still testing. The other option I learned about was storing a version number alongside the cache.
- **Commit:** [`1f7be55`](https://github.com/hrspnd/stardew-perfection-tracker/commit/1f7be55)

### September 23, 2026 - Farmer Level data and functions

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** How to model Farmer Level's checkbox-plus-dropdown structure, and the real Stardew Valley profession data.
- **What it gave back:** `toggleSkillLevel` and `setSkillProfession`, plus profession names, effects, and level 5 to level 10 branching.
- **What I kept, what I changed, and why:** I kept the structure but changed the profession information. It had wrong information, and I corrected it to match the game.
- **Commit:** [`1f7be55`](https://github.com/hrspnd/stardew-perfection-tracker/commit/1f7be55)

### September 22-23, 2026 - Week 1 report, journal, and README

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help turning my notes into the report and journal templates and updating the README.
- **What it gave back:** Drafts of `REPORT.md`, `journal/week-1.md`, and the README.
- **What I kept, what I changed, and why:** I double-checked its wording and whether the information it included was accurate. I rewrote the parts it had assumed or hallucinated.
- **Commit:** [`1bf4b58`](https://github.com/hrspnd/stardew-perfection-tracker/commit/1bf4b58), [`c5307ed`](https://github.com/hrspnd/stardew-perfection-tracker/commit/c5307ed), [`6598534`](https://github.com/hrspnd/stardew-perfection-tracker/commit/6598534), [`3891718`](https://github.com/hrspnd/stardew-perfection-tracker/commit/3891718)

### September 27, 2026 - Deciding category data fields and entering real data

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help figuring out what fields each category needed and turning that into real seed data for Bundles, Produce Shipped, Monster Slayer, and Cooking Recipes.
- **What it gave back:** Guidance on the data-entry process. I looked up and entered the actual Stardew Valley data myself.
- **What I kept, what I changed, and why:** I used its guidance to decide which fields each category needed, then researched and typed in the real game data myself, because the information needed to be accurate to the game.
- **Commit:** [`3e879f7`](https://github.com/hrspnd/stardew-perfection-tracker/commit/3e879f7), [`6a1baa3`](https://github.com/hrspnd/stardew-perfection-tracker/commit/6a1baa3), [`ee70361`](https://github.com/hrspnd/stardew-perfection-tracker/commit/ee70361)

### September 27, 2026 - Second merge conflict and week 2 docs

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help resolving a merge conflict on `docs/assets`, and help writing week 2's `REPORT.md`, `journal/week-2.md`, `SECURITY-CHECKLIST.md`, and README updates from my real commit history.
- **What it gave back:** The conflict-resolution steps, plus drafts of all four files, which I reviewed and corrected against my actual repo.
- **What I kept, what I changed, and why:** I double-checked its wording and whether the information it included was accurate. I rewrote the parts it had assumed or hallucinated.
- **Commit:** [`c1262ed`](https://github.com/hrspnd/stardew-perfection-tracker/commit/c1262ed) (merge conflict), [`55dd1f2`](https://github.com/hrspnd/stardew-perfection-tracker/commit/55dd1f2) (styling), [`c075160`](https://github.com/hrspnd/stardew-perfection-tracker/commit/c075160) (README update), [`800aba8`](https://github.com/hrspnd/stardew-perfection-tracker/commit/800aba8) (screenshots), [`42fa6f1`](https://github.com/hrspnd/stardew-perfection-tracker/commit/42fa6f1) (SECURITY-CHECKLIST.md)

### October 2, 2026 - Entering the full Stardew data

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help placing the information I researched into `seed.json`.
- **What it gave back:** The proper columns needed for `seed.json`.
- **What I kept, what I changed, and why:** I kept the structure of the columns and rewrote the information to be more appropriate for the tracker. Claude did the data entry.
- **Commit:** [`b12886f`](https://github.com/hrspnd/stardew-perfection-tracker/commit/b12886f), [`28ec894`](https://github.com/hrspnd/stardew-perfection-tracker/commit/28ec894), [`9750086`](https://github.com/hrspnd/stardew-perfection-tracker/commit/9750086), [`cc67d79`](https://github.com/hrspnd/stardew-perfection-tracker/commit/cc67d79)

### October 2-4, 2026 - Dashboard, top bar and sidebar layout

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help laying out the Dashboard with a progress ring per category, and a sticky top bar and sidebar.
- **What it gave back:** `ProgressRing` and `DashboardSummaryCard`, the `Layout` structure, and the starting CSS.
- **What I kept, what I changed, and why:** I kept the general structure it gave me and added icons of my own from the game.
- **Commit:** [`679c6fd`](https://github.com/hrspnd/stardew-perfection-tracker/commit/679c6fd), [`773af8c`](https://github.com/hrspnd/stardew-perfection-tracker/commit/773af8c), [`eb92070`](https://github.com/hrspnd/stardew-perfection-tracker/commit/eb92070)

### October 4, 2026 - Card styling for the tracker pages

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Help styling the Shipped, Walnuts, Fish, Bundles, Cooking, Crafting, Museum, Farm Progress, Monster Slayer and Great Friends pages as cards.
- **What it gave back:** `TrackerPage`, a reworked `GroupedChecklist` that splits cards into two balanced columns, a reworked `ListTracker`, and the matching CSS.
- **What I kept, what I changed, and why:** I kept most of what it did but changed some of the sizing and spacing.
- **Commit:** [`80d7bee`](https://github.com/hrspnd/stardew-perfection-tracker/commit/80d7bee), [`54b61dc`](https://github.com/hrspnd/stardew-perfection-tracker/commit/54b61dc), [`ce881e9`](https://github.com/hrspnd/stardew-perfection-tracker/commit/ce881e9), [`187d1b6`](https://github.com/hrspnd/stardew-perfection-tracker/commit/187d1b6)

### October 4, 2026 - Switching from a mock API to a local API

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** How to make the app not rely on a login/signup feature.
- **What it gave back:** Renaming `mockApi.js` to `localApi.js`, rewriting `api/index.js` to point at it, and removing `httpApi.js` and `DemoNotice.jsx`.
- **What I kept, what I changed, and why:** I kept its advice on removing and renaming files, and I made those changes by hand.
- **Commit:** [`6d07e37`](https://github.com/hrspnd/stardew-perfection-tracker/commit/6d07e37), [`d162b8a`](https://github.com/hrspnd/stardew-perfection-tracker/commit/d162b8a), [`2224542`](https://github.com/hrspnd/stardew-perfection-tracker/commit/2224542)

### October 4, 2026 - Export, import and reset for saved progress

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** An export and import feature as a way to back up progress, since there are no accounts.
- **What it gave back:** The `DataMenu` component and the `exportData` and `importData` functions in `localApi.js`.
- **What I kept, what I changed, and why:** I kept the import and export logic it gave me, but I added a reset function that asks the user whether they want to back up their progress before resetting.
- **Commit:** [`187d1b6`](https://github.com/hrspnd/stardew-perfection-tracker/commit/187d1b6)

### October 4, 2026 - Stardrops that check themselves

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Make the Master Angler and A Complete Collection Stardrops tick automatically.
- **What it gave back:** The `AUTO_STARDROPS` rules in `localApi.js`. Their value is worked out each time the data is read and never stored, so it cannot drift out of step with the Fish and Museum trackers.
- **What I kept, what I changed, and why:** I kept the logic but changed the styling.
- **Commit:** [`ce881e9`](https://github.com/hrspnd/stardew-perfection-tracker/commit/ce881e9)

### October 4, 2026 - Fonts, header sizes and uppercase buttons

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** Pixelify Sans for headers, bigger headers, and all-caps buttons.
- **What it gave back:** Edits to `styles.css`: the font import, `--font-display` set in the three places it is defined, larger heading sizes, and uppercase on the nav pills, sidebar links and menu buttons.
- **What I kept, what I changed, and why:** I kept the font and the uppercase buttons. The 2rem logo title was too wide for the logo block, so it wrapped and pushed "Perfection Tracker" out of the nav bar. I caught it from a screenshot, and the title was changed to 1.65rem with `white-space: nowrap`.
- **Commit:** [`f52fa97`](https://github.com/hrspnd/stardew-perfection-tracker/commit/f52fa97)

## 2. Where the AI got it wrong

### Case 1 - Telling me to copy files when I only needed `cd`

- **What it gave me:** Claude told me to use `cp` to move files when I was trying to get into the project's `client` folder.
- **What was wrong with it:** I had cloned the repository into the top-level folder, so the files were already where I needed them and nothing had to be copied. I only needed to `cd` into `client`. On top of that, `cp` does not exist in Windows cmd, so the command also failed.
- **What I did instead:** I ignored the copy step and ran `cd client`.
- **Commit:** [`8f5aec8`](https://github.com/hrspnd/stardew-perfection-tracker/commit/8f5aec8) (no code was involved, so this is the merge commit from the same session)

### Case 2 - A logo title too big for its box

- **What it gave me:** When I asked for bigger headers, Claude raised the logo title ("Stardew Valley") to 2rem in `styles.css`.
- **What was wrong with it:** The logo block has a fixed width, and at 2rem the title was too wide for it. It wrapped onto two lines and pushed "Perfection Tracker" out of the bottom of the nav bar. Claude scaled the headers up without checking that the logo had room for the new size.
- **What I did instead:** I reduced the title to 1.65rem and set it to `white-space: nowrap`, so it stays on one line and fits.
- **Commit:** [`f52fa97`](https://github.com/hrspnd/stardew-perfection-tracker/commit/f52fa97)

### Case 3 - A mock API that kept old data in `localStorage`

- **What it gave me:** The mock API design Claude gave me copied `seed.json` into the browser's `localStorage` the first time it ran, then always read from that stored copy.
- **What was wrong with it:** Nothing told me about this. When I edited `seed.json`, my changes never appeared, because the app kept using the old saved copy. I only found out when my new data did not show up, and Claude then had to explain why.
- **What I did instead:** While I was testing, I cleared the saved data and reseeded whenever I changed the seed file. I also learned that a version number stored alongside the cache would be a cleaner fix. The app now has a "Reset progress" option that restores the seed data.
- **Commit:** [`1f7be55`](https://github.com/hrspnd/stardew-perfection-tracker/commit/1f7be55)

## 3. Who wrote what

### Written by me

- **File:** `client/src/api/seed.json`
- **Commit:** [`3e879f7`](https://github.com/hrspnd/stardew-perfection-tracker/commit/3e879f7), [`ee70361`](https://github.com/hrspnd/stardew-perfection-tracker/commit/ee70361), [`6a1baa3`](https://github.com/hrspnd/stardew-perfection-tracker/commit/6a1baa3), [`b12886f`](https://github.com/hrspnd/stardew-perfection-tracker/commit/b12886f), [`28ec894`](https://github.com/hrspnd/stardew-perfection-tracker/commit/28ec894), [`9750086`](https://github.com/hrspnd/stardew-perfection-tracker/commit/9750086)
- **What it does and why it is built this way:** This is the starting data for every tracker, with one top-level key per category (shipped, walnuts, fish, bundles, cooking and so on). I researched the game information myself, then had Claude automate the typing of it into the file, so the research is mine and the data entry was shared. Flat lists such as fish and recipes use `{ id, name, checked, columns }`, so one component can show many categories. Grouped categories such as Bundles are nested instead (room, then bundle, then item), because that is how the game organizes them. `localApi.js` copies this file the first time the app runs and whenever progress is reset, so every checkbox starts unticked and the real progress lives in the browser's `localStorage`.

- **File:** `client/src/App.jsx`
- **Commit:** [`f04c592`](https://github.com/hrspnd/stardew-perfection-tracker/commit/f04c592), [`187d1b6`](https://github.com/hrspnd/stardew-perfection-tracker/commit/187d1b6)
- **What it does and why it is built this way:** It sets up the routes, with one `<Route>` per page, all inside one `<Layout>`. Because `Layout` wraps all the routes, the top bar and sidebar stay in place when I move between pages and only the page content changes. Each page loads its own data, so `App.jsx` stays small. In the second commit I added the `/about` route.

- **File:** `client/src/api/index.js`
- **Commit:** [`f04c592`](https://github.com/hrspnd/stardew-perfection-tracker/commit/f04c592), [`6d07e37`](https://github.com/hrspnd/stardew-perfection-tracker/commit/6d07e37)
- **What it does and why it is built this way:** It is the only file the pages import data functions from, and it re-exports them from `localApi.js`. The long comment at the top lists every function and what it returns. I built it this way so that pages never touch storage directly. If I later replace `localStorage` with a real server, only `localApi.js` changes and no page needs editing. In `6d07e37` I pointed it at `localApi.js` when I replaced the mock API.

- **File:** `client/src/pages/About.jsx`
- **Commit:** [`187d1b6`](https://github.com/hrspnd/stardew-perfection-tracker/commit/187d1b6)
- **What it does and why it is built this way:** It is the About page at `/about`. It reuses `TrackerPage` for the page title and panel, so it matches the other pages without any new layout code, and its content sits in its own `about-page` section with a header and a body of paragraphs. The text is placeholder for now, and I still need to add the real information.

### The AI-written part I understand best

- **File:** `client/src/api/localApi.js` (the `AUTO_STARDROPS` rules and `withAutoStardrops`)
- **Commit:** [`ce881e9`](https://github.com/hrspnd/stardew-perfection-tracker/commit/ce881e9)
- **What it does and why we kept it:** Two Stardrops depend on other trackers: Master Angler needs every fish caught, and A Complete Collection needs the whole Museum donated. Instead of saving a tick for them, the app works out their value every time the data is read. So if I untick one fish, Master Angler unticks itself, and the two cannot get out of step with the trackers they depend on. `toggleItem` throws an error if someone tries to toggle them. The Farm Progress page greys out their checkboxes, and `getSummary` counts the worked-out value so the Dashboard percentage matches. We kept it because it gives the data one source of truth instead of two copies that could disagree.