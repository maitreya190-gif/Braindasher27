import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

function formatTime(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getMedal(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
}

function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/scores/leaderboard')
      .then(r => r.json())
      .then(data => { setEntries(data); setLoading(false); })
      .catch(() => { setError('Could not load leaderboard — is the server running?'); setLoading(false); });
  }, []);

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <button className="btn btn-primary" onClick={() => navigate('/')}>← Back</button>
        </div>

        <p className="leaderboard-note">
          Ranked by: games completed (↓) · time used (↑) · total score (↓)
        </p>

        {loading && <p className="lb-status">Loading…</p>}
        {error   && <p className="lb-status lb-error">{error}</p>}

        {!loading && !error && entries.length === 0 && (
          <div className="no-scores">
            <p>No results yet — be the first to compete!</p>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Start Competition</button>
          </div>
        )}

        {entries.length > 0 && (
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>PRN</th>
                  <th>Completed</th>
                  <th>Score</th>
                  <th>Time Used</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, idx) => (
                  <tr key={e.id} className={idx < 3 ? `rank-${idx + 1}` : ''}>
                    <td className="rank"><span className="medal">{getMedal(idx + 1)}</span></td>
                    <td className="player-name">{e.prn}</td>
                    <td className="games-count">{e.gamesCompleted} / 15</td>
                    <td className="score">{(e.totalScore || 0).toLocaleString()}</td>
                    <td className="time">{formatTime(e.totalTimeSeconds)}</td>
                    <td className="date">{new Date(e.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
