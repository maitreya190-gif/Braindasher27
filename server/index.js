const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());

// Save competition result (PRN + scores)
app.post('/api/scores/save', (req, res) => {
  try {
    const { prn, gamesCompleted, totalScore, totalTimeSeconds, gameScores } = req.body;
    if (!prn) return res.status(400).json({ error: 'PRN is required' });
    const result = db.saveResult(prn, gamesCompleted || 0, totalScore || 0, totalTimeSeconds || 0, gameScores);
    console.log(`✅ Score saved — PRN: ${prn}, Completed: ${gamesCompleted}/15, Score: ${totalScore}, Time: ${totalTimeSeconds}s`);
    res.status(201).json({ id: result.id, message: 'Score saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Leaderboard
app.get('/api/scores/leaderboard', (req, res) => {
  res.json(db.getLeaderboard());
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`BrainDasher API → http://localhost:${PORT}`));
