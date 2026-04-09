# nviebig.github.io

Personal website of Niklas Viebig — physics MSc student at ETH Zürich.

Built as a static site with plain HTML, CSS, and JavaScript. No frameworks, no build tools, no external libraries.

---

## Preview locally

Clone the repository and open `index.html` in a browser. Because everything is static you can just double-click the file, but a local server avoids any path quirks:

```bash
# Python (built-in, Python 3)
python -m http.server 8000
# then open http://localhost:8000
```

Or with Node (if you have `npx` available):

```bash
npx serve .
```

---

## Deploy to GitHub Pages

1. Push the repository to GitHub (the repo must be named `<username>.github.io` for a user site, or any name for a project site).
2. Go to **Settings → Pages** in the repository.
3. Under **Build and deployment**, set the source to **Deploy from a branch** and choose the branch (usually `main`) with root `/`.
4. GitHub will serve the site within a minute or two. The URL will be `https://<username>.github.io` for a user site.

No build step is needed — GitHub Pages serves the files directly.

---

## Edit the projects list

All project data lives in `main.js` at the top of the file in the `projects` array:

```js
const projects = [
  {
    title: "Project title",
    description: "Short description of the project.",
    link: null,           // set to a URL string to show a link, e.g. "https://github.com/..."
  },
  // ...
];
```

To add a project, append a new object to the array. To remove one, delete its entry. To add a link, replace `null` with the URL string. The page re-renders the list on every load, so no other files need to change.

---

## Files

| File         | Purpose                                      |
|-------------|----------------------------------------------|
| `index.html` | Page structure and content                   |
| `style.css`  | All styles — light theme, responsive layout  |
| `main.js`    | Projects data and small interactive features |
| `README.md`  | This file                                    |
