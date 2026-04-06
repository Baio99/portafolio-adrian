# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at localhost:3000
npm run build      # Production build → /build
npm test           # Run tests (Jest + React Testing Library)
npm run deploy     # Build + deploy to GitHub Pages (gh-pages -d build)
```

> Dependencies must be installed with `--legacy-peer-deps` due to i18next requiring TypeScript ≥5 while react-scripts pins TypeScript 4.9.5.

## Architecture

Single-page portfolio built with React 19 + Framer Motion, deployed to GitHub Pages at `Baio99.github.io/portafolio-adrian`.

**Entry point:** `src/index.js` imports i18n config, global CSS, then renders `<App>` inside `ThemeProvider`.

**Layout flow in `App.js`:**
```
ThemeProvider → Header → Navbar → main[Home, About, Projects, Certificates, Contact] → Footer
```

`App.js` owns scroll-tracking state (`activeSection`) and menu state (`isMenuOpen`), passing both to `Navbar`. Active section is determined by comparing `window.scrollY` against each section's `offsetTop`.

---

## State and Context

**Theme system (`src/context/ThemeContext.js`):**
- `isDarkMode` (default: `true`) persisted in `localStorage` under key `'theme'`
- Toggles `document.body.className` between `dark-theme` / `light-theme`
- Consumed via `useContext(ThemeContext)` in `ThemeToggle`

**Language system (`src/i18n/index.js`):**
- Configured with `react-i18next` + `i18next`
- `lng` read from `localStorage` key `'language'`, fallback to `'es'`
- Language change: call `i18n.changeLanguage(lang)` + `localStorage.setItem('language', lang)`
- Consumed via `useTranslation()` hook throughout all components

---

## i18n Structure

```
src/i18n/
├── index.js                   ← i18next config (resources, lng, fallbackLng)
└── locales/
    ├── es/translation.json    ← Spanish (default)
    └── en/translation.json    ← English
```

**Namespaces (top-level keys):** `nav`, `header`, `home`, `about`, `projects`, `certificates`, `contact`, `footer`, `theme`

**Pattern for arrays** (projects, certificates, timeline education): static data (ids, URLs, images, technologies) lives in the component; translatable fields (title, description, category) are fetched with `t('key', { returnObjects: true })` and merged at render time:

```jsx
const projectTranslations = t('projects.items', { returnObjects: true });
const projects = projectsStatic.map((p, i) => ({
  ...p,
  title: projectTranslations[i]?.title || '',
  description: projectTranslations[i]?.description || ''
}));
```

---

## Component Map

| File | Responsibility |
|---|---|
| `src/components/Header/Header.jsx` | Fixed top bar: logo, desktop nav, CV button, LanguageToggle, ThemeToggle |
| `src/components/Navbar/Navbar.jsx` | Mobile slide-in menu (≤991px), shares nav items with Header |
| `src/components/ThemeToggle/ThemeToggle.jsx` | Dark/light mode button, reads from ThemeContext |
| `src/components/LanguageToggle/LanguageToggle.jsx` | ES/EN switch, persists to localStorage |
| `src/components/Footer/Footer.jsx` | Footer links and copyright |
| `src/sections/Home/Home.jsx` | Hero with typewriter animation; resets on language change via `i18n.language` dep |
| `src/sections/About/About.jsx` | About section; `valueProps`/`stats`/`tags` from `t(..., { returnObjects: true })` |
| `src/sections/About/Skills.jsx` | Skills grid; icons are static SVG imports, only title is translated |
| `src/sections/About/Timeline.jsx` | Education timeline; full data from `t('about.timeline.items', { returnObjects: true })` |
| `src/sections/Projects/Projects.jsx` | Projects section; static data merged with translations |
| `src/sections/Projects/ProjectCard.jsx` | Individual project card with image carousel |
| `src/sections/Certificates/Certificates.jsx` | Certificates grid + modal; static data merged with translations |
| `src/sections/Contact/Contact.jsx` | Contact form using emailjs-com (hardcoded service/template IDs) |

---

## CSS Architecture

| File | Role |
|---|---|
| `src/styles/variables.css` | CSS custom properties for colors; `.dark-theme` nested inside `:root` overrides |
| `src/styles/global.css` | Design tokens (`--primary-color`, etc.), resets, shared `.section-header` and `.section-divider` |
| `src/styles/animations.css` | Shared keyframe animations |
| `src/styles/utilities.css` | Utility classes |
| Each component | Co-located `.css` file for component-specific styles |

Primary color: `#6C63FF` (`--primary-color`). Dark background: `#1A1A2E`. The `LanguageToggle` and `ThemeToggle` share the same pill-style pattern defined in `Header.css` (`.theme-toggle`), not `ThemeToggle.css`.

---

## Animation Pattern

All sections use Framer Motion. Two patterns are used:

1. **Declarative** (`whileInView`): used by Home, Projects, Certificates, Contact, Timeline
2. **Imperative** (`useAnimation` + `useInView`): used only by `About.jsx` — re-animates on scroll out/back in

Standard variant names across components: `containerVariants` (stagger parent) and `itemVariants` (child fade-up spring).

---

## Deployment

- Hosted on GitHub Pages via `gh-pages` package
- `homepage` in `package.json`: `https://Baio99.github.io/portafolio-adrian`
- Asset paths use `/portafolio-adrian/` prefix (e.g., certificates, CV PDF)
- CV file at `public/IngIzaCV2026.pdf` — update this file to refresh the downloadable CV

---

## Contact Form

Uses `emailjs-com` with credentials hardcoded in `Contact.jsx`:
- Service ID: `service_owp7dui`
- Template ID: `template_mec7kw8`
- Public key: `wBi-wq0LLBdD8nPXN`
