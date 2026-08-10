# Sofia Isobel — Website

A monochrome, editorial site built with plain HTML, CSS and a small amount
of vanilla JS. 

## What's in the box

```
sofia-isobel-site/
├── index.html          Landing page
├── about.html
├── music.html
├── videos.html
├── photographs.html
├── performances.html
├── epk.html             Electronic Press Kit
├── contact.html
├── css/
│   └── style.css        All styling, colors and type live here
├── js/
│   └── main.js           Mobile nav toggle, lightbox, footer year
└── README.md
```

## A note on the typeface

You asked for everything set in **Didot**. Real Didot (the digitisation of
Firmin Didot's original type) is a **paid, licensed font** — Linotype/URW
sell it, and it isn't available as a free web font, so it can't legally be
bundled into this project or loaded from a free font CDN.

The stylesheet is written so it **tries Didot first**:

```css
font-family: 'Didot', 'Bodoni Moda', 'Didot LT STD', 'Playfair Display', Georgia, serif;
```

- If a visitor has Didot installed locally (it ships with every Mac), they'll
  see true Didot automatically — no setup needed.
- Everyone else falls back to **Bodoni Moda**, a free, open-source didone
  typeface (loaded from Google Fonts in `style.css`) that shares Didot's
  hallmark extreme thick–thin stroke contrast and vertical stress. Side by
  side they read as the same family of typeface — this is the closest free
  match available.

**If you own a Didot license** (e.g. from Adobe Fonts/Linotype), you can
embed the real thing for every visitor:
1. Add your licensed `.woff2` file(s) to a new `fonts/` folder.
2. At the top of `css/style.css`, above the `:root` block, add:
   ```css
   @font-face {
     font-family: 'Didot';
     src: url('../fonts/Didot-Regular.woff2') format('woff2');
     font-weight: 400;
   }
   @font-face {
     font-family: 'Didot';
     src: url('../fonts/Didot-Bold.woff2') format('woff2');
     font-weight: 700;
   }
   ```
3. That's it — because `'Didot'` is already first in the font stack, the
   whole site will pick it up.

## Replacing the placeholder images

Every photo, video thumbnail and album cover on the site is a styled `<div class="placeholder">`
(a faint diagonal hatch with a small caption) rather than a broken image
link — so the site looks intentional even before you have final assets.

To drop in a real image, replace the placeholder block:

```html
<!-- before -->
<div class="placeholder" style="--ar: 4/5;"><span class="tag">Portrait — replace with image</span></div>

<!-- after -->
<img src="assets/images/portrait.jpg" alt="Sofia Isobel portrait">
```

`--ar` sets the placeholder's aspect ratio (e.g. `1/1`, `4/5`, `16/9`) so
layouts stay aligned — match your real image to the same ratio, or adjust
the surrounding CSS grid if you prefer.

## Editing the navigation or adding a page

The header/footer markup is repeated at the top and bottom of every HTML
file (there's no templating engine — it's plain static HTML, which is what
GitHub Pages serves best with zero configuration). To rename a tab or add a
new one, update the `<nav class="nav-list">` block **and** the matching
`<nav class="hero-nav">` block on `index.html`, in every file, and give the
current page's link `aria-current="page"`.

## The contact form

`contact.html` has a plain HTML form. GitHub Pages only serves static
files, so the form doesn't submit anywhere yet. The easiest fixes:

- **Formspree** (formspree.io) — change the `<form>` tag to
  `<form action="https://formspree.io/f/yourFormId" method="POST">` and it just works.
- **Netlify Forms** — if you ever move hosting to Netlify, add
  `data-netlify="true"` to the `<form>` tag.

## Deploying to GitHub Pages

1. **Create a repository.** On GitHub, click *New repository*. Name it
   whatever you like — if you want the site at `https://yourusername.github.io`
   directly, name the repo exactly `yourusername.github.io`; any other name
   publishes at `https://yourusername.github.io/repo-name`.

2. **Add these files to the repo.** Either:
   - drag-and-drop all the files/folders in this project into the GitHub
     web UI ("Add file → Upload files"), keeping the `css/` and `js/`
     folders intact, **or**
   - use git from your computer:
     ```bash
     cd sofia-isobel-site
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/yourusername/your-repo-name.git
     git push -u origin main
     ```

3. **Turn on Pages.** In the repository, go to *Settings → Pages*. Under
   "Build and deployment", set **Source** to `Deploy from a branch`, then
   choose branch `main` and folder `/ (root)`. Save.

4. **Wait a minute, then visit your URL.** GitHub will show it at the top
   of the Pages settings once it's live — usually
   `https://yourusername.github.io/your-repo-name/`.

5. **Custom domain (optional).** If you own a domain (e.g. `sofiaisobel.com`),
   add it in the same Pages settings screen under "Custom domain" and follow
   GitHub's DNS instructions (a `CNAME` file is created for you automatically).

That's the whole process — no build tools, no `npm install`, nothing to
compile. Any time you edit a file and push, the live site updates within a
minute or two.

## Design notes

- **Palette:** pure black/white with two supporting greys for hairlines and
  captions — nothing else. No accent color, by design.
- **Signature device:** navigation throughout the site is numbered like a
  tracklist or set list (`01 About`, `02 Music`...), and the landing page
  carries a large, faint "SI" monogram behind the name — a quiet nod to
  album-sleeve branding.
- **Photographs page** uses a "contact sheet" grid (numbered frames) rather
  than a generic gallery, and **Performances** is styled as a set list —
  both are small details tied to the subject rather than decoration.
- Fully responsive, keyboard-focusable, and respects
  `prefers-reduced-motion`.
