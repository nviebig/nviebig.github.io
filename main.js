/* Canvas starfield */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  /* Stars - cooler whites, hint of blue and teal (climate palette) */
  const STARS = 260;
  const stars = Array.from({ length: STARS }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    r:     0.15 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0003 + Math.random() * 0.001,
    hue:   [205, 210, 220, 270][Math.floor(Math.random() * 4)],
  }));

  /* Nebula glows - atmospheric cyan, deep space blue, earth teal */
  const nebulae = [
    { x: 0.78, y: 0.28, r: 0.42, rgb: [0,  185, 220], a: 0.065 },
    { x: 0.12, y: 0.65, r: 0.36, rgb: [60, 40,  210], a: 0.055 },
    { x: 0.48, y: 0.88, r: 0.32, rgb: [0,  160, 110], a: 0.045 },
  ];

  /* Shooting stars */
  let shooters = [], lastShot = 0, nextShot = 5000 + Math.random() * 8000;

  function spawnShooter() {
    const a = (14 + Math.random() * 28) * Math.PI / 180;
    const s = 3 + Math.random() * 4;
    shooters.push({
      x: Math.random() * canvas.width * 0.75,
      y: Math.random() * canvas.height * 0.4,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      life: 1, decay: 0.016 + Math.random() * 0.014,
      len: 80 + Math.random() * 110,
    });
  }

  function draw(ts) {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    /* Nebulae - breathe slowly */
    nebulae.forEach(n => {
      const b = 0.84 + 0.16 * Math.sin(ts * 0.00021 + n.x * 4.8);
      const g = ctx.createRadialGradient(n.x*W, n.y*H, 0, n.x*W, n.y*H, n.r * Math.max(W,H) * b);
      g.addColorStop(0, `rgba(${n.rgb},${n.a})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });

    /* Stars - twinkle */
    stars.forEach(s => {
      const br = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(ts * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.globalAlpha = br;
      ctx.fillStyle = `hsl(${s.hue}, 68%, 90%)`;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    /* Shooting stars */
    if (!reduced) {
      if (ts - lastShot > nextShot) { spawnShooter(); lastShot = ts; nextShot = 5000 + Math.random() * 9000; }
      shooters = shooters.filter(s => s.life > 0);
      shooters.forEach(s => {
        const tx = s.x - s.vx * s.len * 0.1, ty = s.y - s.vy * s.len * 0.1;
        const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, `rgba(210,235,255,${s.life})`);
        g.addColorStop(1, 'rgba(210,235,255,0)');
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty);
        ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      });
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();

/* Nav: becomes visible glass on scroll */
(function () {
  const nav = document.querySelector('.topnav');
  if (!nav) return;
  const tick = () => nav.classList.toggle('is-scrolled', window.scrollY > 80);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

/* Scroll reveal */
(function () {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    }),
    { threshold: 0.07 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* Domain definitions */
const DOMAIN = {
  climate: { label: 'Climate',      color: '#00c8e8' },
  astro:   { label: 'Astrophysics', color: '#6080f0' },
  hpc:     { label: 'HPC',          color: '#9060e0' },
  ml:      { label: 'ML',           color: '#e07830' },
  geo:     { label: 'Geospatial',   color: '#20b068' },
};

/* Projects data */
const projects = [
  {
    title: "Automatic Differentiation for Climate Model Calibration",
    description: "Master's thesis at Oxford. Made SpeedyWeather.jl differentiable so gradients can flow through the simulation and be used to calibrate model parameters.",
    tags: ["Julia", "SciML", "Climate"],
    domain: 'climate',
  },
  {
    title: "Parameter Estimation in Chaotic Systems via Automatic Differentiation",
    description: "Gradient-based calibration of the Lorenz-63 system using Enzyme.jl for source-level AD through an RK4 integrator. Explores trajectory-matching and statistical alignment for climate-relevant parameter recovery.",
    tags: ["Julia", "Automatic Differentiation", "SciML"],
    domain: 'climate',
    link: "https://github.com/nviebig/LorenzParameterEstimation",
  },
  {
    title: "Optimized Matrix-Free Smoothers for Stokes Equations",
    description: "3D blocking for matrix-free smoothers in variable-viscosity Stokes equations: over 90% weak-scaling efficiency up to 64 cores and 3× speedup on the Alps supercomputer at CSCS.",
    tags: ["HPC", "C++", "Numerical Methods"],
    domain: 'hpc',
    paper: "https://arxiv.org/abs/2509.19061v1",
  },
  {
    title: "JWST Exoplanet Detection Simulator",
    description: "Bachelor's thesis. Python simulation tool for coronagraphic observations with JWST/MIRI: modelling point-spread functions and contrast limits for direct exoplanet imaging.",
    tags: ["Python", "Astrophysics", "Simulation"],
    domain: 'astro',
    link: "https://github.com/nviebig/JWST-MIRI-Detection-Simulator",
  },
  {
    title: "Grating Nuller Optical Simulation",
    description: "Simulation and theoretical analysis of a grating nuller for high-contrast starlight suppression: modelling destructive interference patterns to enable direct exoplanet imaging.",
    tags: ["Python", "Optics", "Astrophysics"],
    domain: 'astro',
    link: "https://github.com/nviebig/Grating-Nuller-Analysis",
  },
  {
    title: "Galaxy Morphology Analysis",
    description: "End-to-end pipeline for morphological classification of galaxies M49, M51, M81: data reduction, astrometric calibration, and 2D Sersic profile fitting with GalFit.",
    tags: ["Python", "Astrophysics", "Image Processing"],
    domain: 'astro',
    link: "https://github.com/nviebig/galaxy-morphology-analysis",
  },
  {
    title: "Bayesian Modelling of Amazonian Wildfires",
    description: "Spatio-temporal Bayesian model predicting wildfire activity using meteorological and land-use data.",
    tags: ["Python", "Bayesian", "ML"],
    domain: 'ml',
    link: "https://github.com/nviebig/Bayesian-SpatioTemporal-Modeling",
  },
  {
    title: "Sahel Land Management Dashboard",
    description: "START Hack winner. Interactive dashboard using geospatial data to explore land use and environmental change in the Sahel region.",
    tags: ["Python", "GIS", "Data Viz"],
    domain: 'geo',
  },
];

/* Render project rows */
function renderProjects() {
  const list = document.getElementById('projectList');
  if (!list) return;

  const frag = document.createDocumentFragment();

  projects.forEach(function (p, i) {
    const d = DOMAIN[p.domain] || DOMAIN.astro;

    const li = document.createElement('li');
    li.className = 'project-row';
    li.style.setProperty('--dc', d.color);

    // Number
    const num = document.createElement('span');
    num.className = 'p-num';
    num.textContent = String(i + 1).padStart(2, '0');
    li.appendChild(num);

    // Body
    const body = document.createElement('div');
    body.className = 'p-body';

    const title = document.createElement('p');
    title.className = 'p-title';
    title.textContent = p.title;
    body.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'p-desc';
    desc.textContent = p.description;
    body.appendChild(desc);

    if (p.tags && p.tags.length) {
      const tags = document.createElement('div');
      tags.className = 'p-tags';
      p.tags.forEach(t => {
        const s = document.createElement('span');
        s.className = 'p-tag';
        s.textContent = t;
        tags.appendChild(s);
      });
      body.appendChild(tags);
    }

    if (p.link || p.paper) {
      const links = document.createElement('div');
      links.className = 'p-links';
      if (p.link) {
        const a = document.createElement('a');
        a.href = p.link; a.className = 'p-link';
        a.textContent = 'GitHub ↗';
        a.target = '_blank'; a.rel = 'noopener noreferrer';
        links.appendChild(a);
      }
      if (p.paper) {
        const a = document.createElement('a');
        a.href = p.paper; a.className = 'p-link';
        a.textContent = 'arXiv ↗';
        a.target = '_blank'; a.rel = 'noopener noreferrer';
        links.appendChild(a);
      }
      body.appendChild(links);
    }

    li.appendChild(body);

    // Domain badge
    const dom = document.createElement('div');
    dom.className = 'p-domain';
    const badge = document.createElement('span');
    badge.className = 'domain-badge';
    badge.textContent = d.label;
    dom.appendChild(badge);
    li.appendChild(dom);

    frag.appendChild(li);
  });

  list.appendChild(frag);
}

/* Init */
document.addEventListener('DOMContentLoaded', function () {
  renderProjects();
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
