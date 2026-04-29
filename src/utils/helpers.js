// Score calculation utilities
export const calculateScore = (baseScore, timeUsed, timeLimit, efficiency) => {
  const timeBonus = Math.max(0, (1 - timeUsed / timeLimit) * 100);
  const efficiencyBonus = efficiency * 100;
  return Math.round(baseScore + timeBonus + efficiencyBonus);
};

// Format time in seconds to MM:SS
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// Get color based on score percentage
export const getScoreColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return '#FFD700'; // Gold
  if (percentage >= 75) return '#10B981'; // Green
  if (percentage >= 60) return '#F59E0B'; // Orange
  if (percentage >= 45) return '#3B82F6'; // Blue
  return '#EF4444'; // Red
};

// Get difficulty badge color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    'Easy': '#10B981',
    'Medium': '#F59E0B',
    'Hard': '#EF4444',
    'Very Hard': '#A855F7'
  };
  return colors[difficulty] || '#6B7280';
};

// Shuffle array
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Debounce function
export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// Throttle function
export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
