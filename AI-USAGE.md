# AI usage

This project was built with AI assistance. This file is the record of it. I am adding to it as I go, one entry per real use.

## 1. How I used AI

### September 22-23, 2026 - Rebuilding the API around my data

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** how to replace the template's sample "sightings" API with one that fits my Stardew Valley categories instead of one flat resource.
- **What it gave back:** a category-based mock API design with `listCategory` and `toggleItem`.
- **What I kept, what I changed, and why:** [ADD]
- **Commit:** `f04c592` ("wire up mock API, routing, and first page"), `eb92f12` ("wire up mock API, routing, and first tracker")

### September 23, 2026 - Reusable page components

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** help structuring the three layout patterns from my wireframes as reusable components.
- **What it gave back:** the `ListTracker`, `CardGridTracker`, and `SkillTracker` component structure.
- **What I kept, what I changed, and why:** [ADD]
- **Commit:** `1f7be55` ("complete all 11 pages with test data")

### September 23, 2026 - Windows command and git merge conflict help

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** why `cp` failed in Windows cmd, and how to resolve a merge conflict in `README.md` on push.
- **What it gave back:** use `copy` or Git Bash instead of `cp`, and how to resolve the conflict by hand.
- **What I kept, what I changed, and why:** [ADD]
- **Commit:** `8f5aec8` ("Merge branch 'main'")

### September 23, 2026 - Stale `localStorage` data after editing the seed file

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** why my updated seed file data was not showing up in the app.
- **What it gave back:** the explanation that the mock API was reading old data cached in `localStorage`.
- **What I kept, what I changed, and why:** I wipe the cache and reseed whenever I change the seed file, because I am still testing. The other option I learned about was storing a version number alongside the cache. [ADD: anything else you changed]
- **Commit:** `1f7be55` ("complete all 11 pages with test data")

### September 23, 2026 - Farmer Level data and functions

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** how to model Farmer Level's checkbox-plus-dropdown structure, and the real Stardew Valley profession data.
- **What it gave back:** `toggleSkillLevel` and `setSkillProfession`, plus profession names, effects, and level 5 to level 10 branching.
- **What I kept, what I changed, and why:** [ADD: how I checked the profession data against the game]
- **Commit:** `1f7be55` ("complete all 11 pages with test data")

### September 22-23, 2026 - Week 1 report, journal, and README

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** help turning my notes into the report and journal templates and updating the README.
- **What it gave back:** drafts of `REPORT.md`, `journal/week-1.md`, and the README.
- **What I kept, what I changed, and why:** [ADD: what I edited so it is in my own words]
- **Commit:** `1bf4b58` ("Revise README for Stardew Valley Perfection Tracker"), `c5307ed` / `6598534` ("Update README.md"), `3891718` ("Create README.md for assets documentation")

### September 27, 2026 - Deciding category data fields and entering real data

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** help figuring out what fields each category needed and turning that into real seed data for Bundles, Produce Shipped, Monster Slayer, and Cooking Recipes.
- **What it gave back:** guidance on the data-entry process; I looked up and entered the actual Stardew Valley data myself.
- **What I kept, what I changed, and why:** [ADD]
- **Commit:** `3e879f7`, `6a1baa3`, `ee70361`

### September 27, 2026 - Second merge conflict and week 2 docs

- **Tool:** Claude (Anthropic), in chat
- **What I asked for:** help resolving a merge conflict on `docs/assets`, and help writing week 2's `REPORT.md`, `journal/week-2.md`, `SECURITY-CHECKLIST.md`, and README updates from my real commit history.
- **What it gave back:** the conflict-resolution steps, plus drafts of all four files, which I reviewed and corrected against my actual repo.
- **What I kept, what I changed, and why:** [ADD]
- **Commit:** `c1262ed` (merge conflict), `55dd1f2` (styling), `c075160` (README update), `800aba8` (screenshots), `42fa6f1` (SECURITY-CHECKLIST.md)

## 2. Where the AI got it wrong

### Case 1 - [ADD: short title]

- **What it gave me:** [ADD]
- **What was wrong with it:** [ADD]
- **What I did instead:** [ADD]
- **Commit:** [ADD]

### Case 2 - [ADD: short title]

- **What it gave me:** [ADD]
- **What was wrong with it:** [ADD]
- **What I did instead:** [ADD]
- **Commit:** [ADD]

### Case 3 - [ADD: short title]

- **What it gave me:** [ADD]
- **What was wrong with it:** [ADD]
- **What I did instead:** [ADD]
- **Commit:** [ADD]

## 3. Who wrote what

### Written by me

- **File:** [ADD]
- **Commit:** [ADD]
- **What it does and why it is built this way:** [ADD]

### The AI-written part I understand best

- **File:** [ADD]
- **Commit:** [ADD]
- **What it does and why we kept it:** [ADD]
