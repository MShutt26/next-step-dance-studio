---
name: studio-update-recital
description: >-
  Updates recital season info, venue, tickets, senior spotlights, and the show program for Next Step Dance Studio.
  Use when the user mentions recital, showcase, tickets, venue, seniors, program, or src/content/recital.json.
---

# Update recital content

## Before you change anything

Do not invent **venue, dates, ticket prices, or senior names/bios**. If the user has not pasted finalized details, **ask** what to set or leave fields as **`null`** (coming soon) per README.

## Source of truth

Content is managed via the **Decap CMS** at `/admin` → Recital and Recital Program, which saves to:

- **`src/content/recital.json`** — season details, venue, tickets, seniors
- **`src/content/recitalProgram.json`** — full show program (performances, sections, intermissions)

When editing programmatically, edit those JSON files directly. Read field definitions in [README.md](../../../README.md) → section **Recital**.

The `src/data/recital.ts` and `src/data/recitalProgram.ts` files are thin TypeScript wrappers — do not edit them for content changes.

## Rules

- **`null` means "coming soon"** in the UI for that field — use `null` until details are finalized.
- When filling **`seniors`**, include at minimum `name` and `bio`; `photo` is optional.
- Keep **`season`** string updated for the current academic/recital year label.
- **`visible: false`** hides the Recital pages site-wide (nav, footer, and both routes 404). Use it between seasons instead of deleting content — everything else in the file is preserved.

## After edits

- **`pnpm exec tsc --noEmit`** to confirm types still match.

## What not to do

- Do not edit **`src/data/recital.ts`** or **`src/data/recitalProgram.ts`** for content — they read from `src/content/`.
