import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreDisplay from '../components/ScoreDisplay';
import './GameResult.css';

function GameResult({ score }) {
  const navigate = useNavigate();

  if (!score) {
    return (
      <div className="game-result-page">
        <div className="container">
          <div className="no-result">
            <p>No game result to display</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getScoreRating = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { text: 'Outstanding!', emoji: '🤩', color: '#FFD700' };
    if (percentage >= 75) return { text: 'Excellent!', emoji: '😄', color: '#10B981' };
    if (percentage >= 60) return { text: 'Good Job!', emoji: '😊', color: '#F59E0B' };
    if (percentage >= 45) return { text: 'Nice Try!', emoji: '😌', color: '#3B82F6' };
    return { text: 'Keep Trying!', emoji: '💪', color: '#EF4444' };
  };

  const rating = getScoreRating(score.score, 1500);

  return (
    <div className="game-result-page">
      <div className="container">
        <div className="result-card">
          <div className="result-emoji" style={{ color: rating.color }}>
            {rating.emoji}
          </div>
          
          <h2 className="result-title">{rating.text}</h2>
          
          <div className="result-details">
            <div className="detail">
              <span className="label">Game</span>
              <span className="value">{score.gameName}</span>
            </div>
            <div className="detail">
              <span className="label">Difficulty</span>
              <span className={`difficulty ${score.difficulty.toLowerCase().replace(' ', '')}`}>
                {score.difficulty}
              </span>
            </div>
            <div className="detail">
              <span className="label">Time Taken</span>
              <span className="value">{score.time}s</span>
            </div>
            <div className="detail">
              <span className="label">Date</span>
              <span className="value">{score.date}</span>
            </div>
          </div>

          <div className="score-display-large">
            <ScoreDisplay score={score.score} label="Final Score" />
          </div>

          <div className="result-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              ← Play Another Game
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/leaderboard')}>
              View Leaderboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
