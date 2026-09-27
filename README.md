# Stardew Valley Perfection Tracker

**Live site:** <!-- TODO: https://yourusername.github.io/stardew-perfection-tracker/ -->
**API:** <!-- TODO: https://your-api.onrender.com/healthz -->
**Demo video:** <!-- TODO: link -->

> **This deployment is running in demo mode.** The interface is real; the backend
> is simulated in your browser so the site works without a server. See
> [Demo mode](#demo-mode) under Setup.

## 1. Overview

A web app for Stardew Valley players going for 100% perfection. It tracks your progress across shipped items, walnuts, fish, bundles, recipes, museum donations, friendships, and more, and shows it all on one dashboard so you can see what is left.

It is built with React and Vite on the front end. An Express and PostgreSQL back end is planned but not connected yet, so the app currently runs entirely on a mock API in the browser.

## 2. Setup and installation

### Install first

- Node.js 22 and npm
- Git
- Docker and PostgreSQL are only needed for the full stack, which is not working yet

### Get the code

    git clone https://github.com/hrspnd/stardew-perfection-tracker.git
    cd stardew-perfection-tracker

### Install dependencies and configure

This is all you need for demo mode:

    cd client
    npm install
    cp .env.example .env        # VITE_USE_MOCK_API stays true

On Windows cmd, `cp` does not exist. Use `copy .env.example .env`, or run the commands in Git Bash.

### Environment variables

None of these are committed. `.env.example` in each folder lists them with placeholder values.

| Name | Where | What it is | Example |
| --- | --- | --- | --- |
| `VITE_USE_MOCK_API` | client, at build time | only `false` turns demo mode off; unset means on | `true` |
| `VITE_API_BASE_URL` | client, at build time | your API's public URL, no trailing slash. Not needed in demo mode | `https://your-api.example.com` |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password. Not used yet | `postgres://user:password@localhost:5432/stardew` |
| `CORS_ORIGINS` | server | comma-separated origins allowed to call the API. Not used yet | `http://localhost:5173` |
| `NODE_ENV` | server | `production` on your host | `development` |
| `PORT` | server | set by the host, do not set it yourself | |

Every `VITE_` value is compiled into the built JavaScript and is **public**. Never put a key, a password or a connection string in one.

### Demo mode

The client can run two ways, chosen by `VITE_USE_MOCK_API` at **build** time. Demo mode is the default, and only the exact string `false` turns it off.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`, seeded from the seed file on first load. No server, no database, nothing shared between visitors. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes PostgreSQL. **Not working yet.** |

### Database and seed data

Demo mode needs no database. Starting data comes from `client/src/api/seed.json` and is loaded into your browser's `localStorage` the first time the app runs.

The PostgreSQL scripts are in `server/db/` (`schema.sql`, `seed.sql`), but the client does not use them yet.

## 3. How to run it

    cd client
    npm run dev

Open **http://localhost:5173**. You should see the Dashboard, which lists your completion percentage for each category, with a demo-mode notice. The app now has basic CSS styling, though it is not polished yet.

## 4. Features and usage

**What works now (in demo mode)**

- A **Dashboard** with real completion percentages computed for each category. Obelisks, Golden Clock, and Stardrops are combined into one Farm Progress summary.
- 11 tracker pages: Produce & Forage Shipped, Golden Walnuts, Fish Caught, Bundles, Cooking Recipes, Crafting Recipes, Farm Progress, Monster Slayer, Museum, Great Friends, and Farmer Level.
- Check items off on any page. Your progress is saved in your browser's `localStorage`.
- **Farmer Level** uses real Stardew Valley profession data: tick each skill level and choose a profession, with the level 5 choice deciding which level 10 options you get.

[CHECK: does the Dashboard also show one overall percentage? If so, add it to the first bullet.]

**How to use it.** Open the Dashboard to see your progress, then open a category from the navigation. Check off items as you complete them, and the Dashboard percentages update.

**Not done yet.** Bundles, Produce & Forage Shipped, Monster Slayer, and Cooking Recipes now have real data. The other 7 categories still have only 2-3 placeholder items, not the full game lists. See [Known issues and next steps](#7-known-issues-and-next-steps).

**API.** There are no HTTP endpoints yet. The client talks to a mock API module in `client/src/api/` that exposes these functions:

| Function | What it does |
| --- | --- |
| `listCategory` | returns all items in a category |
| `toggleItem` | checks or unchecks one item |
| `toggleSkillLevel` | checks or unchecks a skill level (Farmer Level) |
| `setSkillProfession` | sets the chosen profession for a skill level (Farmer Level) |
| `getSummary` | computes completion percentages for the Dashboard |

## 5. Project structure

    client/
      src/
        api/            index.js (the one interface), mockApi.js, httpApi.js,
                         and seed.json (the starting data)
        components/     ListTracker, CardGridTracker, SkillTracker,
                         DashboardSummaryCard, Layout, DemoNotice, ProgressCard,
                         VillagerTracker
        pages/          Dashboard, ProduceShipped, GoldenWalnuts, FishCaught,
                         Bundles, CookingRecipes, CraftingRecipes, FarmProgress,
                         MonsterSlayer, Museum, GreatFriends, FarmerLevel
    server/              Express API (not connected yet)
      db/                pool, schema.sql, seed.sql, and a runner for them
    docs/                planning documents, weekly reports, and screenshots
      assets/            screenshots used in this README

**How the pieces fit.** The React client reads and writes a mock API that stores data in the browser's `localStorage`. The plan is for the client to call an Express API, which reads and writes a PostgreSQL database, with each piece hosted separately.

## 6. Screenshots

![Dashboard](docs/assets/dashboard.png)
*The Dashboard with completion percentages per category.*

![Bundles](docs/assets/bundles.png)
*Bundles with real data and basic styling.*

![Produce & Forage Shipped](docs/assets/produce-shipped.png)
*Produce & Forage Shipped with real data and basic styling.*

![Monster Slayer](docs/assets/monster-slayer.png)
*Monster Slayer with real data and basic styling.*

![Cooking Recipes](docs/assets/cooking-recipes.png)
*Cooking Recipes with real data and basic styling.*

## 7. Known issues and next steps

**Known issues**

- 4 of the 11 categories (Bundles, Produce & Forage Shipped, Monster Slayer, Cooking Recipes) now have real data. The other 7 still have only 2-3 placeholder items instead of the full game lists.
- Basic CSS styling exists, but it is not polished yet.
- There is no working backend. The app runs only on the mock API, so progress lives in one browser and is not shared.
- No game images or sprites are used yet, only text data.
- If you edit `seed.json` and the app still shows old data, clear the site's `localStorage` (browser DevTools, Application tab, Local Storage) and reload. The mock API keeps its own cached copy.

**Next steps**

1. Connect the client to the Express and PostgreSQL back end, deploy it, and turn demo mode off.
2. Fill in the full Stardew Valley data for the remaining 7 categories.
3. Continue polishing the styling.

## Deploying

**Client, to GitHub Pages.** Already wired up in `.github/workflows/deploy-pages.yml`. One setup step:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.** Without this the workflow goes green and publishes nothing.

Demo mode is the default, so the first deploy works on its own. When the API is live, add `VITE_USE_MOCK_API` = `false` and `VITE_API_BASE_URL` under **Settings > Secrets and variables > Actions > Variables**, then re-run the workflow. The repository must be **public** for Pages to serve it on a free account.

**API and database.** Not automated. Point your host at the `server/` folder, set the environment variables in its dashboard, and run `server/db/schema.sql` once against the hosted database.

## AI usage

Built with AI assistance from Claude (Anthropic). See [AI-USAGE.md](AI-USAGE.md) for details.

## Author

[Pineda, Mary Alexa Ysabelle V.](https://github.com/hrspnd) — CS - 402

## Licence

MIT, see [LICENSE](LICENSE). <!-- TODO: put your own name in LICENSE -->