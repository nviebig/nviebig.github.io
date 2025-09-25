(function () {
  const HERO_SECTION_ID = 'section-resume-biography-3';

  const LONDON = {
    name: 'London, UK',
    latitude: 51.5072,
    longitude: -0.1276,
    timezone: 'Europe/London',
  };

  const WEATHER_REFRESH_MS = 15 * 60 * 1000;
  const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LONDON.latitude}&longitude=${LONDON.longitude}&current=temperature_2m,is_day,weather_code&timezone=${encodeURIComponent(LONDON.timezone)}`;

  const weatherCodes = new Map([
    [0, { type: 'clear', label: 'Clear sky' }],
    [1, { type: 'partly', label: 'Mainly clear' }],
    [2, { type: 'partly', label: 'Partly cloudy' }],
    [3, { type: 'cloudy', label: 'Overcast' }],
    [45, { type: 'fog', label: 'Fog' }],
    [48, { type: 'fog', label: 'Freezing fog' }],
    [51, { type: 'drizzle', label: 'Light drizzle' }],
    [53, { type: 'drizzle', label: 'Drizzle' }],
    [55, { type: 'drizzle', label: 'Dense drizzle' }],
    [56, { type: 'drizzle', label: 'Freezing drizzle' }],
    [57, { type: 'drizzle', label: 'Freezing drizzle' }],
    [61, { type: 'rain', label: 'Light rain' }],
    [63, { type: 'rain', label: 'Rain' }],
    [65, { type: 'rain', label: 'Heavy rain' }],
    [66, { type: 'rain', label: 'Freezing rain' }],
    [67, { type: 'rain', label: 'Freezing rain' }],
    [71, { type: 'snow', label: 'Light snow' }],
    [73, { type: 'snow', label: 'Snow' }],
    [75, { type: 'snow', label: 'Heavy snow' }],
    [77, { type: 'snow', label: 'Snow grains' }],
    [80, { type: 'rain', label: 'Rain showers' }],
    [81, { type: 'rain', label: 'Rain showers' }],
    [82, { type: 'rain', label: 'Violent rain' }],
    [85, { type: 'snow', label: 'Snow showers' }],
    [86, { type: 'snow', label: 'Snow showers' }],
    [95, { type: 'storm', label: 'Thunderstorm' }],
    [96, { type: 'storm', label: 'Thunderstorm w/ hail' }],
    [99, { type: 'storm', label: 'Thunderstorm w/ heavy hail' }],
  ]);

  const RAINY_TYPES = new Set(['drizzle', 'rain', 'storm']);
  const SNOW_TYPES = new Set(['snow']);
  const DEFAULT_LEAF_COLORS = ['#f79b3f', '#d76e2f', '#b15a21'];
  const DEFAULT_PETAL_COLORS = ['#ffe5f0', '#ffd1e6', '#ffc4dd'];

  const CONTROL_OPTIONS = [
    { id: null, icon: '🛰️', label: 'Live', title: 'Follow London weather' },
    { id: 'rain', icon: '🌧️', label: 'Rain', title: 'Summon a rainy London afternoon' },
    { id: 'spring', icon: '🌸', label: 'Spring', title: 'Bloomy springtime vibe' },
    { id: 'summer', icon: '☀️', label: 'Summer', title: 'Golden summer evening' },
    { id: 'autumn', icon: '🍂', label: 'Autumn', title: 'Cozy autumn stroll' },
    { id: 'winter', icon: '❄️', label: 'Winter', title: 'Wintry wonderland with festive touches' },
  ];

  const OVERRIDE_LABEL = {
    rain: 'Rain mood',
    spring: 'Spring palette',
    summer: 'Summer palette',
    autumn: 'Autumn palette',
    winter: 'Winter wonderland',
  };

const palettes = {
    day: {
      rainy: {
        skyTop: '#4d5d73',
        skyBottom: '#1f2b3a',
        skylineFar: '#2f3e52',
        skylineNear: '#38485d',
        silhouette: '#2b3b4c',
        midDark: '#3b2c27',
        midLight: '#5a4136',
        accent: '#f5ba6e',
        glow: '#9fb4d3',
        bus: '#c3322e',
        busShade: '#872523',
        busTop: '#d94d3c',
        busWindow: '#141c29',
        busDisplay: '#1c8c44',
        headlight: '#ffd56e',
        roadDark: '#0f141d',
        roadMid: '#1d2836',
        roadLight: '#273647',
        walkway: '#344354',
        puddleHighlight: '#2c5873',
        rainLight: '#d9e7ff',
        rainDark: '#9db8dc',
        lampGlow: '#ffcb6b',
        personCoat: '#0f1e2c',
        personHighlight: '#203248',
        carBody: '#58616f',
        carHighlight: '#9da7b4',
        phoneBooth: '#c42a32',
      },
      clear: {
        skyTop: '#6fa0c7',
        skyBottom: '#c1def5',
        skylineFar: '#4c6681',
        skylineNear: '#5b738d',
        silhouette: '#4c5d73',
        midDark: '#5f4438',
        midLight: '#7b5a49',
        accent: '#f8c57b',
        glow: '#f5f2ec',
        bus: '#d63b34',
        busShade: '#9f2725',
        busTop: '#e15746',
        busWindow: '#19232d',
        busDisplay: '#20a04e',
        headlight: '#ffd973',
        roadDark: '#172231',
        roadMid: '#243445',
        roadLight: '#31506a',
        walkway: '#3d5469',
        puddleHighlight: '#4c7b9e',
        rainLight: '#d6ecff',
        rainDark: '#97bbde',
        lampGlow: '#ffe793',
        personCoat: '#1b2836',
        personHighlight: '#334659',
        carBody: '#6e7887',
        carHighlight: '#aeb6c1',
        phoneBooth: '#d6333c',
      },
      snow: {
        skyTop: '#7ea3bf',
        skyBottom: '#d7e6f3',
        skylineFar: '#637d95',
        skylineNear: '#6f849b',
        silhouette: '#5f7690',
        midDark: '#716057',
        midLight: '#8e7a6e',
        accent: '#f3d6a0',
        glow: '#ffffff',
        bus: '#d34235',
        busShade: '#a22a2b',
        busTop: '#dd5643',
        busWindow: '#23303c',
        busDisplay: '#1f9851',
        headlight: '#ffe9a6',
        roadDark: '#1c293a',
        roadMid: '#2e3c4f',
        roadLight: '#4a637a',
        walkway: '#4f6376',
        puddleHighlight: '#93b6d0',
        rainLight: '#ffffff',
        rainDark: '#d3deeb',
        lampGlow: '#fff0b8',
        personCoat: '#2b3b4c',
        personHighlight: '#43576a',
        carBody: '#8694a0',
        carHighlight: '#c5ced5',
        phoneBooth: '#d63a42',
      },
    },
    night: {
      rainy: {
        skyTop: '#202a3b',
        skyBottom: '#0b141f',
        skylineFar: '#172231',
        skylineNear: '#1e2d40',
        silhouette: '#141f2c',
        midDark: '#291d1a',
        midLight: '#3c2a26',
        accent: '#f0a45a',
        glow: '#6c9fe2',
        bus: '#a01e29',
        busShade: '#711621',
        busTop: '#b8343a',
        busWindow: '#070c13',
        busDisplay: '#16703a',
        headlight: '#ffc860',
        roadDark: '#050a11',
        roadMid: '#111a26',
        roadLight: '#1a2838',
        walkway: '#283646',
        puddleHighlight: '#1d4056',
        rainLight: '#9bb9e3',
        rainDark: '#6a83b0',
        lampGlow: '#ffd269',
        personCoat: '#070e16',
        personHighlight: '#1a2a38',
        carBody: '#343b47',
        carHighlight: '#5b6572',
        phoneBooth: '#9f1d28',
      },
      clear: {
        skyTop: '#253248',
        skyBottom: '#111d2c',
        skylineFar: '#1b2737',
        skylineNear: '#243448',
        silhouette: '#182637',
        midDark: '#302523',
        midLight: '#4c3934',
        accent: '#f2b368',
        glow: '#9ac6ff',
        bus: '#b52831',
        busShade: '#7d1a23',
        busTop: '#c73f3b',
        busWindow: '#0a0f16',
        busDisplay: '#1d8b45',
        headlight: '#ffd879',
        roadDark: '#080f18',
        roadMid: '#152132',
        roadLight: '#213346',
        walkway: '#2c3c50',
        puddleHighlight: '#2d5572',
        rainLight: '#b3cdf0',
        rainDark: '#7f9ac6',
        lampGlow: '#ffd782',
        personCoat: '#121d28',
        personHighlight: '#2a3a4c',
        carBody: '#434d5c',
        carHighlight: '#6e7a8b',
        phoneBooth: '#b12430',
      },
      snow: {
        skyTop: '#2b3b52',
        skyBottom: '#141f30',
        skylineFar: '#223045',
        skylineNear: '#2f4159',
        silhouette: '#1f3146',
        midDark: '#3a2d2a',
        midLight: '#55423f',
        accent: '#efc68a',
        glow: '#b0d4ff',
        bus: '#bd3a3e',
        busShade: '#81252c',
        busTop: '#cc514a',
        busWindow: '#111823',
        busDisplay: '#1c8046',
        headlight: '#ffe6a8',
        roadDark: '#101c2c',
        roadMid: '#1c2a3b',
        roadLight: '#2a3e52',
        walkway: '#2f4155',
        puddleHighlight: '#3e5c74',
        rainLight: '#d5e3f6',
        rainDark: '#a8b9d2',
        lampGlow: '#ffe6a4',
        personCoat: '#1d2d3d',
        personHighlight: '#32455a',
        carBody: '#55616f',
        carHighlight: '#8c98a8',
        phoneBooth: '#a92c34',
      },
    },
};

  palettes.day.spring = {
    ...palettes.day.clear,
    skyTop: '#93d6f5',
    skyBottom: '#eefaff',
    skylineFar: '#7ab5d3',
    skylineNear: '#88c3de',
    silhouette: '#6fa6c3',
    midDark: '#705a43',
    midLight: '#93785c',
    accent: '#ffdca2',
    glow: '#ffffff',
    personCoat: '#2f4860',
    personHighlight: '#445f79',
    carBody: '#87a8c7',
    carHighlight: '#c6d8eb',
    petalColors: ['#ffe0f2', '#ffd2ec', '#ffeeff', '#ffd8e7'],
    leafColors: ['#93c987', '#82bb7a'],
  };

  palettes.night.spring = {
    ...palettes.night.clear,
    skyTop: '#3a4f6b',
    skyBottom: '#233549',
    skylineFar: '#2f4660',
    skylineNear: '#395572',
    silhouette: '#2b425a',
    accent: '#f8d49a',
    glow: '#cde3ff',
    petalColors: ['#f3c8de', '#ddb3ce', '#e7d2e1'],
    leafColors: ['#87b781', '#6fa36d'],
  };

  palettes.day.summer = {
    ...palettes.day.clear,
    skyTop: '#7fcffb',
    skyBottom: '#fdf4c6',
    skylineFar: '#5f91b0',
    skylineNear: '#6c9ec0',
    silhouette: '#567e9b',
    midDark: '#755339',
    midLight: '#a9784b',
    accent: '#ffcf74',
    glow: '#ffecc1',
    personCoat: '#2d3f55',
    personHighlight: '#455a74',
    carBody: '#6282a3',
    carHighlight: '#8fa8c3',
    petalColors: ['#ffe7ef', '#ffd5e3'],
    leafColors: ['#7eb755', '#6cad4b'],
  };

  palettes.night.summer = {
    ...palettes.night.clear,
    skyTop: '#1e2e46',
    skyBottom: '#101d2d',
    skylineFar: '#1d3248',
    skylineNear: '#264058',
    silhouette: '#193047',
    glow: '#ffe1a3',
    petalColors: ['#dcb6c6', '#f0c9d6'],
    leafColors: ['#5d8b3d', '#76a24f'],
  };

  palettes.day.autumn = {
    ...palettes.day.clear,
    skyTop: '#f6c788',
    skyBottom: '#ffe6c4',
    skylineFar: '#d59853',
    skylineNear: '#c0803d',
    silhouette: '#a4682c',
    midDark: '#7d4a24',
    midLight: '#a7662f',
    accent: '#ffad5c',
    glow: '#ffd6a1',
    personCoat: '#3a2b22',
    personHighlight: '#5a4333',
    carBody: '#82583b',
    carHighlight: '#be8a5d',
    leafColors: ['#ffb347', '#ff8743', '#d26f2e', '#c45424'],
  };

  palettes.night.autumn = {
    ...palettes.night.clear,
    skyTop: '#2c1f2a',
    skyBottom: '#1b141f',
    skylineFar: '#37242d',
    skylineNear: '#432f38',
    silhouette: '#2d1e25',
    midDark: '#4f2f1e',
    midLight: '#71432c',
    accent: '#ffad63',
    glow: '#f5c594',
    leafColors: ['#f98b3d', '#d87030', '#c45a28'],
  };

  palettes.day.winter = { ...palettes.day.snow };
  palettes.night.winter = { ...palettes.night.snow };

  const state = {
    section: null,
    container: null,
    canvas: null,
    ctx: null,
    infoEl: null,
    controlsEl: null,
    controlButtons: [],
    pixel: 4,
    gridWidth: 320,
    gridHeight: 180,
    weatherType: 'clear',
    weatherLabel: 'Clear sky',
    weatherOverride: null,
    isDay: true,
    temperature: null,
    timeParts: null,
    stars: [],
    animationId: null,
    isChristmas: false,
    scene: null,
    rainDrops: [],
    shimmerPhase: 0,
    snowCover: 0,
    splashes: [],
    lastFrameTime: null,
  };

  const infoState = {
    location: LONDON.name,
    time: '',
    date: '',
    weather: '',
    temperature: '',
  };

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function init() {
    state.section = document.getElementById(HERO_SECTION_ID);
    if (!state.section) {
      return;
    }

    if (state.section.querySelector('.pixel-weather-container')) {
      return;
    }

    state.section.classList.add('pixel-weather-host');

    state.container = document.createElement('div');
    state.container.className = 'pixel-weather-container';

    state.canvas = document.createElement('canvas');
    state.canvas.className = 'pixel-weather-canvas';
    state.ctx = state.canvas.getContext('2d');
    state.ctx.imageSmoothingEnabled = false;

    state.container.appendChild(state.canvas);
    state.section.prepend(state.container);

    state.infoEl = document.createElement('div');
    state.infoEl.className = 'pixel-weather-info';
    state.infoEl.setAttribute('aria-live', 'polite');
    state.section.appendChild(state.infoEl);

    createControlPanel();
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    updateClock();
    setInterval(updateClock, 1000);

    fetchAndApplyWeather();
    setInterval(fetchAndApplyWeather, WEATHER_REFRESH_MS);

    startAnimationLoop();
  }

  function createControlPanel() {
    const controls = document.createElement('div');
    controls.className = 'pixel-weather-controls';

    CONTROL_OPTIONS.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pixel-weather-controls__button';
      button.dataset.mode = option.id === null ? 'live' : option.id;
      button.title = option.title;
      button.innerHTML = `<span class="pixel-weather-controls__icon" aria-hidden="true">${option.icon}</span><span class="pixel-weather-controls__label">${option.label}</span>`;
      button.addEventListener('click', () => {
        const nextMode = option.id === null ? null : option.id;
        setWeatherOverride(nextMode);
      });
      controls.appendChild(button);
      state.controlButtons.push({ id: option.id, el: button });
    });

    state.section.appendChild(controls);
    state.controlsEl = controls;
    updateControlStates();
  }

  function setWeatherOverride(mode) {
    const newMode = state.weatherOverride === mode ? null : mode;
    state.weatherOverride = newMode;
    updateControlStates();
    configureRain(true);
    seedStars();
  }

  function updateControlStates() {
    state.controlButtons.forEach((button) => {
      const isActive = state.weatherOverride === button.id || (button.id === null && state.weatherOverride === null);
      button.el.classList.toggle('is-active', isActive);
    });
  }

  function effectiveWeatherType() {
    const override = state.weatherOverride;
    if (override === 'rain') {
      return 'rain';
    }
    if (override === 'winter') {
      return 'snow';
    }
    if (override === 'spring' || override === 'summer' || override === 'autumn') {
      return override;
    }
    return state.weatherType;
  }

  function effectiveWeatherLabel() {
    if (!state.weatherOverride) {
      return infoState.weather;
    }
    const override = OVERRIDE_LABEL[state.weatherOverride] ?? state.weatherOverride;
    return `${infoState.weather} → ${override}`;
  }

  function handleResize() {
    if (!state.section) {
      return;
    }

    const rect = state.section.getBoundingClientRect();
    const width = Math.max(320, rect.width || state.section.offsetWidth || window.innerWidth);
    const height = Math.max(240, state.section.offsetHeight || rect.height || window.innerHeight * 0.8);
    const pixelBase = Math.max(3, Math.floor(Math.min(width / 240, height / 140)));
    state.pixel = Math.min(pixelBase, 9);
    state.gridWidth = Math.ceil(width / state.pixel);
    state.gridHeight = Math.ceil(height / state.pixel);

    state.canvas.width = state.gridWidth * state.pixel;
    state.canvas.height = state.gridHeight * state.pixel;
    state.canvas.style.width = '100%';
    state.canvas.style.height = '100%';

    state.ctx.setTransform(state.pixel, 0, 0, state.pixel, 0, 0);
    state.lastFrameTime = null;
    setupSceneLayout();
    seedStars();
    configureRain(true);
  }

  async function fetchAndApplyWeather() {
    try {
      const response = await fetch(WEATHER_URL, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Weather request failed with ${response.status}`);
      }
      const data = await response.json();
      applyWeatherData(data);
    } catch (error) {
      console.warn('Pixel weather fetch failed, falling back to clear sky.', error);
      state.weatherType = 'clear';
      state.weatherLabel = 'Clear sky';
      state.temperature = null;
      state.isDay = true;
      infoState.weather = state.weatherLabel;
      infoState.temperature = '';
      renderInfo();
      configureRain(true);
      seedStars();
    }
  }

  function applyWeatherData(data) {
    const code = Number(data?.current?.weather_code);
    const descriptor = weatherCodes.get(code) ?? weatherCodes.get(0);
    state.weatherType = descriptor.type;
    state.weatherLabel = descriptor.label;
    state.temperature = typeof data?.current?.temperature_2m === 'number'
      ? Math.round(data.current.temperature_2m)
      : null;
    state.isDay = data?.current?.is_day === 1;

    infoState.weather = state.weatherLabel;
    infoState.temperature = state.temperature != null ? `${state.temperature}°C` : '';
    renderInfo();

    configureRain(true);
    seedStars();
  }

  function updateClock() {
    const now = new Date();
    const partsFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: LONDON.timezone,
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const partsEntries = partsFormatter.formatToParts(now).filter((item) => item.type !== 'literal');
    const parts = Object.fromEntries(partsEntries.map((item) => [item.type, item.value]));

    state.timeParts = parts;

    const clockFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: LONDON.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: LONDON.timezone,
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    infoState.time = clockFormatter.format(now);
    infoState.date = dateFormatter.format(now);
    renderInfo();

    updateSeasonalMoments(parts);
  }

  function renderInfo() {
    if (!state.infoEl) {
      return;
    }

    const bits = [
      `<div class="pixel-weather-info__location">${infoState.location}</div>`,
      infoState.time ? `<div class="pixel-weather-info__time">${infoState.time}</div>` : '',
      infoState.date ? `<div class="pixel-weather-info__date">${infoState.date}</div>` : '',
    ];

    const weatherBits = [effectiveWeatherLabel()];
    if (infoState.temperature) {
      weatherBits.push(infoState.temperature);
    }
    bits.push(`<div class="pixel-weather-info__meta">${weatherBits.filter(Boolean).join(' · ')}</div>`);

    state.infoEl.innerHTML = bits.filter(Boolean).join('');
  }

  function setupSceneLayout() {
    const w = state.gridWidth;
    const h = state.gridHeight;
    const horizon = Math.max(24, Math.floor(h * 0.44));
    const roadBaseline = Math.min(h - 6, Math.floor(h * 0.76));
    const roadBottom = h - 2;
    const curbY = Math.max(horizon + 8, Math.floor(h * 0.64));
    const walkwayBaseline = curbY + Math.floor((roadBaseline - curbY) * 0.55);

    const skylineLayers = [];
    for (let layer = 0; layer < 2; layer += 1) {
      const buildings = [];
      let x = -20;
      const baseHeight = Math.floor(horizon * (0.4 + layer * 0.18));
      const baseY = horizon - 6 - layer * 3;
      while (x < w + 20) {
        const width = Math.max(16, Math.floor(Math.random() * 14) + 18);
        const height = Math.max(18, baseHeight + Math.floor(Math.random() * 18) - layer * 6);
        const top = Math.max(4, baseY - height);
        const cap = Math.random() > 0.7 ? 'spire' : Math.random() > 0.7 ? 'gabled' : 'flat';
        buildings.push({ x, width, top, height, cap });
        x += width - Math.floor(Math.random() * 8);
      }
      skylineLayers.push(buildings);
    }

    const midRow = [];
    const rowTopBase = Math.max(6, horizon - Math.floor(h * 0.08));
    const segmentCount = Math.max(4, Math.floor(w / 52));
    const baseStart = Math.floor(w * 0.46);
    for (let i = 0; i < segmentCount; i += 1) {
      const segWidth = Math.max(14, Math.floor(w * 0.12) - i * 2);
      const heightSeg = Math.max(18, Math.floor(h * 0.2) + i * 3);
      const top = rowTopBase - i * 2;
      const x = Math.min(w - segWidth - 10, baseStart + i * Math.floor(segWidth * 0.6));
      midRow.push({ x, width: segWidth, top, height: heightSeg });
    }

    const leftWidth = Math.max(48, Math.min(Math.floor(w * 0.32), w - 64));
    const leftTop = Math.max(4, horizon - Math.floor(h * 0.2));
    const rightWidth = Math.max(20, Math.floor(w * 0.16));
    const rightTop = Math.max(4, horizon - Math.floor(h * 0.18));
    const rightX = w - rightWidth - 4;

    const busWidth = Math.max(36, Math.floor(w * 0.26));
    const busHeight = Math.max(18, Math.floor(busWidth * 0.56));
    const busX = Math.min(w - busWidth - 6, Math.floor(w * 0.6));
    const busY = roadBaseline - busHeight + 2;

    const carWidth = Math.max(22, Math.floor(w * 0.17));
    const carHeight = Math.max(10, Math.floor(carWidth * 0.46));
    const carX = Math.max(leftWidth + 10, Math.floor(w * 0.34));
    const carY = roadBaseline - carHeight + 2;

    const walkerX = carX + Math.floor(carWidth * 0.58);
    const walkerBase = roadBaseline - 1;

    const lampposts = [
      { x: leftWidth + 8, height: Math.floor(h * 0.38) },
      { x: Math.max(busX - 16, leftWidth + 20), height: Math.floor(h * 0.34) },
      { x: Math.min(w - 14, busX + Math.floor(busWidth * 0.92)), height: Math.floor(h * 0.36) },
    ];

    const puddles = [
      { x: Math.max(leftWidth + 6, carX - 12), width: carWidth + 30 },
      { x: Math.max(leftWidth + 14, busX - 10), width: busWidth + 28 },
      { x: leftWidth + 8, width: Math.floor(w * 0.18) },
    ];

    const phoneBooth = {
      x: Math.min(w - 18, leftWidth + 18),
      width: Math.max(8, Math.floor(w * 0.03)),
      height: Math.floor(h * 0.24),
    };

    state.scene = {
      horizon,
      skylineLayers,
      midRow,
      leftBuilding: { x: 0, width: leftWidth, top: leftTop },
      rightBuilding: { x: rightX, width: rightWidth, top: rightTop },
      curbY,
      walkwayBaseline,
      roadBaseline,
      roadBottom,
      bus: { x: busX, y: busY, width: busWidth, height: busHeight },
      car: { x: carX, y: carY, width: carWidth, height: carHeight },
      walker: { x: walkerX, baseY: walkerBase },
      lampposts,
      puddles,
      phoneBooth,
    };
  }

  function startAnimationLoop() {
    function frame(timestamp) {
      if (state.lastFrameTime == null) {
        state.lastFrameTime = timestamp;
      }
      const dt = Math.min(0.12, Math.max(0.016, (timestamp - state.lastFrameTime) / 1000));
      state.lastFrameTime = timestamp;
      updateSimulation(dt);
      drawScene();
      state.animationId = requestAnimationFrame(frame);
    }
    state.animationId = requestAnimationFrame(frame);
  }

  function updateSimulation(dt) {
    state.shimmerPhase += dt * 0.85;
    if (state.shimmerPhase > Math.PI * 2) {
      state.shimmerPhase -= Math.PI * 2;
    }

    const weatherType = effectiveWeatherType();
    if (SNOW_TYPES.has(weatherType)) {
      const accumulationRate = state.weatherOverride === 'winter'
        ? dt * 0.35
        : dt / (60 * 60 * 2);
      state.snowCover = Math.min(1, state.snowCover + accumulationRate);
    } else {
      const meltRate = state.weatherOverride ? dt * 0.5 : dt / (60 * 60 * 1.5);
      state.snowCover = Math.max(0, state.snowCover - meltRate);
    }

    if (!RAINY_TYPES.has(weatherType)) {
      state.splashes = [];
    } else {
      state.splashes = state.splashes.filter((splash) => {
        splash.life += dt;
        return splash.life < splash.maxLife;
      });
    }
  }

  function drawScene() {
    if (!state.ctx || !state.scene) {
      return;
    }

    const ctx = state.ctx;
    ctx.save();
    ctx.setTransform(state.pixel, 0, 0, state.pixel, 0, 0);
    ctx.clearRect(0, 0, state.gridWidth, state.gridHeight);

    const palette = currentPalette();

    drawSky(ctx, palette);
    drawDistantSkyline(ctx, palette);
    drawMidRow(ctx, palette);
    drawLeftBuilding(ctx, palette);
    drawRightBuilding(ctx, palette);
    drawStreet(ctx, palette);
    drawCrosswalk(ctx, palette);
    drawReflections(ctx, palette);
    drawBus(ctx, palette);
    drawCar(ctx, palette);
    drawWalker(ctx, palette);
    drawStreetFurniture(ctx, palette);
    drawPhoneBooth(ctx, palette);
    drawSeasonalDetails(ctx, palette);
    drawRain(ctx, palette);
    drawSplashes(ctx, palette);

    ctx.restore();
  }

  function drawSky(ctx, palette) {
    const steps = Math.max(30, Math.floor(state.gridHeight / 2));
    for (let i = 0; i < steps; i += 1) {
      const t = i / (steps - 1);
      ctx.fillStyle = lerpColor(palette.skyTop, palette.skyBottom, t);
      ctx.fillRect(0, i, state.gridWidth, 1);
    }

    if (!state.isDay) {
      drawStars(ctx);
    }
  }

  function drawStars(ctx) {
    if (!state.stars.length) {
      return;
    }
    ctx.fillStyle = '#f4f7ff';
    state.stars.forEach((star) => {
      const intensity = star.alpha * (0.6 + 0.4 * Math.sin(star.phase));
      ctx.globalAlpha = Math.min(1, Math.max(0.15, intensity));
      ctx.fillRect(star.x, star.y, 1, 1);
      star.phase += star.twinkle;
    });
    ctx.globalAlpha = 1;
  }

  function drawDistantSkyline(ctx, palette) {
    const { skylineLayers, horizon } = state.scene;
    skylineLayers.forEach((buildings, layerIndex) => {
      const baseColor = layerIndex === 0 ? palette.skylineFar : palette.skylineNear;
      buildings.forEach((building) => {
        ctx.fillStyle = baseColor;
        ctx.fillRect(building.x, building.top, building.width, building.height);
        if (building.cap === 'spire') {
          for (let i = 0; i < 3; i += 1) {
            ctx.fillRect(building.x + Math.floor(building.width / 2) - 1 + i % 2, building.top - 4 - i, 1, 1);
          }
        } else if (building.cap === 'gabled') {
          const roofWidth = Math.max(4, Math.floor(building.width / 2));
          const roofX = building.x + Math.floor((building.width - roofWidth) / 2);
          ctx.fillRect(roofX, building.top - 2, roofWidth, 2);
        }
      });
    });

    drawSunOrMoon(ctx, palette);
  }

  function drawMidRow(ctx, palette) {
    const { midRow, curbY } = state.scene;
    midRow.forEach((seg, index) => {
      const baseColor = index % 2 === 0 ? palette.midDark : palette.midLight;
      ctx.fillStyle = baseColor;
      const height = Math.min(seg.height, curbY - seg.top + 18);
      ctx.fillRect(seg.x, seg.top, seg.width, height);

      ctx.fillStyle = '#0f141d';
      ctx.fillRect(seg.x, seg.top + height - 4, seg.width, 4);

      ctx.fillStyle = palette.glow;
      for (let y = seg.top + 8; y < seg.top + height - 10; y += 8) {
        for (let x = seg.x + 3; x < seg.x + seg.width - 4; x += 6) {
          if (Math.random() > 0.4) {
            ctx.fillRect(x, y, 2, 3);
          }
        }
      }
    });
  }

  function drawLeftBuilding(ctx, palette) {
    const { leftBuilding, roadBaseline, curbY } = state.scene;
    ctx.fillStyle = palette.midDark;
    ctx.fillRect(leftBuilding.x, leftBuilding.top, leftBuilding.width, roadBaseline - leftBuilding.top + 24);

    ctx.fillStyle = palette.midLight;
    ctx.fillRect(leftBuilding.width - 12, leftBuilding.top + 6, 8, roadBaseline - leftBuilding.top + 14);

    ctx.fillStyle = '#0f1a24';
    ctx.fillRect(leftBuilding.width - 24, curbY - 12, 30, 8);

    ctx.fillStyle = palette.accent;
    ctx.fillRect(leftBuilding.width - 10, curbY - 48, 6, 36);

    ctx.fillStyle = palette.glow;
    for (let y = leftBuilding.top + 12; y < curbY - 14; y += 6) {
      for (let x = leftBuilding.x + 6; x < leftBuilding.width - 26; x += 6) {
        if ((x + y) % 12 < 6) {
          ctx.fillRect(x, y, 3, 4);
        }
      }
    }
  }

  function drawRightBuilding(ctx, palette) {
    const { rightBuilding, roadBaseline } = state.scene;
    ctx.fillStyle = palette.midLight;
    ctx.fillRect(rightBuilding.x, rightBuilding.top, rightBuilding.width, roadBaseline - rightBuilding.top + 20);

    ctx.fillStyle = palette.midDark;
    ctx.fillRect(rightBuilding.x + rightBuilding.width - 5, rightBuilding.top + 6, 4, roadBaseline - rightBuilding.top + 14);

    ctx.fillStyle = palette.glow;
    for (let y = rightBuilding.top + 12; y < roadBaseline - 12; y += 8) {
      ctx.fillRect(rightBuilding.x + 4, y, 3, 4);
    }
  }

  function drawStreet(ctx, palette) {
    const { curbY, roadBaseline, roadBottom, walkwayBaseline } = state.scene;
    ctx.fillStyle = palette.walkway;
    ctx.fillRect(0, curbY - 8, state.gridWidth, 8);

    ctx.fillStyle = palette.roadMid;
    ctx.fillRect(0, curbY, state.gridWidth, roadBaseline - curbY);

    ctx.fillStyle = palette.roadDark;
    ctx.fillRect(0, roadBaseline, state.gridWidth, roadBottom - roadBaseline + 4);

    ctx.fillStyle = lerpColor(palette.walkway, palette.roadLight, 0.4);
    ctx.fillRect(0, walkwayBaseline, state.gridWidth, Math.max(4, roadBaseline - walkwayBaseline - 4));

    if (state.snowCover > 0) {
      const intensity = Math.min(0.9, state.snowCover * 1.1);
      ctx.globalAlpha = intensity;
      ctx.fillStyle = '#f4f7fb';
      ctx.fillRect(0, walkwayBaseline - 4, state.gridWidth, roadBottom - walkwayBaseline + 6);
      ctx.globalAlpha = 1;
    }

    const weatherType = effectiveWeatherType();
    if (!RAINY_TYPES.has(weatherType) && !SNOW_TYPES.has(weatherType)) {
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = palette.puddleHighlight;
      ctx.fillRect(0, roadBaseline - 4, state.gridWidth, 6);
      ctx.globalAlpha = 1;
    }
  }

  function drawCrosswalk(ctx, palette) {
    const { curbY, roadBaseline } = state.scene;
    const crosswalkY = curbY + Math.floor((roadBaseline - curbY) * 0.35);
    ctx.fillStyle = lerpColor(palette.roadLight, '#ffffff', 0.5);
    for (let i = 0; i < state.gridWidth; i += 9) {
      ctx.fillRect(i + 2, crosswalkY, 5, 1);
    }
  }

  function drawReflections(ctx, palette) {
    const { roadBaseline, roadBottom, puddles, bus, car } = state.scene;
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = palette.roadLight;
    ctx.fillRect(0, roadBaseline, state.gridWidth, roadBottom - roadBaseline + 4);

    ctx.globalAlpha = 0.18 + 0.08 * Math.sin(state.shimmerPhase);
    ctx.fillStyle = palette.puddleHighlight;
    puddles.forEach((puddle) => {
      ctx.fillRect(puddle.x, roadBaseline + 2, puddle.width, Math.max(4, roadBottom - roadBaseline - 2));
    });

    ctx.globalAlpha = 0.28;
    ctx.fillStyle = palette.busShade;
    ctx.fillRect(bus.x + 4, roadBaseline + 4, bus.width - 8, Math.min(16, roadBottom - roadBaseline - 2));
    ctx.fillStyle = palette.headlight;
    ctx.fillRect(bus.x + 6, roadBottom - 6, 4, 2);
    ctx.fillRect(bus.x + bus.width - 10, roadBottom - 6, 4, 2);

    ctx.fillStyle = palette.carHighlight;
    ctx.fillRect(car.x, roadBaseline + 3, car.width, 3);
    ctx.restore();
  }

  function drawBus(ctx, palette) {
    const { bus } = state.scene;
    const deckHeight = Math.floor(bus.height * 0.45);
    const lowerHeight = bus.height - deckHeight - 3;

    ctx.fillStyle = palette.busTop;
    ctx.fillRect(bus.x + 1, bus.y + 1, bus.width - 2, bus.height - 2);

    ctx.fillStyle = palette.bus;
    ctx.fillRect(bus.x + 2, bus.y + 2, bus.width - 4, bus.height - 4);

    ctx.fillStyle = palette.busShade;
    ctx.fillRect(bus.x + 2, bus.y + bus.height - lowerHeight - 3, bus.width - 4, lowerHeight + 1);

    ctx.fillStyle = palette.busWindow;
    ctx.fillRect(bus.x + 6, bus.y + 4, bus.width - 12, deckHeight - 4);

    ctx.fillRect(bus.x + 6, bus.y + deckHeight + 2, bus.width - 12, lowerHeight - 4);

    for (let i = 1; i < 4; i += 1) {
      const dividerUpper = bus.x + 6 + Math.floor((bus.width - 12) / 4) * i;
      ctx.fillStyle = palette.busShade;
      ctx.fillRect(dividerUpper, bus.y + 4, 1, deckHeight - 4);
      ctx.fillRect(dividerUpper, bus.y + deckHeight + 2, 1, lowerHeight - 4);
    }

    ctx.fillStyle = palette.busDisplay;
    ctx.fillRect(bus.x + Math.floor(bus.width * 0.55), bus.y + 6, Math.floor(bus.width * 0.32), 4);

    ctx.fillStyle = palette.headlight;
    ctx.fillRect(bus.x + 6, bus.y + bus.height - 4, 3, 2);
    ctx.fillRect(bus.x + bus.width - 9, bus.y + bus.height - 4, 3, 2);

    ctx.fillStyle = '#0f141d';
    ctx.fillRect(bus.x + 4, bus.y + bus.height - 2, 4, 2);
    ctx.fillRect(bus.x + bus.width - 8, bus.y + bus.height - 2, 4, 2);

    if (state.snowCover > 0) {
      ctx.globalAlpha = Math.min(0.8, state.snowCover * 0.9);
      ctx.fillStyle = '#f7fbff';
      ctx.fillRect(bus.x + 3, bus.y + 1, bus.width - 6, 1);
      ctx.globalAlpha = 1;
    }
  }

  function drawCar(ctx, palette) {
    const { car } = state.scene;
    ctx.fillStyle = palette.carBody;
    ctx.fillRect(car.x + 1, car.y + 1, car.width - 2, car.height - 2);

    ctx.fillStyle = palette.carHighlight;
    ctx.fillRect(car.x + 3, car.y + 2, car.width - 6, Math.floor(car.height / 2));

    ctx.fillStyle = '#0d1118';
    ctx.fillRect(car.x + 3, car.y + car.height - 2, car.width - 6, 2);

    ctx.fillStyle = palette.headlight;
    ctx.fillRect(car.x + car.width - 5, car.y + Math.floor(car.height / 2), 2, 2);
  }

  function drawWalker(ctx, palette) {
    const { walker } = state.scene;
    ctx.fillStyle = palette.personCoat;
    ctx.fillRect(walker.x, walker.baseY - 12, 4, 12);
    ctx.fillRect(walker.x - 1, walker.baseY - 10, 1, 6);
    ctx.fillRect(walker.x + 4, walker.baseY - 10, 1, 6);
    ctx.fillStyle = palette.personHighlight;
    ctx.fillRect(walker.x + 1, walker.baseY - 6, 2, 3);
    ctx.fillRect(walker.x - 1, walker.baseY - 13, 6, 2);
  }

  function drawStreetFurniture(ctx, palette) {
    const { lampposts, curbY, bus } = state.scene;
    lampposts.forEach((lamp) => {
      const topY = curbY - lamp.height;
      ctx.fillStyle = '#0b121a';
      ctx.fillRect(lamp.x, topY, 2, lamp.height);
      ctx.fillRect(lamp.x - 1, topY, 4, 2);
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = palette.lampGlow;
      ctx.fillRect(lamp.x - 2, topY - 3, 6, 4);
      ctx.globalAlpha = 1;
      if (state.snowCover > 0) {
        ctx.globalAlpha = Math.min(0.7, state.snowCover * 0.8);
        ctx.fillStyle = '#f4f8ff';
        ctx.fillRect(lamp.x - 1, topY - 4, 4, 1);
        ctx.globalAlpha = 1;
      }
    });

    const signalX = bus.x - 10;
    const signalHeight = Math.floor(state.gridHeight * 0.24);
    const signalTop = curbY - signalHeight;
    ctx.fillStyle = '#121a25';
    ctx.fillRect(signalX, signalTop, 3, signalHeight);
    ctx.fillStyle = '#181f29';
    ctx.fillRect(signalX - 1, signalTop, 5, 3);
    ctx.fillStyle = '#ff5b5b';
    ctx.fillRect(signalX, signalTop + 4, 3, 3);
    ctx.fillStyle = '#f4d35e';
    ctx.fillRect(signalX, signalTop + 10, 3, 3);
    ctx.fillStyle = '#48c774';
    ctx.fillRect(signalX, signalTop + 16, 3, 3);
  }

  function drawPhoneBooth(ctx, palette) {
    const { phoneBooth, curbY } = state.scene;
    const baseY = curbY - 2;
    const width = phoneBooth.width;
    const height = phoneBooth.height;

    ctx.fillStyle = palette.phoneBooth;
    ctx.fillRect(phoneBooth.x, baseY - height, width, height);

    ctx.fillStyle = lerpColor(palette.phoneBooth, '#ffffff', 0.4);
    ctx.fillRect(phoneBooth.x + 2, baseY - height + 4, width - 4, height - 8);

    ctx.fillStyle = '#1a1f2a';
    for (let y = baseY - height + 10; y < baseY - 8; y += 5) {
      ctx.fillRect(phoneBooth.x + 3, y, width - 6, 2);
    }

    ctx.fillStyle = '#f3ece1';
    ctx.fillRect(phoneBooth.x + 2, baseY - height + 2, width - 4, 2);

    if (state.snowCover > 0) {
      ctx.globalAlpha = Math.min(0.85, state.snowCover);
      ctx.fillStyle = '#f7fbff';
      ctx.fillRect(phoneBooth.x + 1, baseY - height, width - 2, 1);
      ctx.globalAlpha = 1;
    }
  }

  function drawSeasonalDetails(ctx, palette) {
    const festive = state.isChristmas || state.weatherOverride === 'winter';
    if (!festive) {
      return;
    }
    const { curbY } = state.scene;
    const treeBase = curbY - 4;
    const treeX = Math.max(6, Math.floor(state.gridWidth * 0.12));
    const treeHeight = Math.min(18, Math.floor(state.gridHeight * 0.18));
    ctx.fillStyle = '#0f4d2d';
    for (let i = 0; i < 3; i += 1) {
      const width = treeHeight - i * 4;
      ctx.fillRect(treeX - Math.floor(width / 2), treeBase - treeHeight + i * 4, width, 3);
    }
    ctx.fillStyle = '#73482c';
    ctx.fillRect(treeX - 1, treeBase - 2, 2, 4);
    ctx.fillStyle = palette.headlight;
    ctx.fillRect(treeX - 1, treeBase - treeHeight - 2, 2, 2);
  }

  function drawRain(ctx, palette) {
    if (!state.rainDrops.length || !state.scene) {
      return;
    }

    const roadBottom = state.scene.roadBottom;

    state.rainDrops.forEach((drop) => {
      switch (drop.kind) {
        case 'rain': {
          ctx.fillStyle = Math.random() > 0.35 ? (palette.rainLight || '#cfe2ff') : (palette.rainDark || '#8fb0d9');
          const length = Math.max(2, Math.floor(drop.length ?? 4));
          ctx.fillRect(Math.round(drop.x), Math.round(drop.y), drop.width ?? 1, length);
          break;
        }
        case 'snow': {
          ctx.fillStyle = drop.color || palette.rainLight || '#ffffff';
          const size = drop.width ?? 1;
          ctx.fillRect(Math.round(drop.x), Math.round(drop.y), size, size);
          break;
        }
        case 'leaf': {
          const sway = Math.sin(drop.phase ?? 0) * 0.8;
          ctx.fillStyle = drop.color || '#d77c32';
          ctx.globalAlpha = 0.85;
          ctx.fillRect(Math.round(drop.x + sway), Math.round(drop.y), drop.width ?? 2, drop.length ?? 2);
          ctx.globalAlpha = 1;
          drop.phase = (drop.phase ?? 0) + (drop.spin ?? 0);
          break;
        }
        case 'petal': {
          const drift = Math.sin(drop.phase ?? 0) * 0.6;
          ctx.fillStyle = drop.color || '#ffd8e7';
          ctx.globalAlpha = 0.65;
          ctx.fillRect(Math.round(drop.x + drift), Math.round(drop.y), drop.width ?? 2, drop.length ?? 1);
          ctx.globalAlpha = 1;
          drop.phase = (drop.phase ?? 0) + (drop.spin ?? 0);
          break;
        }
        default: {
          ctx.fillStyle = palette.rainLight || '#cfe2ff';
          ctx.fillRect(Math.round(drop.x), Math.round(drop.y), 1, 3);
        }
      }

      drop.y += drop.speed ?? 0.4;
      drop.x += drop.drift ?? 0;

      if (drop.y > roadBottom) {
        if (drop.kind === 'rain') {
          spawnSplash(drop.x);
        }
        resetDrop(drop);
      } else {
        if (drop.x < -6) {
          drop.x = state.gridWidth + 4;
        }
        if (drop.x > state.gridWidth + 6) {
          drop.x = -4;
        }
      }
    });
  }

  function spawnSplash(x) {
    if (!state.scene) {
      return;
    }
    state.splashes.push({
      x,
      life: 0,
      maxLife: 0.35 + Math.random() * 0.3,
    });
    if (state.splashes.length > 200) {
      state.splashes.shift();
    }
  }

  function drawSplashes(ctx, palette) {
    if (!state.splashes.length || !state.scene) {
      return;
    }
    const baseY = state.scene.roadBaseline;
    state.splashes.forEach((splash) => {
      const progress = splash.life / splash.maxLife;
      const spread = 1 + progress * 4;
      ctx.globalAlpha = 0.24 * (1 - progress);
      ctx.fillStyle = palette.rainLight;
      ctx.fillRect(Math.round(splash.x - spread), baseY + 1, Math.round(spread * 2), 1);
      ctx.globalAlpha = 0.18 * (1 - progress);
      ctx.fillStyle = palette.rainDark;
      ctx.fillRect(Math.round(splash.x), baseY + 2, 1, 1);
    });
    ctx.globalAlpha = 1;
  }

  function resetDrop(drop) {
    drop.x = Math.random() * state.gridWidth;
    drop.y = Math.random() * -20;
    applyDropStyle(drop);
  }

  function drawSunOrMoon(ctx, palette) {
    if (!state.timeParts) {
      return;
    }
    const weatherType = effectiveWeatherType();
    if (RAINY_TYPES.has(weatherType)) {
      return;
    }

    const hour = Number(state.timeParts.hour ?? '0');
    const minute = Number(state.timeParts.minute ?? '0');
    const totalHours = hour + minute / 60;

    if (state.isDay) {
      const dayProgress = Math.min(1, Math.max(0, (totalHours - 6) / 12));
      const x = dayProgress * state.gridWidth;
      const y = Math.max(4, Math.floor(state.scene.horizon * 0.35) - Math.sin(Math.PI * dayProgress) * 8);
      drawDisc(ctx, x, y, 5, palette.glow, lerpColor(palette.glow, '#ffffff', 0.3));
    } else {
      const nightProgress = totalHours >= 18 ? (totalHours - 18) / 12 : (totalHours + 6) / 12;
      const x = nightProgress * state.gridWidth;
      const y = Math.max(6, Math.floor(state.scene.horizon * 0.35) - Math.sin(Math.PI * nightProgress) * 6);
      drawDisc(ctx, x, y, 4, palette.glow, lerpColor(palette.glow, '#ffffff', 0.5));
    }
  }

  function drawDisc(ctx, cx, cy, radius, coreColor, glowColor) {
    ctx.fillStyle = glowColor;
    ctx.fillRect(cx - radius - 1, cy - radius - 1, radius * 2 + 2, radius * 2 + 2);
    ctx.fillStyle = coreColor;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  }

  function currentPalette() {
    const group = palettes[state.isDay ? 'day' : 'night'];
    const override = state.weatherOverride;
    if (override) {
      if (override === 'rain') {
        return group.rainy || group.clear;
      }
      if (override === 'winter') {
        return group.winter || group.snow || group.clear;
      }
      if (group[override]) {
        return group[override];
      }
    }

    const weatherType = state.weatherType;
    if (SNOW_TYPES.has(weatherType)) {
      return group.snow || group.winter || group.clear;
    }
    if (RAINY_TYPES.has(weatherType)) {
      return group.rainy || group.clear;
    }
    return group.clear;
  }

  function configureRain(force = false) {
    if (!state.scene) {
      return;
    }

    const override = state.weatherOverride;
    const liveType = state.weatherType;
    let densityFactor = 0;
    let kind = null;

    if (override === 'rain') {
      kind = 'rain';
      densityFactor = 0.24;
    } else if (override === 'winter') {
      kind = 'snow';
      densityFactor = 0.16;
    } else if (override === 'spring') {
      kind = 'petal';
      densityFactor = 0.06;
    } else if (override === 'autumn') {
      kind = 'leaf';
      densityFactor = 0.08;
    } else if (override === 'summer') {
      densityFactor = 0;
    } else {
      if (RAINY_TYPES.has(liveType)) {
        kind = 'rain';
        densityFactor = liveType === 'storm' ? 0.32 : liveType === 'drizzle' ? 0.12 : 0.22;
      } else if (SNOW_TYPES.has(liveType)) {
        kind = 'snow';
        densityFactor = 0.14;
      } else {
        densityFactor = 0;
      }
    }

    const target = Math.floor(state.gridWidth * state.gridHeight * densityFactor / 24);
    if (target <= 0 || !kind) {
      state.rainDrops = [];
      return;
    }

    if (!force && state.rainDrops.length === target && state.rainDrops.every((drop) => drop.kind === kind)) {
      return;
    }

    state.rainDrops = [];
    for (let i = 0; i < target; i += 1) {
      state.rainDrops.push(createDrop(kind));
    }
  }

  function createDrop(kind) {
    const drop = {
      kind,
      x: Math.random() * state.gridWidth,
      y: Math.random() * state.gridHeight,
    };
    applyDropStyle(drop);
    return drop;
  }

  function applyDropStyle(drop) {
    const palette = currentPalette();
    const leafColors = palette.leafColors || DEFAULT_LEAF_COLORS;
    const petalColors = palette.petalColors || DEFAULT_PETAL_COLORS;

    drop.phase = Math.random() * Math.PI * 2;

    switch (drop.kind) {
      case 'rain':
        drop.width = 1;
        drop.length = Math.random() * 6 + 5;
        drop.speed = 0.8 + Math.random() * 0.7;
        drop.drift = 0;
        break;
      case 'snow':
        drop.width = Math.random() > 0.6 ? 2 : 1;
        drop.length = drop.width;
        drop.speed = 0.2 + Math.random() * 0.2;
        drop.drift = (Math.random() - 0.5) * 0.15;
        drop.color = palette.rainLight || '#ffffff';
        break;
      case 'leaf':
        drop.width = 2;
        drop.length = 2;
        drop.speed = 0.25 + Math.random() * 0.2;
        drop.drift = (Math.random() - 0.5) * 0.3;
        drop.color = leafColors[Math.floor(Math.random() * leafColors.length)];
        drop.spin = (Math.random() - 0.5) * 0.12;
        break;
      case 'petal':
        drop.width = 2;
        drop.length = 1;
        drop.speed = 0.18 + Math.random() * 0.15;
        drop.drift = (Math.random() - 0.5) * 0.2;
        drop.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        drop.spin = (Math.random() - 0.5) * 0.08;
        break;
      default:
        drop.width = 1;
        drop.length = 4;
        drop.speed = 0.4;
        drop.drift = 0;
    }
  }

  function seedStars() {
    const count = state.isDay ? 0 : Math.floor(state.gridWidth / 2);
    const stars = [];
    for (let i = 0; i < count; i += 1) {
      stars.push({
        x: Math.random() * state.gridWidth,
        y: Math.random() * Math.max(50, state.scene ? state.scene.horizon * 0.8 : state.gridHeight * 0.4),
        alpha: 0.5 + Math.random() * 0.5,
        twinkle: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }
    state.stars = stars;
  }

  function updateSeasonalMoments(parts) {
    const day = Number(parts.day ?? '0');
    const month = Number(parts.month ?? '0');
    const christmas = month === 12 && day >= 24 && day <= 26;
    state.isChristmas = christmas;
  }

  function lerpColor(start, end, t) {
    const sr = parseInt(start.slice(1, 3), 16);
    const sg = parseInt(start.slice(3, 5), 16);
    const sb = parseInt(start.slice(5, 7), 16);
    const er = parseInt(end.slice(1, 3), 16);
    const eg = parseInt(end.slice(3, 5), 16);
    const eb = parseInt(end.slice(5, 7), 16);

    const r = Math.round(sr + (er - sr) * t).toString(16).padStart(2, '0');
    const g = Math.round(sg + (eg - sg) * t).toString(16).padStart(2, '0');
    const b = Math.round(sb + (eb - sb) * t).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  onReady(init);
})();
