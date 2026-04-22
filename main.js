/* ── Projects data ─────────────────────────────────────────────── */
const projects = [
  {
    title: "Automatic Differentiation for Climate Model Calibration",
    description:
      "Master's thesis completed as a visiting researcher at Oxford. " +
      "Made SpeedyWeather.jl differentiable so gradients can flow through the simulation and be used to calibrate model parameters.",
    tags: ["Julia", "SciML", "Climate"],
    link: null,
  },
  {
    title: "Parameter Estimation in Chaotic Systems via Automatic Differentiation",
    description:
      "Gradient-based calibration of the Lorenz-63 system using Enzyme.jl for source-level AD through an RK4 integrator. " +
      "Explores both trajectory-matching and statistical alignment approaches for climate-relevant parameter recovery.",
    tags: ["Julia", "Automatic Differentiation", "SciML"],
    link: "https://github.com/nviebig/LorenzParameterEstimation",
  },
  {
    title: "Optimized Matrix-Free Smoothers for Stokes Equations",
    description:
      "3D blocking for matrix-free smoothers in variable-viscosity Stokes equations — " +
      "achieving over 90% weak-scaling efficiency up to 64 cores and a 3× speedup on the Alps supercomputer at CSCS.",
    tags: ["HPC", "C++", "Numerical Methods"],
    link: null,
    paper: "https://arxiv.org/abs/2509.19061v1",
  },
  {
    title: "JWST Exoplanet Detection Simulator",
    description:
      "Bachelor's thesis. Python simulation tool for coronagraphic observations with JWST/MIRI — " +
      "modelling point-spread functions and contrast limits for direct exoplanet imaging.",
    tags: ["Python", "Astrophysics", "Simulation"],
    link: "https://github.com/nviebig/JWST-MIRI-Detection-Simulator",
  },
  {
    title: "Grating Nuller Optical Simulation",
    description:
      "Simulation and theoretical analysis of a grating nuller for high-contrast starlight suppression — " +
      "modelling destructive interference patterns to enable direct exoplanet imaging.",
    tags: ["Python", "Optics", "Astrophysics"],
    link: "https://github.com/nviebig/Grating-Nuller-Analysis",
  },
  {
    title: "Galaxy Morphology Analysis",
    description:
      "End-to-end pipeline for morphological classification of galaxies M49, M51, and M81 — " +
      "data reduction, astrometric calibration, and 2D Sersic profile fitting with GalFit.",
    tags: ["Python", "Astrophysics", "Image Processing"],
    link: "https://github.com/nviebig/galaxy-morphology-analysis",
  },
  {
    title: "Bayesian Modelling of Amazonian Wildfires",
    description:
      "Spatio-temporal Bayesian model predicting wildfire activity using meteorological and land-use data.",
    tags: ["Python", "Bayesian", "ML"],
    link: "https://github.com/nviebig/Bayesian-SpatioTemporal-Modeling",
  },
  {
    title: "Sahel Land Management Dashboard",
    description:
      "START Hack winner. Interactive dashboard using geospatial data to explore land use and " +
      "environmental change in the Sahel region.",
    tags: ["Python", "GIS", "Data Viz"],
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

    if (project.link || project.paper) {
      const linkRow = document.createElement("div");
      linkRow.className = "project-links";
      if (project.link) {
        const a = document.createElement("a");
        a.href = project.link;
        a.className = "project-link";
        a.textContent = "↗ GitHub";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        linkRow.appendChild(a);
      }
      if (project.paper) {
        const a = document.createElement("a");
        a.href = project.paper;
        a.className = "project-link";
        a.textContent = "↗ arXiv";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        linkRow.appendChild(a);
      }
      li.appendChild(linkRow);
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
