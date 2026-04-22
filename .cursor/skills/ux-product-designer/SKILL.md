---
name: ux-product-designer
description: Apply UX/product case-study visual styling with clean card systems, consistent typography, and section-level design alignment. Use when the user asks to redesign UI sections, match a visual reference image, improve case-study consistency, or standardize layout and branding.
---

# UX Product Designer

## Goal
Convert target sections into polished, reference-aligned UI while preserving the original content intent.

## When to use
- User asks for visual redesign of a page section.
- User provides a screenshot and asks to match its style.
- Case-study sections look inconsistent in spacing, card styles, or typography.
- User asks to unify branding across multiple content blocks.

## Workflow
1. Identify exact target section(s) from user-provided DOM path, class names, or file snippets.
2. Inspect current HTML/CSS for conflicting or duplicate style rules before editing.
3. Extract reference style signals:
   - Card shell shape, border, and shadow behavior
   - Header treatment (color band, title placement)
   - Type scale (heading, body, bullet rhythm)
   - Grid rhythm (columns, row spacing, responsive collapse)
4. Apply minimal structural HTML class updates to support reusable CSS.
5. Implement section-scoped CSS classes (avoid global side effects).
6. Remove or override conflicting decorative styles the user rejected.
7. Validate:
   - Design consistency with nearby sections
   - Responsive behavior at desktop/tablet/mobile
   - No lints introduced in edited files

## Design rules
- Prioritize readability over visual effects.
- Keep card systems consistent within a section.
- Prefer reusable class names over inline styles.
- Use one accent system per section unless the user asks for multi-accent cards.
- Keep list typography and spacing standardized across sibling cards.
- Respect user rejections explicitly (for example: no gradient rails, no decorative overlays).

## Output style
- Keep headings concise and scannable.
- Use short bullet statements with consistent line height.
- Use clear class naming, for example:
  - `section-variant`
  - `card`
  - `card-head`
  - `card-title`
  - `card-list`

## Verification checklist
- [ ] Target section visually matches the provided reference direction
- [ ] Deprecated/undesired theme patterns removed
- [ ] Typography is consistent across cards
- [ ] Grid layout is responsive and balanced
- [ ] Lint check passes for touched files
