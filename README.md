# SamvidaDeyam Trust — Website

A modern, responsive website for SamvidaDeyam Trust — "Give with Understanding: A Vedic
Path to Conscious Giving." Built with React + Vite, sourced strictly from the Trust's
presentation (`Samvidadeyam-Trust.pptx`) and the existing public site
(https://samvidadeyam.in/).

This is a **local-first** project: it runs on `localhost` in VS Code and does not touch
the live public website. Nothing here is deployed anywhere automatically.

---

## 1. Install & run locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Vite will start a local dev server (usually **http://localhost:5173**) and print the URL
in your terminal. Open it in a browser. The page hot-reloads as you edit files.

To build a production bundle (for later deployment — see §7):

```bash
npm run build     # outputs to /dist
npm run preview   # serve the production build locally, to sanity-check it
```

---

## 2. Project structure

```
/
├─ index.html                 Page shell, fonts, meta/SEO tags
├─ vite.config.js
├─ package.json
├─ public/
│  ├─ assets/
│  │  ├─ logo.png             Trust emblem, extracted from the PPT
│  │  └─ favicon.svg
│  ├─ robots.txt
│  └─ sitemap.xml
└─ src/
   ├─ main.jsx                Entry point
   ├─ App.jsx                 Routes + layout shell (Ticker, Navbar, Footer)
   ├─ data/
   │  └─ siteContent.js       ⭐ ALL editable Trust copy lives here
   ├─ components/              Reusable UI: Navbar, Ticker, Footer, Button-less
   │                           buttons (see styles), Card variants, Accordion,
   │                           Tabs, DonationCard, LineageThread (signature SVG),
   │                           WordCycle, ScrollReveal, SectionHeader
   ├─ pages/
   │  ├─ Home.jsx
   │  ├─ About.jsx             Essence, Core Belief, Vision, Knowledge Lineage
   │  ├─ Activities.jsx        Mission, Focus Areas (with filter), Approach
   │  ├─ Contribute.jsx        Ways to contribute, bank details, Get Involved
   │  └─ Contact.jsx           Contact details + message form (UI only)
   └─ styles/
      ├─ tokens.css            Design tokens: color, type scale, spacing
      ├─ base.css              Reset, global typography, layout utilities
      ├─ components.css        Component-level styles
      └─ layout.css            Hero / page-level layout styles
```

---

## 3. Editing content

**Almost everything text-based lives in one file: `src/data/siteContent.js`.**
Open it, find the section you want (each export matches a section of the site —
`hero`, `essence`, `coreBelief`, `vision`, `mission`, `activities`, `contributePage`,
`donation`, `contact`, etc.), edit the strings, and save. The dev server updates
instantly.

### Adding the Trust's email and mobile number

The source PPT and public website both list "Email" and "Mobile" as fields under
**Connect with us**, but neither supplies the actual values. Rather than invent them,
this build leaves them blank with a visible placeholder. To add them:

Open `src/data/siteContent.js`, find the `contact` export, and fill in:

```js
export const contact = {
  ...
  email: 'trust@example.org',   // <-- add the real address
  mobile: '+91 90000 00000',    // <-- add the real number
  ...
};
```

The Contact page will automatically show them as clickable `mailto:` / `tel:` links
once filled in.

### Adding Cultural Preservation / Vedic Events detail

The PPT explicitly flags "Cultural Preservation" as needing further input from the
Trust, and lists "Vedic Events" with only a one-line description. Both are shown on
the Activities page with an honest "more detail coming soon" note rather than invented
copy. To fill them in, edit the corresponding items in the `activities.items` array in
`siteContent.js` and set `filled: true` once you've added real detail.

---

## 4. Changing images

- **Logo / emblem:** replace `public/assets/logo.png` with a new file of the same name
  (any reasonably square image works; it's rendered as a circle in the navbar, hero,
  and footer). No code changes needed.
- **Favicon:** edit or replace `public/assets/favicon.svg`.
- The hero and section "visuals" throughout the site are drawn with inline SVG
  (`LineageThread.jsx`, the circular motifs in `About.jsx`) rather than stock photos —
  per the brief's direction to avoid generic religious/NGO stock imagery. If you'd like
  to swap in an approved photograph later, add it to `public/assets/` and reference it
  with an `<img src="/assets/your-file.jpg" />` in the relevant page component.

---

## 5. Changing colours

All colours are CSS custom properties defined once, at the top of
`src/styles/tokens.css`:

```css
--ink: #10162B;        /* deep navy — dark sections, primary text */
--indigo: #1B2D5C;     /* primary brand blue */
--indigo-2: #2E4B8F;   /* mid blue — hover states */
--sky: #9FC0E3;        /* light accent blue */
--gold: #B4863A;       /* turmeric accent — used sparingly */
--rose: #C97C93;       /* lotus accent — rarest use */
--paper: #FBFCFE;      /* background */
```

Change a value here and it updates everywhere that variable is used — no need to hunt
through individual components.

---

## 6. Changing navigation

Edit the `nav` array near the top of `src/data/siteContent.js`:

```js
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  ...
];
```

To add a new page: create a new file in `src/pages/`, add a `<Route>` for it in
`src/App.jsx`, and add an entry to `nav`.

---

## 7. Connecting the contact form

`src/pages/Contact.jsx` currently renders a working **UI-only** form: submitting it
shows a "not yet connected" confirmation instead of sending anything, per the brief's
instruction not to fake a submission system. To make it functional, pick one:

- **Form service** (Formspree, Getform, Basin, etc.): point the form's `onSubmit` at
  the service's endpoint per their docs, or replace the `<form>` with their embed.
- **Your own backend / serverless function:** replace the `handleSubmit` function in
  `Contact.jsx` with a `fetch()` call to your endpoint.
- **mailto fallback:** simplest option — change the submit button to a `mailto:` link
  once the Trust's email address is added to `siteContent.js`.

---

## 8. Accessibility & responsiveness

- Mobile-first CSS; test at common breakpoints (375px, 768px, 1024px, 1440px+).
- Keyboard navigation and visible focus states are built in globally
  (`src/styles/base.css`).
- All animation (ticker scroll, scroll-reveal, word-cycle, accordion) respects
  `prefers-reduced-motion`.
- Sanskrit text uses "Noto Serif Devanagari" and is marked with `lang`-appropriate
  styling (`.sanskrit` class) for correct rendering of diacritics.

---

## 9. Production build & future deployment

This project is **local-only for now** — nothing here modifies or replaces
https://samvidadeyam.in/. When the Trust is ready to publish the new site:

1. Run `npm run build`. This produces a static `/dist` folder — plain HTML, CSS, and
   JS, deployable anywhere that serves static files.
2. Choose a host: common options for a static React/Vite site include Netlify,
   Vercel, Cloudflare Pages, or a plain static file host / cPanel, depending on
   whoever manages `samvidadeyam.in` today.
3. Because this app uses client-side routing (React Router), configure the host to
   redirect all unknown paths to `index.html` (a "SPA fallback" / rewrite rule) —
   Netlify and Vercel do this automatically for Vite projects; other hosts may need a
   `_redirects` or `.htaccess` rule.
4. Point the `samvidadeyam.in` domain at the new host once the Trust has reviewed and
   approved the build — this is a manual, deliberate step, not something this project
   does on its own.
5. Before going live, update `public/sitemap.xml` and the Open Graph tags in
   `index.html` if the final domain or page set differs from what's here now.

---

## 10. Content accuracy note

Every fact, activity, mission statement, and figure of speech on this site is sourced
from `Samvidadeyam-Trust.pptx` or https://samvidadeyam.in/. Nothing has been invented —
where a source was incomplete (Cultural Preservation detail, Contact email/mobile),
the site says so honestly rather than filling the gap with plausible-sounding text.
If you add new content later, please keep to this standard.
