import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

function Leaderboard({ scores }) {
  const [sortedScores, setSortedScores] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = scores;

    if (filter !== 'all') {
      filtered = scores.filter(s => s.gameName === filter);
    }

    const sorted = filtered.sort((a, b) => b.score - a.score);
    setSortedScores(sorted);
  }, [scores, filter]);

  const games = ['all', 'Eight Queens', 'Memory Master', 'Tower of Hanoi', 'Wordle', 'Mastermind'];

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            ← Back to Games
          </button>
        </div>

        <div className="leaderboard-filters">
          {games.map(game => (
            <button
              key={game}
              className={`filter-btn ${filter === game ? 'active' : ''}`}
              onClick={() => setFilter(game)}
            >
              {game === 'all' ? 'All Games' : game}
            </button>
          ))}
        </div>

        {sortedScores.length === 0 ? (
          <div className="no-scores">
            <p>No scores yet. Play a game to get started!</p>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Play Games
            </button>
          </div>
        ) : (
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Game</th>
                  <th>Difficulty</th>
                  <th>Score</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedScores.map((entry, idx) => (
                  <tr key={entry.id} className={idx < 3 ? `rank-${idx + 1}` : ''}>
                    <td className="rank">
                      <span className="medal">{getMedalEmoji(idx + 1)}</span>
                    </td>
                    <td className="player-name">{entry.playerName}</td>
                    <td className="game-name">{entry.gameName}</td>
                    <td>
                      <span className={`difficulty ${entry.difficulty.toLowerCase().replace(' ', '')}`}>
                        {entry.difficulty}
                      </span>
                    </td>
                    <td className="score">{entry.score}</td>
                    <td className="time">{entry.time}s</td>
                    <td className="date">{entry.date}</td>
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
