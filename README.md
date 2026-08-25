# Next Step Dance Studio — Website

Website for [The Next Step Dance Studio](https://thenextstepdance.com) in Birdsboro, PA. Built with React, TypeScript, and Vite.

---

## Updating Website Content

Most content changes don't require touching any page code. Content is managed through the **Decap CMS** — log in at **`/admin`** on the live site (requires Netlify Identity access).

**Editing files directly or with an AI assistant:** the CMS saves to JSON files under `src/content/`. You can edit those files directly — field definitions are documented below.

**Using Cursor:** copy-paste prompts for common tasks are in [`.cursor/prompts.md`](.cursor/prompts.md). Project **Agent Skills** in [`.cursor/skills/`](.cursor/skills/) steer the assistant toward the right files and conventions.

### Announcement Banner — `src/content/announcement.json`

The pink banner across the top of the home page. Use it for seasonal notices — registration opening, start dates, closures.

| Field | Description |
|---|---|
| `enabled` | `true` shows the banner, `false` hides it entirely |
| `headline` | The main message, e.g. `"Our 2026–2027 season is open for registration!"` |
| `subtext` | Smaller text beside the headline, e.g. `"Classes begin September 8th"` — blank to omit |
| `buttonLabel` | e.g. `"Register Now"` — blank shows no button |
| `buttonLink` | `/registration`, `/classes`, etc. for this site, or a full `https://` address (opens in a new tab) — blank shows no button |

---

### Online Registration — `src/content/onlineRegistration.json`

Controls the **Register Online** page (`/register-online`), which embeds the Studio Pro live class schedule, and the notice shown above the studio's own registration form.

| Field | Description |
|---|---|
| `enabled` | `true` shows the Register Online page and the notice above the form; `false` hides both and `/register-online` 404s |
| `portalUrl` | The Studio Pro live-schedule link. In Studio Pro: Classes → Class Options → "Add live schedule to your website", and use the **responsive** link |
| `bannerHeadline` | Headline of the notice above the registration form |
| `bannerBody` | One or two sentences on why registering online is better |
| `bannerButtonLabel` | Label on the notice's button |

The schedule is embedded in an iframe. Studio Pro doesn't report the embed's height, so the frame is a fixed box with its own scrollbar — `75vh` on phones so it always fits the screen, `1000px` from the `md` breakpoint up. A "open it in a new tab" link sits below the frame for anyone whose browser blocks the embed.

---

### Classes — `src/content/classes.json`

Each class is an object in the `classes` array. Fields:

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique slug, no spaces (e.g. `"hip-hop"`) |
| `title` | Yes | Class name shown on the page |
| `ages` | Yes | Age range (e.g. `"Ages 5–6"` or `"All Ages & Levels"`) |
| `price` | Yes | Pricing text (e.g. `"$55"` or `"Call for pricing"`) |
| `description` | Yes | Full paragraph shown on the Classes page |
| `summary` | Yes | Short one-liner shown in cards and previews |
| `image` | No | Photo URL (`https://…`) **or** a path to a file in **`public/`**, e.g. `/images/classes/tap.jpg` → file at `public/images/classes/tap.jpg` |
| `note` | No | Small print shown below the description (e.g. prerequisites) |
| `featured` | Yes | `true` to show this class on the homepage, `false` to exclude it |

**To add a class:** Add a new object to the `classes` array and fill in the fields.

**To remove a class:** Delete the entire object from the array.

---

### Staff — `src/content/staff.json`

Each instructor is an object in the `instructors` array. Fields:

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Full name |
| `title` | Yes | Job title shown under their name |
| `specialties` | Yes | List of classes they teach (shown as tags) |
| `photo` | No | Headshot URL (`https://…`) **or** `/images/staff/name.jpg` under **`public/images/staff/`**. Omit if no photo yet. |
| `bio` | Yes | One paragraph as a string, or multiple paragraphs as a list of strings |

**To add an instructor:** Add a new object to the `instructors` array.

**To remove an instructor:** Delete the entire object from the array.

**Instructor order** on the page follows the order they appear in the array.

**Local files:** Save images into **`public/`** (e.g. `public/images/classes/`, `public/images/staff/`), then reference them with a path that starts with **`/`** and skips the `public` segment.

---

### Recital — `src/content/recital.json` + `src/content/recitalProgram.json`

**`recital.json`** — season details, venue, tickets, and senior spotlights. Any field set to `null` will automatically display a "coming soon" placeholder on the website.

| Field | Description |
|---|---|
| `visible` | `false` hides the Recital pages and drops Recital from the menu and footer; `/recital` and `/recital/program` then show the 404 page. Everything below is kept and reappears when set back to `true`. |
| `season` | Label for the current year, e.g. `"2025–2026"` |
| `eventDate` | `"YYYY-MM-DD"` — also used to auto-hide the ticket link once the recital has passed |
| `showTimes` | e.g. `"Shows at 11:00 AM, and 3:00 PM"` — blank shows just the date |
| `venue` | Venue name and address — `null` shows "Coming Soon" |
| `venueMapLink` | Google Maps link — blank shows the venue name only |
| `tickets.generalAdmission` | e.g. `"$15"` — `null` shows "Not Available" |
| `tickets.reservedSeating` | e.g. `"$20"` — `null` shows "TBA" |
| `tickets.salesOpenDateTime` | `"YYYY-MM-DDTHH:mm:ss"` — the Buy Tickets link appears at this time |
| `tickets.ticketLink` | URL where tickets are sold — blank shows no button |
| `seniors` | Array of senior spotlight objects — `null` shows "Coming Soon" |

**`recitalProgram.json`** — the full show program with performances, section headers, and intermissions. Managed via the CMS "Recital Program" collection.

---

## Developer Setup

**Requirements:** Node.js 20+, [pnpm](https://pnpm.io)

```bash
# Install dependencies
pnpm install

# Start the dev server (hot reload)
pnpm dev

# Type-check
pnpm tsc --noEmit

# Build for production
pnpm build

# Preview the production build locally
pnpm preview

# Unit tests (shared Zod schemas)
pnpm test
```

### Environment variables (Netlify / production)

Set these in the Netlify UI (or `.env` for local `netlify dev`) when email delivery via Resend is enabled:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com) API key for sending email |
| `TO_EMAIL` | No | Recipient inbox (defaults to the studio contact email) |
| `FROM_EMAIL` | No | Verified sender domain address (defaults to `noreply@` on the studio domain) |

---

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) (with [Rolldown](https://rolldown.rs) bundler)
- [Tailwind CSS v4](https://tailwindcss.com) — theme defined via `@theme` in `index.css`
- [React Router 7](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — form validation
- [Framer Motion](https://www.framer.com/motion/) — animations
- [React Helmet Async](https://github.com/staylor/react-helmet-async) — page `<head>` management
- [Decap CMS](https://decapcms.org) — content management at `/admin`

---

## Notes

- `sharp` and `svgo` optional dependencies for `vite-plugin-image-optimizer` may log warnings during install — this is harmless.
- Some images still reference the old website's CDN. Replace with self-hosted files under `public/images/` when convenient.
- Form submissions are stored in the Netlify dashboard. Netlify Functions for email delivery via Resend are present but not yet wired to the forms.
- Full-size gallery photos live in `src/assets/gallery/`. Run `pnpm optimize:gallery` (or just `pnpm dev` / `pnpm build`) to generate optimized WebP/JPEG files under `public/gallery/`.
