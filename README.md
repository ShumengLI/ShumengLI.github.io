# Shumeng Li — personal homepage

This repository is a directly deployable static website. It has no npm dependencies, Hugo build step, external JavaScript, external fonts, or CDN assets. The existing layout CSS and Font Awesome fonts retain their upstream license notices.

## Preview and edit

Run from this directory:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ in a browser. Use an HTTP server rather than opening the HTML as a local file because asset URLs begin with `/`.

- `index.html`: profile, publications, book, experience, contact details.
- `css/theme.css`: existing Wowchemy/Bootstrap layout and theme.
- `css/icons.css` and `webfonts/`: existing local Font Awesome icons.
- `css/site.css`: small local style overrides and system font stack.
- `js/site.js`: mobile menu, theme selection, navigation state and search.
- `authors/admin/shumengli.jpg`: optimized portrait.
- `media/`: local logos and working application icons.
- `404.html`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`: static site metadata.

Search reads the visible page content, including publication authors and titles. When adding a publication, give its `.view-list-item` a unique `id` and `data-searchable` attribute. No generated search index needs to be updated. Titles without a known paper URL use a `.publication-title` span rather than a placeholder homepage link.

The existing A*STAR experience dates read “Jul 2021 – Jan 2021”. They were preserved along with all other profile and publication text; confirm the intended dates before changing them.

## GitHub Pages deployment

This site is published from the root of the `main` branch of `ShumengLI/ShumengLI.github.io`. The `.nojekyll` file enables plain static hosting. When synchronizing an updated copy, remove retired files as well as adding changed files so obsolete template pages are no longer served.

## Maintenance notes

The website retains all six homepage sections and 13 publication entries. Runtime assets are served locally. Search indexes the visible content; no generated search index is needed. The legacy example projects, robot research pages, Netlify admin integration, external runtime dependencies and unused JavaScript bundles have been removed.

Original photographs and logos were resized for their display dimensions. The existing Wowchemy layout and local Font Awesome assets retain their license notices. Fonts use the system font stack.

## Validation

Checked in Chrome at desktop (1440 px) and mobile (390 px) widths with external resource requests blocked: content preservation, publication links and anchors, local assets, search, theme selection and persistence, mobile navigation, application icons, the 404 page, and readable content with JavaScript disabled.
