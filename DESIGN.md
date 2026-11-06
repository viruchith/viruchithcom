---
name: viruchith.com
description: Dual-theme manual-page portfolio and engineering publication for a backend engineer.
colors:
  paper: "#fafaf8"
  raised: "#ffffff"
  ink: "#111111"
  ink-body: "#262626"
  muted: "#5c5c5c"
  faint: "#6f6f6f"
  rule: "#e5e5e1"
  rule-strong: "#cfcfca"
  accent: "#1f45c9"
  accent-wash: "#e6ecfb"
  paper-dark: "#0a0a0b"
  raised-dark: "#141416"
  ink-dark: "#f0f0ee"
  ink-body-dark: "#d6d6d3"
  muted-dark: "#a1a1a0"
  faint-dark: "#8b8b8a"
  rule-dark: "#242427"
  rule-strong-dark: "#38383d"
  accent-dark: "#8ba5ff"
  accent-wash-dark: "#18213f"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.35rem + 2.6vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.875rem
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.5rem
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625rem
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.25rem
    letterSpacing: "normal"
rounded:
  DEFAULT: "2px"
  sm: "2px"
spacing:
  unit: "4px"
  gutter-mobile: "1.25rem"
  gutter-sm: "1.5rem"
  gutter-md: "2rem"
  gutter-lg: "2.5rem"
  section-y: "3rem"
  section-y-md: "4rem"
  header-bar: "3.5rem"
  header-subnav: "2.5rem"
  page-max: "75rem"
  measure: "56ch"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 1rem"
    height: "2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 1rem"
    height: "2.5rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 1rem"
    height: "2.5rem"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 1rem"
    height: "2.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 0.5rem"
    height: "2.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 0.5rem"
    height: "2.5rem"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.DEFAULT}"
    padding: "1px 0.375rem"
  link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 0.625rem"
    height: "2rem"
  search-field:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 0.75rem"
    height: "3rem"
---

# Design System: viruchith.com

## Overview

**Creative North Star: "The Manual Page"**

The site reads like a well-set Unix man page translated into a modern portfolio: a sticky running header with a `VIRUCHITH` wordmark, hanging-indent sections, a synopsis that states usage before prose, and an articles list placed with the primary evidence rather than at the end of the page. Proportional Schibsted Grotesk carries display and reading; JetBrains Mono is reserved for code, dates, figures, identifiers, and the wordmark. Light and dark are first-class peers—each theme is tuned independently and remembered—rather than a dark-only skin.

Personality is precise, dense, and evidence-led. Structure comes from hairline rules and a 12-column hanging grid, not from cards or panels. Interaction grammar is inversion: ink and paper swap for hover, selected, pressed, and current states. Depth is overlap and tone, never shadow. Rejected directions: the prior Lit Control Room (Inter/Manrope, cyan glow, pill CTAs, glass panels), decorative gradients, inset hero imagery, and marketing card grids.

**Key Characteristics:**
- Dual light/dark paper–ink system with one blue accent for underlines, focus, and washes.
- Schibsted Grotesk for UI and prose; JetBrains Mono for identifiers, dates, figures, and the man-page wordmark.
- Squared 2px corners everywhere; no pills, no soft card radii.
- Hanging-indent sections (3/9 on md+) joined by full-width hairline rules.
- Signature interaction: cross-reference trail—claim links invert on hover/focus and name their target in the running header.

## Colors

A restrained paper–ink palette with one blue accent. Light defaults are cool off-white paper and near-black ink; dark flips to near-black paper and warm off-white ink. Accent is cobalt in light and soft periwinkle in dark.

### Primary
- **Manual Blue** (`accent`): Underlines on links and cross-references, focus-visible rings, caret color, and search highlight wash pairing. Keep it scarce—structure and inversion do the rest.
- **Accent Wash** (`accent-wash`): Search `<mark>` background and other soft emphasis tied to the accent.

### Neutral
- **Paper** (`paper`): Page and sticky header background.
- **Raised** (`raised`): Code frames, search field fill, share menus—surfaces that sit slightly above paper.
- **Ink** (`ink`): Headings, primary buttons, inversion fills, selection background.
- **Ink Body** (`ink-body`): Default reading text.
- **Muted** (`muted`): Secondary copy, nav defaults, badge text.
- **Faint** (`faint`): Row labels, mono dates, anchors, placeholders.
- **Rule** / **Rule Strong** (`rule`, `rule-strong`): Hairline dividers; strong for search borders, share panels, and blockquote rules.

### Named Rules
**The Paper–Ink Rule.** Light and dark are paired themes that flip the same roles. Never invent a third surface ladder or a dark-only accent language.

**The Accent Scarcity Rule.** Accent marks underlines, focus, and washes only. Primary actions use ink fills, not accent fills.

## Typography

**Display Font:** Schibsted Grotesk (ui-sans-serif, system-ui, sans-serif)
**Body Font:** Schibsted Grotesk (same family)
**Label/Mono Font:** JetBrains Mono (ui-monospace, SFMono-Regular, Menlo, monospace)

**Character:** One proportional grotesque for the whole reading surface, with mono reserved for man-page identifiers—wordmark, dates, figures, row labels, code, and anchors. Display is semibold and tightly tracked, never black-weight display posters.

### Hierarchy
- **Display** (600, `clamp(1.875rem, 1.35rem + 2.6vw, 3.5rem)`, 1.08, −0.032em): Home name line only; muted clause continues in the same size.
- **Page** (600, `clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)`, 1.05, −0.035em): Default page H1 via the Heading primitive.
- **Headline / Section** (600, 1.5rem / 1.875rem, −0.02em): Section titles in the hanging left column and contact lead lines.
- **Title** (600, 1.0625rem / 1.5rem, −0.005em): Role, project, and article titles; article prose base size also uses this step at 1.75 line-height.
- **Lead** (400, 1.125rem / 1.75rem): Synopsis and short offers.
- **Body** (400, 1rem / 1.625rem): Running prose. Article lines are capped at 56ch, about 70 characters in this face, because `ch` is the width of “0”.
- **Small** (400, 0.875rem / 1.375rem): Supporting meta and button labels.
- **Label Mono** (400, 0.8125rem / 1.25rem): Row labels, ISO dates, `#anchor` ids, footer chrome, inline email mono.

### Named Rules
**The Mono Discipline Rule.** Monospace is for identifiers and evidence—wordmark, dates, figures, code, anchors—not for marketing eyebrows or uppercase tracking strips.

**The Semibold Ceiling Rule.** Headings top out at weight 600. Do not reintroduce 700–800 display posters from the prior world.

## Layout

A single centred column (`max-w-page` 75rem) with stepped horizontal gutters: 1.25rem → 1.5rem (sm) → 2rem (md) → 2.5rem (lg). Sections use `py-12 md:py-16` and a top hairline. From `md` up, content sits in a 12-column hanging-indent grid: labels/titles in 3 columns, body in 9, with `gap-x-8`. Experience and education dates occupy a 2/7 mono column at `lg`. Article measure is capped at 56ch (about 70 characters). Sticky header height is 3.5rem on desktop; below `lg` a 2.5rem subnav row stacks beneath (total `--header-h` includes both plus rules). Scroll padding clears the header plus 1rem.

## Elevation & Depth

No shadows. Depth comes from paper vs raised tone, hairline rules, sticky overlap of the header over content, and inversion fills. Code blocks and the search field use raised on paper with a 1px rule border.

### Named Rules
**The Flat Page Rule.** Never add drop shadows, glow, or backdrop blur. If a surface needs separation, use a rule or step to raised.

## Shapes

Nearly square geometry: default and `sm` radius are 2px. Buttons, badges, nav chips, search field, code frames, images, and focus rings all share that corner. Borders are 1px in rule or rule-strong. No pills, no large card radii, no notched frames.

### Named Rules
**The 2px Rule.** If a control needs a corner, it is 2px. Do not introduce full-round or soft-card radii.

## Components

### Buttons
- **Character:** Compact manual controls—ink slabs and outlined peers, not glowing pills.
- **Shape:** 2px radius; min-height 2.75rem (2.5rem from md); small variant 2.25rem / 2rem.
- **Primary:** Ink fill, paper text, 1px ink border. Hover inverts to paper fill with ink text.
- **Secondary:** Transparent with rule-strong border and ink text. Hover fills ink.
- **Ghost:** Transparent, muted text, no border. Hover inverts. Used for copy and menu toggles.
- **Active / pressed:** `translateY(1px)` on `:active`; `aria-pressed="true"` matches primary fill.
- **Focus:** Global 2px accent outline, 2px offset.

### Badges
- **Style:** Transparent fill, 1px rule border, muted meta type, 2px radius, tight padding. Technology tags on projects.

### Links
- **Default (`.link`):** Ink text, 1px accent underline at 0.22em offset. Hover/focus invert to ink background and paper text.
- **Quiet (`.link-quiet`):** Muted, no underline; hover gains ink + accent underline.
- **Title (`.title-link`):** Ink, no underline; hover inverts (article and project titles).
- **Cross-reference (`.xref`):** Ink with dotted accent underline; hover/focus invert; `data-trail` updates the running header to `→ {destination}`. Signature interaction of the world.

### Cards / Containers
No marketing cards. Lists and projects are ruled rows (`border-b border-rule`, vertical padding). Code frames and the search field are the only raised bordered containers.

### Inputs / Fields
- **Search field:** Raised fill, rule-strong border, 3rem height, 2px radius; hover to faint border; focus-within ink border plus accent outline. Caret uses accent. Highlights use accent-wash.

### Navigation
- **Running header:** Sticky paper bar with bottom rule; mono `VIRUCHITH` wordmark; faint trail slot (section title or xref target); small muted nav links that invert when hovered or current; theme switch; primary Email control.
- **Mobile:** Subnav row under the bar below `lg`; hamburger opens a paper panel with theme switch and Resume.
- **Footer:** Same hanging grid; quiet links; mono version/build line ending in `VIRUCHITH`.

### Theme Switch
Segmented radio control with rule border and 2px radius. Checked option inverts to ink on paper.

### Signature: Section + Cross-reference Trail
`Section` draws the hanging man-page block: sticky left title + `#id` mono anchor, right content. Cross-reference links are the signature motion of the system—claim to evidence, with the running header naming the target.

## Do's and Don'ts

### Do:
- **Do** keep light and dark as paired paper–ink themes with independent accent values.
- **Do** use Schibsted Grotesk for reading and JetBrains Mono only for identifiers, dates, figures, code, and the wordmark.
- **Do** structure pages with hanging-indent grids and hairline rules, not cards.
- **Do** invert ink/paper for hover, selected, pressed, and current states.
- **Do** reserve accent for underlines, focus rings, carets, and washes.
- **Do** keep corners at 2px and the article measure at 56ch (about 70 characters).

### Don't:
- **Don't** revive Lit Control Room tokens (cyan glow, indigo panels, Inter/Manrope, pill CTAs, glass cards).
- **Don't** add shadows, glows, gradients, or backdrop blur.
- **Don't** fill primary buttons with accent blue—ink is the action color.
- **Don't** introduce uppercase tracked eyebrows or marketing kickers; row labels stay man-page meta.
- **Don't** put body copy in monospace or display weight above 600.
- **Don't** wrap evidence lists in elevated card chrome.
