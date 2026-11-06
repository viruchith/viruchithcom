---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/articles/index.astro","src/pages/articles/[slug].astro","src/pages/projects/index.astro"]
---

# Surface brief: viruchith.com (whole site, redesign)

Mode: Persuade (homepage); Read (articles index, article pages, /projects archive).
Primary visitor: recruiter or hiring manager deciding whether to email for a full-time backend role. Secondary: consulting clients, engineers reading articles.
Scope: every page. Redesign replaces the "Lit Control Room" dark world; it is an anti-reference.
Theme: system default, accessible light/dark/system choice, remembered; light and dark tuned independently.
Cat widget: opt-in only; three.js loads after the visitor enables it.

## Direction contract

THESIS: The site is a well-set reference page for one engineer: a reader finds the claim, the proof, and the way to make contact as quickly as they would find a flag in a good manual.

OWN-WORLD: The printed Unix manual page: running header and footer, hanging-indent sections, a synopsis that states usage before prose, a See also list that closes the page. Translated, not costumed: proportional sans for display and reading, monospace only for code, dates, figures, and identifiers.

STORY: Name and role, then the synopsis (offer, Email, Resume, availability), then a merged description with figures linked to evidence, then experience, backend projects, skills, education, articles under See also, contact, and a Known issues line where the cat lives.

FIRST VIEWPORT: At every width from 320px, the running header (wordmark, section nav, Email), the display line with name and role, the one-line offer, and the Email and Resume buttons are all visible above the fold. Desktop sets these in a hanging-indent grid: row labels in a narrow left column, content in the wide right column, joined by full-width hairline rules. No image, no card, no gradient.

FORM: man page (#7 on my list), seed: b1ce79edc47a6a41. Raises: 4px unit; dense two-column lists at wide widths; tabular figures linked to their evidence; inversion (ink on paper flipped) for hover, selected, and pressed; visible, stable anchor ids; no shadows, depth by overlap. Signature interaction: the cross-reference trail, where claim references invert on hover or focus and the running header names the target.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
