---
title: ""
date: 2022-10-24
type: landing

design:
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      username: admin
      text: ""
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false

  - block: markdown
    content:
      title: '🌍 Projects & Direction'
      text: |-
        I’m a master’s student in Physics at [ETH Zurich](https://ethz.ch/en.html), focusing on **scientific computing**, **climate modeling**, and **planetary systems**.

        So far, I’ve worked on:
        - 🛰️ **Grating nuller prototyping** for the [LIFE Mission](https://life-space-mission.com), with Fourier optics simulations and experimental calibration for exoplanet interferometry.
        - 🌿 **Bayesian wildfire modeling** across the Amazon Basin, forecasting spatio-temporal fire risk from meteorological and land-use data.
        - 🌍 **Geospatial dashboard** for the Sahel (START Hack 2025), combining 20 years of land productivity, rainfall, and population data for sustainable land use.
        - 🪐 **Coronagraph simulation tool** to optimize JWST data pipelines.
  
        My long-term interest is leveraging hybrid physics–ML models to Earth’s climate and exoplanetary systems — blending *theoretical physics*, *scientific software*, and *real-world impact* with the goal of understanding our planet better.

  - block: markdown
    content:
      title: '🧠 Skills'
      text: |-
        **Programming**
        - Python (NumPy, Pandas, ODR, Matplotlib, PyTorch)
        - Julia (Differentiable programming, scientific computing)
        - C++, Bash

        **Scientific & Technical**
        - Scientific ML
        - Dynamical systems and PDEs
        - Climate models (SpeedyWeather.jl, OpenIFS)
        - LaTeX, Markdown

        **Other**
        - Fluent in English and German
        - Microsoft Office Suite
        - Git, GitHub, Linux shell

  - block: markdown
    content:
      title: '📄 CV Snapshot'
      text: |-
        - MSc Physics at ETH Zurich, Thesis at Oxford (Climate ML)
        - BSc Physics at ETH Zurich
        - Research Analyst Intern @ Strategy& (PwC)
        - START Hack 2025 winner (UNCCD/G20 track)

        Full CV available [here](uploads/resume.pdf).
---