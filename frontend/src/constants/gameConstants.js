// src/constants/gameConstants.js

// Game phases
export const GAME_PHASES = {
  COUNTDOWN: "COUNTDOWN",
  IMAGE: "IMAGE", 
  MAP: "MAP",
  RESULT: "RESULT",
};

// UofC campus center coordinates
export const CENTER_UOFC = [-114.130081, 51.07811];

// Default map settings
export const DEFAULT_MAP_CONFIG = {
  zoom: 15,
  style: "mapbox://styles/mapbox/standard",
};

// Game settings
export const GAME_CONFIG = {
  totalRounds: 3,
  countdownDuration: 3,
  imageDisplayDuration: 2000, // 2 seconds
};

// Mapbox API token
export const MAPBOX_TOKEN = "pk.eyJ1Ijoid2VzbGV5bHVpIiwiYSI6ImNtZjRsNDl2NDA2bWoya29pOHUzcHFvaXoifQ.Np_6O32SHiCIaS8Q40rWSA";

// Mapbox GL JS version
export const MAPBOX_VERSION = "v3.14.0";
