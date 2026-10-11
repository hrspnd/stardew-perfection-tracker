# Design system

The rules the Stardew Perfection Tracker interface follows, written down so that
screen four looks like screen one.

**Visual design system (PDF, 11 pages):** [03-design-system.pdf](assets/03-design-system.pdf)

The PDF holds the swatches, type samples and component states. This file records
the values in text, says where they live in the code, and is honest about what is
built and what is still proposed.

## Colour

Every colour, its hex value, and the name used in `client/src/styles.css`.
Swatches are on pages 2 and 3 of the PDF.

**Surfaces and text**

| Name in code | Hex | Used for |
| --- | --- | --- |
| `--cream` (layout) | `#fdf6e3` | Nav pills, menus, dashboard cards, about card |
| `--cream` (tracker) | `#f6ecd0` | Checklist, list and skill cards |
| `--cream-hover` | `#ffecb8` | Hover and focus background on pills, items, cards |
| unnamed | `#fffaf0` | Checkbox, select and dialog-button fill |
| `--ink` | `#4a2a14` | All body and heading text on cream |
| `--card-head` | `#bf7d52` | Brown header band on every card |
| `--cream-edge` | `#c9a96b` | Pill, menu and dialog borders |
| `--nav-bg` | `#0b4a8f` | Top bar |
| `--nav-edge` | `#2b1a12` | Top bar bottom border, logo shadow |
| `--side-bg` | `rgba(10, 45, 90, 0.82)` | Sidebar (solid `#0a2d5a` under 800px) |
| `--panel` | `rgba(70, 90, 110, 0.85)` | Translucent panel behind cards |
| unnamed | `#1c5fa8` | Page background colour under the image |

**Accents and state colours**

| Name in code | Hex | Used for |
| --- | --- | --- |
| `--gold` | `#e3a43a` | Active pill, focus outline, logo text, 100% ring |
| unnamed | `#b9782a` | Border on the active pill |
| `--green` | `#4f8a35` | Progress ring fill |
| `--track` | `#ddd6c6` | Progress ring track, icon placeholder |
| `--box-edge` | `#b8a688` | Unchecked checkbox border |
| `--box-checked` | `#8d8573` | Checked checkbox fill and border |
| `--skill-edge` | `#5a3720` | Skill checkbox and select outline |
| unnamed | `#8a6a4a` | Italic notes on Farm Progress cards |
| unnamed | `#9b2c1d` | Danger text, danger button fill, error border |
| unnamed | `#6e1d12` | Error text, danger button border |
| unnamed | `#f6d9d3` | Error banner and danger hover background |

**Contrast (WCAG AA).** Normal text needs 4.5:1, large text 3:1. Every pair below
passes (page 4 of the PDF).

| Pair | Ratio | Needs |
| --- | --- | --- |
| Ink on cream (layout) | 11.9 : 1 | 4.5 |
| Ink on cream (tracker) | 10.9 : 1 | 4.5 |
| Ink on gold (active pill) | 5.9 : 1 | 4.5 |
| Ink on hover cream | 11.0 : 1 | 4.5 |
| Cream on nav blue | 8.1 : 1 | 4.5 |
| Gold on nav blue (logo, 26px) | 4.0 : 1 | 3 (large text) |
| Error text on error tint | 8.5 : 1 | 4.5 |
| Danger text on cream | 7.0 : 1 | 4.5 |
| White on danger button | 7.6 : 1 | 4.5 |
| Ink on card header (1.75rem titles) | 3.8 : 1 | 3 (large text) |

## Type

Two families, both from Google Fonts (page 5 of the PDF).

- **Pixelify Sans** (`--font-display`, weights 400 to 700): titles, labels, pills,
  buttons. Fallback `system-ui, sans-serif`.
- **Nunito** (`--font-body`, weights 400 to 800): descriptions and details.
  Fallback `system-ui, sans-serif`.

| Size name | Size | Used for |
| --- | --- | --- |
| title | 3.2rem (2.2rem under 600px) | Page and dashboard titles |
| heading | 1.75rem (1.4rem under 600px) | Card headers |
| label | 1.05rem | Item names, pills, buttons |
| body | 0.95rem | Descriptions, details |
| small | 0.85rem | Counts, notes |

## Spacing, radius and layout

One spacing scale, in rem (page 6 of the PDF): **0.25, 0.5, 0.75, 1, 1.5, 2**.

| Radius | Used for |
| --- | --- |
| 1.5rem | Cards, panels |
| 1rem | Menus, banners |
| 0.5rem | Inputs |
| 0.3rem | Checkboxes |
| 999px | Pills |

- Borders: 3px on every interactive control, 8px bottom border on the top nav.
- Top nav is 5.5rem tall (4rem on mobile). Sidebar is 250px wide (210px under 1000px).
- Gap between cards: 1.75rem, to be named `--space-card-gap`.
- **Known gap:** the code still has off-scale values (0.15, 0.2, 0.35, 0.55, 0.6,
  0.9, 1.25, 1.75, 2.5 rem). The plan is to round most of them to the scale.
- **Breakpoints in use (px):** 380, 560, 600, 700, 800, 900, 1000, 1200, 1300, 1600.
  The plan is to consolidate them.

## Components

Normal, hover, focus, disabled and loading for each reusable piece are shown on
pages 7 to 9 of the PDF.

- **Nav pill, sidebar link, active pill, menu item, danger menu item, danger
  button.** Hover and focus both switch to the hover cream. The focus ring is 3px
  with a 2px offset, cream on the blue top bar and gold everywhere else. Focus
  states are defined for every interactive element, and no outline is removed
  without a replacement.
- **Checkbox, skill checkbox (2.25rem), checklist row.** Hover only changes the
  cursor to a pointer. A checked row fades its label to 45% opacity and the box
  stays solid, so the state is still clear. Self-checking rows (Master Angler,
  A Complete Collection) use a disabled, checked box with a default cursor.
- **Select.** Same outline as the skill checkbox. It has a disabled style.
- **Summary card (dashboard).** Hover and focus use the hover cream. The progress
  ring fills green and turns gold at 100%. It animates for 0.4s and does not
  animate if the user prefers reduced motion.
- **Error banner.** Danger tint with danger-dark text, `role="alert"`. Dismiss
  goes to `#fde8e3` on hover and gets a gold focus ring.
- **Dialog (reset confirmation).** Backdrop `rgba(10, 25, 45, 0.6)` with Cancel
  and Reset buttons.
- **Disabled and loading for buttons and links:** not defined in the stylesheet.
  Disabled is only styled on the checkbox, the select and the self-checking rows.

## States

Four different screens, decided once (page 10 of the PDF).

| State | Status | What it looks like |
| --- | --- | --- |
| Data | Built | Cream card on the translucent panel, brown header, checkbox rows |
| Loading | Plain text only | Today a page shows "Loading...". **Proposed:** the same card with 3 or 4 faded skeleton rows, with `aria-busy="true"` on the panel |
| Empty | Proposed, not built | Centred display-font message and one line of body text saying what to do next ("Nothing here yet") |
| Error | Partly built | Error banner above the data when a save fails. The data stays on screen. A full failed-load screen is not defined |

## In code

All tokens are CSS custom properties in `client/src/styles.css`. There is no
Tailwind config, theme object or component library.

**What the file does today.** Tokens are declared per block (`.layout`,
`.tracker-page`, `.dashboard`), not on `:root`, so the font variables are
repeated three times. Breakpoints are `@media` queries scattered through the file.

**Target.** A single `:root` block. This is the proposed target, not what the
file has today.

```css
:root {
  --cream-light: #fdf6e3; /* nav, dashboard */
  --cream-card: #f6ecd0;  /* tracker cards */
  --cream-hover: #ffecb8;
  --field: #fffaf0;
  --ink: #4a2a14;
  --card-head: #bf7d52;
  --gold: #e3a43a;
  --green: #4f8a35;
  --track: #ddd6c6;
  --danger: #9b2c1d;
  --danger-dark: #6e1d12;
  --danger-tint: #f6d9d3;

  --font-display: 'Pixelify Sans', system-ui, sans-serif;
  --font-body: 'Nunito', system-ui, sans-serif;
  --space-card-gap: 1.75rem;
}
```

**Why plain CSS variables.** The app is small, has one theme and needs no build
tooling. Custom properties cascade, so a block can override a token locally.