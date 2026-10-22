# Shumeng Li — Personal Homepage

Personal academic website featuring research interests, publications, education, and experience.

**Website:** [shumengli.github.io](https://shumengli.github.io/)

## Local preview

Run the following command from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [localhost:8765](http://localhost:8765/) in your browser.

## Project structure

- `index.html` — homepage content.
- `css/` — layout, theme, and icon styles.
- `js/site.js` — navigation, search, and theme switching.
- `authors/` and `media/` — portrait, logos, and site icons.
- `webfonts/` — local icon fonts.
- `404.html` — page-not-found screen.
- `manifest.webmanifest`, `robots.txt`, and `sitemap.xml` — site metadata.

## Deployment

The website is hosted on GitHub Pages from the root of the `main` branch. No build step is required.

## Credits

Layout styles are based on Wowchemy and Bootstrap. Icons use Font Awesome. Upstream license notices are retained in the corresponding asset files.
