import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCompetition } from '../context/CompetitionContext';
import { COMPETITION_GAMES, TOTAL_COMPETITION_TIME } from '../games/competitionConfig';
import './Results.css';

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function Results() {
  const { state, dispatch } = useCompetition();
  const navigate = useNavigate();
  const savedRef = useRef(false);
  const [saveStatus, setSaveStatus] = useState('saving'); // 'saving' | 'saved' | 'error'

  const { prn, competition } = state;

  // Guard: must have a PRN
  if (!prn) return <Navigate to="/" replace />;

  const { gameResults, totalTimeUsed: ctxTimeUsed, startTime } = competition;

  // Derive time used robustly — context value may be 0 if state batching delayed END_COMPETITION
  const totalTimeUsed = ctxTimeUsed > 0
    ? ctxTimeUsed
    : startTime
      ? Math.min(Math.floor((Date.now() - startTime) / 1000), TOTAL_COMPETITION_TIME)
      : 0;

  const results = COMPETITION_GAMES.map((g, i) => ({
    ...g,
    ...(gameResults[i] || { score: 0, timeTaken: 0, completed: false, skipped: true }),
  }));

  const gamesCompleted = results.filter(r => r.completed).length;
  const compScore = results.reduce((sum, r) => sum + (r.score || 0), 0);
  const bonusScore = state.bonusScore ?? 0;
  const totalScore = compScore + bonusScore;

  const rank =
    gamesCompleted === COMPETITION_GAMES.length ? '🏆 Champion' :
    gamesCompleted >= 12 ? '⭐ Expert' :
    gamesCompleted >= 9  ? '🎖 Advanced' :
    gamesCompleted >= 6  ? '📈 Intermediate' : '🌱 Beginner';

  // Save once on mount
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    fetch('/api/scores/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prn,
        gamesCompleted,
        totalScore,
        bonusScore,
        totalTimeSeconds: totalTimeUsed,
        gameScores: results.map(r => ({
          gameName: r.game,
          difficulty: r.difficulty,
          score: r.score || 0,
          timeTaken: r.timeTaken || 0,
          completed: !!r.completed,
          skipped: !!r.skipped,
        })),
      }),
    })
      .then(res => {
        if (res.ok) setSaveStatus('saved');
        else setSaveStatus('error');
      })
      .catch(() => setSaveStatus('error'));
  }, []);

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <div className="results-page">
      <div className="results-container">

        {/* Save status banner */}
        {saveStatus === 'saving' && (
          <div className="save-banner saving">⏳ Saving your score…</div>
        )}
        {saveStatus === 'saved' && (
          <div className="save-banner saved">✅ Score saved to leaderboard!</div>
        )}
        {saveStatus === 'error' && (
          <div className="save-banner error">⚠️ Could not reach server — score not saved. Is the backend running?</div>
        )}

        <div className="results-header">
          <div className="results-rank">{rank}</div>
          <h1 className="results-title">Competition Complete!</h1>
          <p className="results-prn">PRN: <strong>{prn}</strong></p>
        </div>

        <div className="results-summary">
          <div className="summary-card">
            <span className="summary-value">{gamesCompleted}/{COMPETITION_GAMES.length}</span>
            <span className="summary-label">Games Solved</span>
          </div>
          {bonusScore > 0 && (
            <div className="summary-card">
              <span className="summary-value" style={{ color: '#22c55e' }}>{bonusScore}</span>
              <span className="summary-label">Bonus Score</span>
            </div>
          )}
          <div className="summary-card highlight">
            <span className="summary-value">{totalScore.toLocaleString()}</span>
            <span className="summary-label">Total Score</span>
          </div>
          <div className="summary-card">
            <span className="summary-value">{formatTime(totalTimeUsed)}</span>
            <span className="summary-label">Time Used</span>
          </div>
        </div>

        <div className="results-table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Game</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.id} className={r.completed ? 'row-done' : r.skipped ? 'row-skip' : 'row-fail'}>
                  <td className="col-num">{i + 1}</td>
                  <td className="col-game">{r.game}</td>
                  <td>
                    <span className={`diff-badge ${r.difficulty.toLowerCase()}`}>{r.difficulty}</span>
                  </td>
                  <td className="col-status">
                    {r.completed ? '✅ Solved' : r.skipped ? '⏭ Skipped' : '❌ Failed'}
                  </td>
                  <td className="col-score">{r.score || 0}</td>
                  <td className="col-time">{r.timeTaken ? formatTime(r.timeTaken) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={() => navigate('/leaderboard')}>
            View Leaderboard 🏆
          </button>
          <button className="btn btn-secondary" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
