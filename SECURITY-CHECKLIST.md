# Security checklist

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` lists `.env` and `.env.*`. `git ls-files \| grep -i "\.env$"` returned nothing, so no `.env` file is tracked. |
| 2 | A `.env.example` with placeholder values only is committed | Yes | Both `client/.env.example` and `server/.env.example` are committed, with placeholder values like `devpassword` and `localhost` URLs, no real credentials. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | Yes | Searched source for `password`, `secret`, `api_key`, `postgres://`. The only matches are documentation text (e.g. "Never put a key... in one") and the same placeholder values from `.env.example`. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | Yes | Ran `git log -p --all \| grep -i -E "password\|secret\|api_key\|postgres://"`. Every match is either doc text or the committed `.env.example` placeholders, no real secret. |
| 5 | Any credential that was ever committed has been rotated | N/A | No real credential was ever committed, only the placeholder `devpassword` in `.env.example`, so there is nothing to rotate. |
| 6 | Production credentials live only in my hosting provider's environment settings | N/A | There is no deployed backend yet. The app runs client-only on the mock API, so there are no production credentials yet. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | Yes | Read `.github/workflows/deploy-pages.yml`. It only references `${{ vars.VITE_USE_MOCK_API }}` and `${{ vars.VITE_API_BASE_URL }}`, which are repository Variables (public build values), not secrets, and no value is written literally. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | N/A | This workflow uses no secrets at all, only public build-time Variables, since it only builds and deploys the static client. Will apply once server deployment needs real secrets. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | N/A | No secrets are passed into this workflow to leak. It only prints `::notice::` and `::warning::` messages about build readiness and repo visibility. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | Yes | The workflow uploads `client/dist`, the Vite build output, which contains only compiled public JS/CSS/HTML, not `.env` or config files. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | No | The workflow uses `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4` — all pinned to version tags, not commit SHAs. A tag can be moved by the action's publisher; a SHA cannot. Not fixed yet. |
| 12 | Secret scanning and push protection are enabled on the repository | Yes | Confirmed in Settings > Security > Code security and analysis: both Secret scanning and Push protection are turned on. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | N/A | No database or server queries exist yet. The app runs entirely on the mock API against `localStorage`. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | N/A | No database is deployed yet. |
| 15 | The database user the app connects as has only the permissions it needs | N/A | No database is deployed yet. |
| 16 | Seed and sample data is invented, not real people's data | Yes | The seed data is Stardew Valley game content (item names, monster names, profession data), not any real person's data. |
| 17 | Debug, seed and reset routes are removed before going public | N/A | There are no server routes yet, debug or otherwise, since there is no backend. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | N/A | The app is a public, single-player progress tracker with no accounts or private data, and there is no backend yet to gate. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | N/A | Not using Supabase or Firebase. |
| 20 | If Zero Trust: tjakoen.s@gmail.com is on the access policy. If an app password: the credentials are in my private workspace `project/README.md` | N/A | No access gate is in use. |
| 21 | The gate covers every route, including the ones that only change data | N/A | No access gate is in use. |
| 22 | The credentials for the gate are environment variables, not in source | N/A | No access gate is in use. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | Input from the user is validated on the server, not only in the browser | N/A | There is no server yet. All checkbox and dropdown input goes straight to the mock API and `localStorage`. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | Yes | `grep -rn "dangerouslySetInnerHTML" client/src` found no matches. All rendering goes through normal JSX text interpolation, which escapes by default. |
| 25 | Error responses do not expose stack traces, file paths or connection details | N/A | There is no server generating error responses yet. |
| 26 | CORS is not a wildcard on routes that change data | N/A | There is no server or CORS configuration active yet; `CORS_ORIGINS` in `server/.env.example` is a placeholder for when the backend is built. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | Yes | Searched file contents and commit message text for personal info; found none. My own email appears in the standard Git author field on every commit, which is normal public GitHub behavior, not something typed into a file or commit message. Considering switching to GitHub's private noreply email for future commits. |
| 28 | No classmate's personal data in the repository | Yes | Searched commit history and found no other person's email, name, or data. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | Yes | Dependencies are installed via `npm install` from the npm registry. `.gitignore` lists `node_modules/`, and `git ls-files \| grep node_modules` returned nothing. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | N/A | The app currently uses only text data (item names, descriptions), no Stardew Valley game images or sprites yet. This will need a real answer once images are added in a future update. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | Yes | Confirmed in Settings > General > Danger Zone: the repository is Public. This is deliberate, since GitHub Pages only serves public repositories on a free account. |

## Anything I found and fixed

This checklist caught that my GitHub Actions workflow pins third-party actions to version tags (`@v4`, `@v3`) instead of commit SHAs, which I had not thought about before. I have not fixed this yet; the next step is to look up the current commit SHA for each action and pin to that instead. Everything else checked out clean: no real secrets in the repo or its history, `.env` properly ignored, and no personal data beyond my own normal Git author email.
