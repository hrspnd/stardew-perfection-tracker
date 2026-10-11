# Security and privacy checklist

Work through this **before your first push**, and again before you submit. It is
short, none of it is exotic, and a grader can check most of it in two minutes.

Your repository is public, in your own account, and permanent. That is the point
of it, and it is also why this file exists.

## Before the first push

- [x] `.gitignore` includes `.env`, and `git check-ignore -v .env` confirms it
- [x] `git ls-files | grep -iE '\.env$|\.pem$|id_rsa'` prints nothing
- [x] `.env.example` is committed, with **placeholder** values only
- [x] No connection string, key or password anywhere in the repository, *(screenshots: re-check before submitting)*
      including in a screenshot
- [x] No `student.json`, and no name, student number or email of yours or anyone *(my name is in the README and LICENSE on purpose; my email is only in the Git author field)*
      else's

Deleting a file later does **not** remove it from the history. If you commit a
credential, **rotate it first**, at the service, and clean up the history second.
The rotation is the fix; the cleanup is hygiene.

## The application

- [x] Every SQL query is parameterised. Values go in the array, never into the *(N/A: no back end)*
      string. This is one line of defence you already know how to do
- [x] Input is validated **on the server**, not only in React. Length limits on *(N/A: no server; the Import file is validated in `localApi.js`)*
      every text field
- [x] `cors({ origin: allowedOrigins })` names your origins. Not `cors()` with no *(N/A: no back end)*
      options, which allows every site on the internet
- [x] `NODE_ENV=production` on the host, and no stack trace in any response body *(N/A: no back end)*
- [x] `helmet` installed, which is one line for several real protections *(N/A: no back end)*
- [x] Anything that costs money or accepts a password is rate limited *(N/A: no back end)*
- [x] Passwords, if you have accounts, are hashed with bcrypt and never logged *(N/A: no accounts)*
- [x] Every route that touches somebody's data has the ownership check **in the *(N/A: no back end)*
      query**, as `AND user_id = $2`, not as an `if` above it
- [x] `npm audit` run once, and the easy fixes taken *(0 vulnerabilities)*

```bash
npm install helmet
```

```js
import helmet from 'helmet'
app.use(helmet())
```

## Privacy

The half that matters more, because it is about other people.

- [x] **No real classmates' names, numbers, emails or photos**, anywhere. Not in
      seed data, not in screenshots, not in the demo video. Consent for a course
      project does not cover the next ten years of a public repository
- [x] Seed data is invented. Yours will be read *(it is Stardew Valley game data)*
- [x] If real people tested your app, even three friends, their data is deleted *(N/A: nothing is stored anywhere but each tester's own browser)*
      before you submit
- [x] If your app collects anything about anyone, the app says what it collects *(it collects nothing; progress stays in the visitor's `localStorage`. About page says so)*
- [x] Any face in a screenshot is stock, generated, or yours *(no faces; game art and my own app only)*

If your project handles personal information about real people, you are inside
the Philippine Data Privacy Act. Collect the minimum, say what you collect, and
do not collect anything you cannot justify.

## What to write in your journal

One short paragraph: the riskiest thing about your project from this list, what
you did about it, and what you knowingly accepted. A student who can name the
tradeoff they made scores better than one who claims there was none.

## Journal paragraph

The riskiest thing about my project was not secrets, because there is no back end, but privacy and ownership. My Git author email is public in every commit; I kept it on purpose, to confirm the commits are mine, and I accepted that anyone can see it. Every visitor's browser also requests fonts from Google, which exposes their IP address; I accepted this for the look of the app, and self-hosting the fonts would fix it. The icons and background are Stardew Valley artwork I do not hold a licence for, so I credited ConcernedApe in the README and kept the project non-commercial. Third-party GitHub Actions are pinned to version tags, not commit SHAs, which I knowingly left for now.