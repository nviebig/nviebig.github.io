/* ── Projects data ─────────────────────────────────────────────── */
const projects = [
  {
    title: "Differentiable Atmospheric Modeling with SpeedyWeather.jl",
    description:
      "Master's thesis at Oxford. Working on making a weather model differentiable " +
      "so gradients can be used to improve parameters.",
    link: null,
  },
  {
    title: "Optimized Matrix-Free Smoothers for Stokes Equations",
    description:
      "Project from the HPC for Weather and Climate course. Studied performance and " +
      "scaling on the Alps supercomputer at CSCS.",
    link: null,
  },
  {
    title: "Sahel Land Management Dashboard (START Hack Winner)",
    description:
      "Interactive dashboard using geospatial data to explore land use and " +
      "environmental change in the Sahel region.",
    link: null,
  },
  {
    title: "Bayesian Modeling of Amazonian Wildfires",
    description:
      "Spatio-temporal model predicting wildfire activity using meteorological and " +
      "land-use data.",
    link: null,
  },
  {
    title: "JWST Exoplanet Detection Simulator",
    description:
      "Python simulation tool for coronagraphic observations with JWST.",
    link: null,
  },
];

/* ── Render projects ───────────────────────────────────────────── */
function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;

  const fragment = document.createDocumentFragment();

  projects.forEach(function (project) {
    const li = document.createElement("li");
    li.className = "project-card";

    const h3 = document.createElement("h3");
    h3.textContent = project.title;
    li.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = project.description;
    li.appendChild(p);

    if (project.link) {
      const a = document.createElement("a");
      a.href = project.link;
      a.className = "project-link";
      a.textContent = "↗ view project";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
    }

    fragment.appendChild(li);
  });

  list.appendChild(fragment);
}

/* ── Terminal prompt interaction ───────────────────────────────── */
function initPrompt() {
  const btn = document.getElementById("promptBtn");
  const response = document.getElementById("promptResponse");
  if (!btn || !response) return;

  btn.addEventListener("click", function () {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      response.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    } else {
      response.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }
  });
}

/* ── Footer year ───────────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Init ──────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
  initPrompt();
  setYear();
});
