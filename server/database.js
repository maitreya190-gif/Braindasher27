const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const RESULTS_FILE = path.join(DATA_DIR, 'results.json');

function loadResults() {
  try { return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8')); }
  catch { return []; }
}

function saveResults(data) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

const db = {
  saveResult(prn, gamesCompleted, totalScore, totalTimeSeconds, gameScores) {
    const results = loadResults();
    const entry = {
      id: Date.now(),
      prn: prn.toString().trim().toUpperCase(),
      gamesCompleted,
      totalScore,
      totalTimeSeconds,
      gameScores: gameScores || [],
      submittedAt: new Date().toISOString(),
    };
    results.push(entry);
    saveResults(results);
    return entry;
  },

  getLeaderboard() {
    return loadResults()
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 50);
  },
};

module.exports = db;
