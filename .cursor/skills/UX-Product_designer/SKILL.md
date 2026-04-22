---
name: ux-product-designer
description: Redesign case-study sections in a clean UX portfolio style with structured cards, pastel section headers, and consistent typography. Use when the user asks to match a visual reference for discovery, research, principles, or outcomes sections.
---

# UX Product Designer

## Purpose
Apply reference-driven UI polish to case-study sections while keeping content unchanged and improving scanability.

## Triggers
- User shares a screenshot and asks to match section style.
- User asks to redesign Discovery, Research, Delivery Principles, or Reflection blocks.
- User requests consistent card systems and typography across case-study sections.

## Core style pattern
- Use white cards with strong outline borders.
- Use pastel title/header bars per card for visual grouping.
- Keep content in concise bullets or short paragraphs.
- Avoid heavy gradients, decorative rails, and complex overlays.
- Keep spacing and type rhythm consistent across sibling cards.

## Execution steps
1. Find target sections by class and DOM path.
2. Update HTML minimally to add reusable modifier classes when needed.
3. Implement section-scoped CSS overrides for:
   - card shell
   - card header band
   - title/body/list typography
   - responsive grid collapse
4. Remove conflicting legacy styles in the target section scope.
5. Run lint checks on edited files.

## Quality checklist
- [ ] Visual style matches provided reference direction.
- [ ] Card layouts are consistent and readable.
- [ ] Typography is standardized in headings and lists.
- [ ] Mobile/tablet layout remains clean.
- [ ] No linter issues in touched files.
