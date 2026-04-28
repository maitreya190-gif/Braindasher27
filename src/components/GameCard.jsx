import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

function GameCard({ game, onClick }) {
  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty.toLowerCase().replace(' ', '')}`;
  };

  return (
    <Link to={`/game/${game.id}`} className="game-card-link">
      <div className="game-card" onClick={onClick}>
        <div className="game-card-icon">{game.icon}</div>
        <h3 className="game-card-title">{game.title}</h3>
        <p className="game-card-description">{game.description}</p>
        
        <div className={`game-card-difficulty ${getDifficultyClass(game.difficulty)}`}>
          {game.difficulty}
        </div>

        <div className="game-card-stats">
          <div className="stat">
            <span className="stat-label">Max Score</span>
            <span className="stat-value">{game.maxScore}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Time</span>
            <span className="stat-value">{game.timeLimit}s</span>
          </div>
        </div>

        <div className="game-card-skills">
          {game.skills.map((skill, idx) => (
            <span key={idx} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
