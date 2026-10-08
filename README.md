# Stardew Valley Perfection Tracker

[![Made with AI](https://img.shields.io/badge/Made_with-AI_assistance-blue)](AI-USAGE.md)

**Live site:** [https://hrspnd.github.io/stardew-perfection-tracker/](https://hrspnd.github.io/stardew-perfection-tracker/)
**Demo video:** [Demo Video](https://drive.google.com/drive/u/2/folders/1c0oyCHUA_G5HzJot7bC9TwC1keuajAE1)

> **No server and no login.** Everything runs in your browser, and your progress is saved in your browser's `localStorage`. Use the menu in the top bar to export a backup file.

## 1. Overview

A web app for Stardew Valley players going for 100% perfection. It tracks your progress across shipped items, golden walnuts, fish, bundles, recipes, museum donations, friendships, skills, and more, and shows it all on one dashboard so you can see what is left.

It is built with React and Vite, with `react-router-dom` for the pages and plain CSS for styling. There is no back end. A small module, `client/src/api/localApi.js`, plays the part of one: it reads and writes your progress in `localStorage`, starting from the game data in `seed.json`. Pages only talk to that module through `client/src/api/index.js`, so the storage could be swapped for a real server later without changing any page.

## 2. Setup and installation

### Install first

- Node.js 22 and npm
- Git

### Get the code

    git clone https://github.com/hrspnd/stardew-perfection-tracker.git
    cd stardew-perfection-tracker

### Install dependencies

    cd client
    npm install

No environment variables are needed. The app runs entirely in the browser.

### Starting data

Starting data comes from `client/src/api/seed.json`, a file of Stardew Valley information that I researched myself. It is loaded into your browser's `localStorage` the first time the app runs. After that, your own checkmarks are stored there and the seed file is only used again if you reset your progress.

## 3. How to run it

    cd client
    npm run dev

Open **http://localhost:5173**. You should see the Dashboard, which shows an overall completion percentage and one progress ring per category.

To build and preview the production version:

    npm run build
    npm run preview

## 4. Features and usage

**What works**

- A **Dashboard** with a **Total Perfection** percentage and one progress ring per category. Each ring links to that category's page. Obelisks, the Golden Clock, and Stardrops are combined into one Farm Progress ring.
- **11 tracker pages:** Produce & Forage Shipped, Golden Walnuts, Fish Caught, Bundles, Cooking Recipes, Crafting Recipes, Farm Progress, Monster Slayer, Museum, Great Friends, and Farmer Skills, all filled with the real game lists.
- Check items off on any page. Checked items fade, and the Dashboard percentages update. Progress is saved in your browser automatically.
- **Fish** are sorted into Year-Round, Seasonal, Night Market, and Crab Pot cards, with location, time, and weather under each fish.
- **Bundles** are grouped by Community Center room, with each bundle's reward and how many items it needs.
- **Museum** donations are split into Artifacts and Minerals.
- **Great Friends** shows the universal loves and likes once above the villager cards.
- **Farmer Skills** uses the real profession data: tick each level and pick a profession. Your level 5 choice decides which level 10 options you get.
- **Self-checking Stardrops.** Master Angler checks itself when every fish is caught, and A Complete Collection checks itself when the whole Museum is donated.
- **Progress menu** (the hamburger button in the top bar): **Export** your progress to a JSON file, **Import** it back (on another browser or device), or **Reset** everything. Reset asks first and offers a backup download.

**How to use it.** Open the Dashboard to see your progress, then pick a category from the sidebar. Check off items as you complete them. Because there are no accounts, use Export to back up your progress before you clear your browser data.

**The data layer.** Pages never touch storage directly. They call these functions from `client/src/api/index.js`:

| Function | What it does |
| --- | --- |
| `listCategory` | returns the stored data for one category |
| `getSummary` | computes completion totals for the Dashboard |
| `toggleItem` | checks or unchecks one item in a flat list |
| `toggleGroupedItem` | checks or unchecks an item in a group (Shipped, Golden Walnuts) |
| `toggleBundleItem` | checks or unchecks an item in a bundle (room, then bundle, then item) |
| `toggleSkillLevel` | checks or unchecks a skill level (Farmer Skills) |
| `setSkillProfession` | sets the chosen profession for a skill (Farmer Skills) |
| `exportData` | returns all saved progress as a JSON string |
| `importData` | replaces saved progress with an exported file |
| `resetData` | erases saved progress and restores the starting data |

Every function is async and waits about a quarter of a second, like a real network request, so each page has a loading state.

## 5. Project structure

    client/
      src/
        api/            index.js (the one interface pages import from),
                         localApi.js (reads and writes localStorage),
                         and seed.json (the starting data)
        components/     Layout, DataMenu, TrackerPage, GroupedChecklist,
                         ListTracker, CardGridTracker, SkillTracker,
                         DashboardSummaryCard (also exports ProgressRing)
        pages/          Dashboard, ProduceShipped, GoldenWalnuts, FishCaught,
                         Bundles, CookingRecipes, CraftingRecipes, FarmProgress,
                         MonsterSlayer, Museum, GreatFriends, FarmerLevel, About
        assets/         icons and background images
        App.jsx         the routes
        styles.css      all of the styling
    server/              the class template's starter Express API.
                         It is not used by this app.
    docs/                planning documents, weekly reports, and screenshots
      assets/            screenshots used in this README

**How the pieces fit.** `App.jsx` puts every page inside `Layout`, which provides the top bar and sidebar. Each page loads its data through `api/index.js`, then hands it to one of four shared layouts: `GroupedChecklist`, `ListTracker`, `CardGridTracker`, or `SkillTracker`. That is how 11 trackers share four components.

## 6. Screenshots

![Dashboard](docs/assets/dashboard.png)
*The Dashboard with completion percentages per category.*

![Bundles](docs/assets/bundles.png)
*Bundles, grouped by room.*

![Produce & Forage Shipped](docs/assets/produce-shipped.png)
*Produce & Forage Shipped.*

![Monster Slayer](docs/assets/monster-slayer.png)
*Monster Slayer.*

![Cooking Recipes](docs/assets/cooking-recipes.png)
*Cooking Recipes.*

## 7. Known issues and next steps

**Known issues**

- Progress lives in one browser. It is not shared between devices, and clearing your browser data erases it. Use **Export progress** to keep a backup.
- There is no back end, so there are no accounts and no syncing.
- Individual items do not have their own sprites yet. Only the categories have icons.
- If you edit `seed.json` and the app still shows old data, use **Reset progress** in the menu, or clear the site's `localStorage` (browser DevTools, Application tab, Local Storage), and reload. The app keeps its own saved copy of the data.

**Next steps**

1. Add sprites for individual items.
2. Add search and filters, and check the layout on small screens.
3. Optionally, add a real back end and accounts so progress can sync between devices.

## Deploying

**Client, to GitHub Pages.** Already wired up in `.github/workflows/deploy-pages.yml`. One setup step:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.** Without this the workflow goes green and publishes nothing.

The workflow sets the site's base path automatically, and `App.jsx` passes it to the router as its `basename`, so the pages work from the repository subfolder. No variables or secrets are needed, because the app has no back end. The repository must be **public** for Pages to serve it on a free account.

## AI usage

Built with AI assistance from Claude (Anthropic). I used it heavily for the page layouts, shared components, and styling, and I researched the game data and wrote the routing and the API entry point myself. See [AI-USAGE.md](AI-USAGE.md) for the full record, including where the AI got things wrong.

## Security checklist

See [SECURITY-CHECKLIST.md](SECURITY-CHECKLIST.md).

## Author

[Pineda, Mary Alexa Ysabelle V.](https://github.com/hrspnd) — CS - 404

## Credits

Stardew Valley and its artwork are by ConcernedApe. The category icons, chicken sprite, and background in `client/src/assets` come from the game and are used here in a free, non-commercial fan project that is not affiliated with or endorsed by ConcernedApe. The headers use the Pixelify Sans font from Google Fonts.

## Licence

MIT, see [LICENSE](LICENSE).