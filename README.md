# Stardew Valley Perfection Tracker

A web app for tracking your progress toward 100% perfection in Stardew Valley — shipped items, walnuts, fish, bundles, recipes, museum donations, friendships, and more, all in one dashboard.

**Live site:** <!-- TODO: https://yourusername.github.io/stardew-perfection-tracker/ -->
**API:** <!-- TODO: https://your-api.onrender.com/healthz -->
**Demo video:** <!-- TODO: link -->

> **This deployment is running in demo mode.** The interface is real; the backend
> is simulated in your browser so the site works without a server. See
> [Demo mode](#demo-mode) below. Delete this quote once your API is live.

![Dashboard screenshot](docs/assets/screenshot.png)
<!-- TODO: swap in a real screenshot once the dashboard is built -->

## What it does

- Track a farmer's perfection progress across categories: Produce & Forage Shipped, Golden Walnuts, Fish Caught, Bundles, Cooking Recipes, Crafting Recipes, Farm Progress (Obelisks, Golden Clock, Stardrops), Monster Slayer, Museum donations, Great Friends (villager hearts), and Farmer Level
- Check off items as completed and see per-category and overall completion %
- Dashboard overview summarizing progress across every category

<!-- TODO: mark which of the above are actually implemented vs. still planned -->

## Built with

React and Vite on the front end, Express and PostgreSQL on the back end. The client is on GitHub Pages, the API on <!-- TODO: host -->, the database on <!-- TODO: host -->.

## Demo mode

This repository can run two ways, chosen by one environment variable at **build** time.

**Demo mode is the default.** Only the exact string `false` turns it off, so a forgotten or mistyped variable leaves you on the simulated backend with a visible notice rather than on a silently broken build.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. This is what the template ships with, so the GitHub Pages link works on day one. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. |

**Demo mode is a starting point and a fallback, not a finished project.** Your finals submission is all three pieces deployed and talking to each other. Demo mode is there so you can build the interface in week one before the API exists, and so you have something to show if a free tier is asleep during your demo.

GitHub Pages serves files and cannot run Node, so the API and the database can never live there. They go somewhere else:

| Piece | Options |
| --- | --- |
| **API** | Render, Railway, Fly.io, Koyeb, a VPS, or self-hosted behind a tunnel |
| **Database** | Neon, Supabase, Railway, Aiven, or your own PostgreSQL |

## Running it yourself

**The client only, in demo mode.** No database needed.

    cd client
    npm install
    cp .env.example .env        # VITE_USE_MOCK_API stays true
    npm run dev                 # http://localhost:5173

**The whole stack.** Needs a PostgreSQL, either local or hosted.

    # 1. the database
    docker run --name stardew-pg -e POSTGRES_PASSWORD=devpassword \
      -e POSTGRES_DB=stardew -p 5432:5432 -d postgres:17

    # 2. the API
    cd server
    npm install
    cp .env.example .env        # check DATABASE_URL
    npm run db:reset            # creates the tables and adds sample rows
    npm run dev                 # http://localhost:3000

    # 3. the client, in another terminal
    cd client
    npm install
    cp .env.example .env
    # set VITE_USE_MOCK_API=false
    npm run dev

Check the API on its own before you blame the client:

    curl http://localhost:3000/healthz     # is the process alive
    curl http://localhost:3000/readyz      # is the database reachable
    curl http://localhost:3000/api/<!-- TODO: your resource, e.g. progress -->

## Environment variables

None of these are committed. `.env.example` in each folder lists them with placeholder values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password |
| `CORS_ORIGINS` | server | comma-separated origins allowed to call the API |
| `NODE_ENV` | server | `production` on your host |
| `PORT` | server | **set by the host**, do not set it yourself |
| `VITE_USE_MOCK_API` | client, at build time | only `false` turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | client, at build time | your API's public URL, no trailing slash |

Every `VITE_` value is compiled into the built JavaScript and is **public**. Never put a key, a password or a connection string in one.

## Deploying

**Client, to GitHub Pages.** Already wired up in `.github/workflows/deploy-pages.yml`. Two one-time steps:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.** Without this the workflow goes green and publishes nothing.
2. Nothing else, until your API is live. Demo mode is the default, so the first deploy works on its own. When the API is up, add `VITE_USE_MOCK_API` = `false` and `VITE_API_BASE_URL` under **Settings > Secrets and variables > Actions > Variables**, then re-run the workflow.

The repository must be **public** for Pages to serve it on a free account.

**API and database.** Not automated here, because most hosts deploy straight from your repository with no workflow at all. Point your host at the `server/` folder, set the environment variables in its dashboard, and run `server/db/schema.sql` once against the hosted database.

## Project structure

    client/
      src/
        api/            ONE interface, two implementations, chosen by a variable
        components/     ListTracker, CardGridTracker, SkillTracker,
                         DashboardSummaryCard, Layout
        pages/          Dashboard, ProduceShipped, GoldenWalnuts, FishCaught,
                         Bundles, CookingRecipes, CraftingRecipes, FarmProgress,
                         MonsterSlayer, Museum, GreatFriends, FarmerLevel
    server/              Express API
      db/                pool, schema.sql, seed.sql, and a runner for them
    compose.yml          only if you self-host
    docs/                planning documents and weekly reports

## Architecture

<!-- TODO: three or four sentences, or a small diagram — which piece talks to which, and where each one is hosted -->

## What I would do next

<!-- TODO: three honest bullets -->

## Author

[<!-- TODO: FILL IN NAME -->](https://github.com/hrspnd) — CS - 402

## Licence

MIT, see [LICENSE](LICENSE). <!-- TODO: put your own name in it -->