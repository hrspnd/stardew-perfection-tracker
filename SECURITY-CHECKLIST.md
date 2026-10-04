# Security checklist

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` lists `.env` and `.env.*`. `git ls-files \| grep -i "\.env$"` returned nothing, so no `.env` file is tracked. |
| 2 | A `.env.example` with placeholder values only is committed | Yes | `.env.example` files are committed in the repository root, `client/` and `server/`, with placeholder values only (for example `change-this-to-something-long-and-random` and `user:pass@host...`). No real credentials. The client one is a leftover: the app no longer reads `VITE_USE_MOCK_API`. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | Yes | Re-searched the tracked source with `git grep -i -E "password|secret|api_key|postgres://"`. The only matches are documentation text (for example "Never put a key... in one"), this checklist, and the placeholder values in the `.env.example` files. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | Yes | Re-ran `git log -p --all` and searched added lines for password, secret, api_key and `postgres://`. Every match is documentation text, this checklist, or a placeholder such as `devpassword` in an old README. No real secret in any commit. |
| 5 | Any credential that was ever committed has been rotated | N/A | No real credential was ever committed, only placeholders, so there is nothing to rotate. |
| 6 | Production credentials live only in my hosting provider's environment settings | N/A | There is no back end. The deployed app is client-only and keeps progress in the visitor's own browser, so there are no production credentials. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | Yes | Read `.github/workflows/deploy-pages.yml`. It only references `${{ vars.VITE_USE_MOCK_API }}` and `${{ vars.VITE_API_BASE_URL }}`, which are repository Variables (public build values), not secrets. No value is written literally. The app does not read either variable any more, so they can be removed. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | N/A | This workflow uses no secrets at all, only public build-time Variables, since it only builds and deploys the static client. Will apply once server deployment needs real secrets. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | N/A | No secrets are passed into this workflow to leak. It only prints `::notice::` and `::warning::` messages about build readiness and repo visibility. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | Yes | The workflow uploads `client/dist`, the Vite build output, which contains only compiled public JS/CSS/HTML, not `.env` or config files. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | No | The workflow uses `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4` — all pinned to version tags, not commit SHAs. A tag can be moved by the action's publisher; a SHA cannot. Not fixed yet. |
| 12 | Secret scanning and push protection are enabled on the repository | Yes | Confirmed in Settings > Security > Code security and analysis: both Secret scanning and Push protection are turned on. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | N/A | There is no database or server. The app reads and writes the browser's `localStorage` through `localApi.js`, so there are no queries to parameterize. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | N/A | No database is deployed yet. |
| 15 | The database user the app connects as has only the permissions it needs | N/A | No database is deployed yet. |
| 16 | Seed and sample data is invented, not real people's data | Yes | The seed data (`seed.json`) is Stardew Valley game content: item, fish, monster and villager names and profession data. It contains no real person's data. |
| 17 | Debug, seed and reset routes are removed before going public | N/A | There are no server routes. The only reset is the "Reset progress" button, which clears the visitor's own `localStorage` after a confirmation dialog and affects nobody else. |

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
| 23 | Input from the user is validated on the server, not only in the browser | N/A | There is no server. The one place the app accepts user-supplied data is **Import progress**. `importData` in `localApi.js` rejects text that is not valid JSON, is not an object, has no known category, or has a category of the wrong type (array versus object). It asks for confirmation first, and nothing is sent anywhere. It does not check the shape of each item inside a category, so a hand-edited file could break a page until the visitor uses Reset. The damage is limited to that visitor's own browser. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | Yes | Re-ran `grep -rn "dangerouslySetInnerHTML\|innerHTML\|eval(" client/src` and found no matches. All rendering goes through normal JSX, which escapes text by default, including any text that comes in through an imported file. The external Wiki link uses `rel="noopener noreferrer"`. |
| 25 | Error responses do not expose stack traces, file paths or connection details | N/A | There is no server generating error responses. Errors in the app are short messages from `localApi.js` (such as "That file is not a progress file."), with no paths or stack traces. |
| 26 | CORS is not a wildcard on routes that change data | N/A | There is no server and no CORS configuration. `CORS_ORIGINS` in `server/.env.example` is a placeholder from the course template. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | Yes | Searched tracked files and commit messages for personal details. The only email address in the repository is the instructor's on row 20, which comes from the checklist template, plus a placeholder URL in `server/.env.example`. My name appears in the README author line and `LICENSE`, which is intended. My own email appears only in the standard Git author field, which is normal for public GitHub commits. I am considering GitHub's private noreply address for future commits. |
| 28 | No classmate's personal data in the repository | Yes | Searched the tracked files and commit history and found no other person's email, name or data. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | Yes | Dependencies (`react`, `react-dom`, `react-router-dom`, `vite`, `@vitejs/plugin-react`) come from the npm registry. `node_modules/` is gitignored and `git ls-files | grep -c node_modules` returns 0. `npm audit` reports 0 vulnerabilities. One runtime exception: the Pixelify Sans font is loaded from Google Fonts (`@import` in `styles.css`), so each visitor's browser requests it from Google, which can see their IP address. I accepted this for now, and the fix would be to self-host the font file. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | No | The category icons, the chicken sprite and the background image in `client/src/assets` are Stardew Valley artwork by ConcernedApe, not my own work, and I do not hold a licence for them. This is a free, non-commercial fan project that is not affiliated with the game's creator. I credit the game in the README under "Credits". The screenshots in `docs/assets` are my own captures of my app. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | Yes | Confirmed in Settings > General > Danger Zone: the repository is Public. This is deliberate, since GitHub Pages only serves public repositories on a free account. |

## Anything I found and fixed

Re-running this checklist against the finished app turned up four things. Nothing in the repository or its history is a real secret, `.env` files are properly ignored, `npm audit` reports 0 vulnerabilities, and there is no personal data beyond my own normal Git author email.

1. **Third-party actions are pinned to version tags (row 11).** The workflow uses `@v4` and `@v3` tags instead of commit SHAs. I have not fixed this yet. The next step is to look up the current commit SHA for each action and pin to that, keeping the tag in a comment.
2. **The artwork is not mine (row 30).** The icons, chicken sprite and background are from the game. I added a Credits section to the README saying so. I accepted the remaining risk because the project is non-commercial and a fan tracker, but I do not have permission to reuse the art.
3. **The font loads from Google (row 29).** This is a small privacy cost for every visitor. I accepted it for the look of the headers. The fix would be to self-host the font.
4. **Import checks the file's top level only (row 23).** A damaged file cannot affect anyone else, so I accepted that the visitor can fix it with Reset.