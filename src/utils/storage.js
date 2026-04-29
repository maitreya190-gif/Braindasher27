// Local storage utilities
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Player data management
export const getPlayerName = (defaultName = 'Player') => {
  return getItem('braindasher_player_name', defaultName);
};

export const setPlayerName = (name) => {
  return setItem('braindasher_player_name', name);
};

// Leaderboard management
export const getLeaderboard = () => {
  return getItem('braindasher_leaderboard', []);
};

export const saveLeaderboard = (scores) => {
  return setItem('braindasher_leaderboard', scores);
};

// Game progress
export const saveGameProgress = (gameId, progress) => {
  const key = `braindasher_progress_${gameId}`;
  return setItem(key, progress);
};

export const getGameProgress = (gameId) => {
  const key = `braindasher_progress_${gameId}`;
  return getItem(key, null);
};
