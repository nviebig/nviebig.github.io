/* ── Projects data ─────────────────────────────────────────────── */
const projects = [
  {
    title: "Differentiable Atmospheric Modeling with SpeedyWeather.jl",
    description:
      "Master's thesis completed as a visiting researcher at Oxford. " +
      "Made SpeedyWeather.jl differentiable so gradients can be used to optimize model parameters.",
    tags: ["Julia", "SciML", "Climate"],
    link: null,
  },
  {
    title: "Optimized Matrix-Free Smoothers for Stokes Equations",
    description:
      "Project from the HPC for Weather and Climate course. Studied performance and " +
      "scaling on the Alps supercomputer at CSCS.",
    tags: ["HPC", "C++", "Numerical Methods"],
    link: null,
  },
  {
    title: "Sahel Land Management Dashboard (START Hack Winner)",
    description:
      "Interactive dashboard using geospatial data to explore land use and " +
      "environmental change in the Sahel region.",
    tags: ["Python", "GIS", "Data Viz"],
    link: null,
  },
  {
    title: "Bayesian Modeling of Amazonian Wildfires",
    description:
      "Spatio-temporal model predicting wildfire activity using meteorological and " +
      "land-use data.",
    tags: ["Python", "Bayesian", "ML"],
    link: null,
  },
  {
    title: "JWST Exoplanet Detection Simulator",
    description:
      "Python simulation tool for coronagraphic observations with JWST.",
    tags: ["Python", "Astrophysics", "Simulation"],
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

    if (project.tags && project.tags.length) {
      const tagRow = document.createElement("div");
      tagRow.className = "project-tags";
      project.tags.forEach(function (tag) {
        const span = document.createElement("span");
        span.className = "project-tag";
        span.textContent = tag;
        tagRow.appendChild(span);
      });
      li.appendChild(tagRow);
    }

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

/* ── Footer year ───────────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Init ──────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
  setYear();
});
