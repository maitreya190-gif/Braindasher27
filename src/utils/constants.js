// Constants
export const GAMES = {
  EIGHT_QUEENS: 1,
  MEMORY_MASTER: 2,
  TOWER_OF_HANOI: 3,
  WORDLE: 4,
  MASTERMIND: 5
};

export const DIFFICULTIES = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  VERY_HARD: 'Very Hard'
};

export const GAME_TIMES = {
  1: 600,  // 10 minutes
  2: 120,  // 2 minutes
  3: 300,  // 5 minutes
  4: 300,  // 5 minutes
  5: 600   // 10 minutes
};

export const MAX_SCORES = {
  1: 1000,   // Eight Queens
  2: 500,    // Memory Master
  3: 800,    // Tower of Hanoi
  4: 1200,   // Wordle
  5: 1500    // Mastermind
};

export const THEME_COLORS = {
  primary: '#FF006E',
  secondary: '#00D9FF',
  accent: '#FFD60A',
  darkBg: '#0A0E27',
  cardBg: '#1A1F3A',
  textLight: '#FFFFFF',
  textMuted: '#9CA3AF'
};

export const MESSAGES = {
  LOADING: 'Loading game...',
  ERROR: 'Something went wrong',
  SUCCESS: 'Success!',
  GAME_OVER: 'Game Over!',
  PLAY_AGAIN: 'Play Again?'
};

// API endpoints (if needed for backend)
export const API_ENDPOINTS = {
  GAMES: '/api/games',
  LEADERBOARD: '/api/leaderboard',
  SCORES: '/api/scores'
};
