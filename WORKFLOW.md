# Content workflow

All editable content lives in **`src/data/content.ts`**. Everything below is a
checklist for routine updates — you shouldn't need to touch any component
file (the `.tsx`/`.module.css` files) for any of these.

## Add a new project

Open `src/data/content.ts`, find the `projects` array, and add an object at
the end (or wherever you want it in the pipeline order):

```ts
{
  name: "My New Project",
  tag: "Short tag shown next to the name",
  flagship: false,        // true = the bold "flagship" module styling (currently only MedCare Pharma)
  description: "...",
  metric: "optional short stat line, omit the field if there isn't one",
  tags: ["Tech", "Tags", "Here"],
  githubUrl: "https://github.com/you/repo",
  demoUrl: "https://your-live-demo.com",   // optional — omit until a live demo actually exists
  marketplaceUrl: "https://github.com/marketplace/actions/...", // optional — adds a "Marketplace" button
},
```

Save. It appears automatically in the Work section with the existing
pipeline/dot-marker styling — no component changes needed.

## Add a new achievement / certification

Same file, `achievements` array:

```ts
{ label: "Award or Contest Name", description: "One or two sentences about it." },
```

## Update your resume

Replace the file at `public/resume.pdf` with the new PDF. **Keep the exact
filename `resume.pdf`** — the Resume button links to `/resume.pdf`, so no
code change is needed as long as the filename doesn't change.

## Update stack icons

`content.ts` has a `stackIcons` array of `{ name, iconKey }`. `iconKey` must
match a named export from the `simple-icons` package (e.g. `"siReact"`,
`"siPostgresql"`) — check [simple-icons' icon list](https://simpleicons.org/)
for the exact export name (it's `si` + the brand name, PascalCase).

- If the icon is **already imported** in `src/components/Stack/Stack.tsx`
  (check the `ICON_MAP` object there), just add the `{ name, iconKey }` entry
  to `stackIcons` in `content.ts` — that's it.
- If it's a **brand new icon** not yet used anywhere on the site, you also
  need to add one import line and one `ICON_MAP` entry in `Stack.tsx`. This
  is the one routine case that touches a component file, because
  `simple-icons` ships thousands of icons and the app only imports the ones
  actually used (importing the whole package would bloat the bundle).

## Publishing changes

```bash
git add -A
git commit -m "Describe what changed"
git push
```

Vercel auto-deploys from the connected GitHub repo — changes go live in
about a minute.

## Local preview before publishing

```bash
npm run dev
```

Open the printed `localhost` URL, check your change, then publish as above.
