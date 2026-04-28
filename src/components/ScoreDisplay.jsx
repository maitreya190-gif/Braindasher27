import React from 'react';
import './ScoreDisplay.css';

function ScoreDisplay({ score, label = 'Score' }) {
  return (
    <div className="score-display">
      <div className="score-value">{score}</div>
      <div className="score-label">{label}</div>
    </div>
  );
}

export default ScoreDisplay;
