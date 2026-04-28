import React, { useState, useEffect } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { MemoryMasterGame } from '../games/memory-master/game';
import './MemoryMaster.css';

function MemoryMasterGame({ onGameEnd, timeLimit }) {
  const [game, setGame] = useState(new MemoryMasterGame('easy'));
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const handleCardClick = (index) => {
    const newGame = { ...game };
    if (newGame.flipCard(index)) {
      setMoves(newGame.moves);
      setScore(newGame.score);

      if (newGame.isSolved()) {
        setWon(true);
        setTimeout(() => {
          const finalScore = newGame.calculateScore();
          onGameEnd(finalScore);
        }, 1000);
      }
    }
    setGame(newGame);
  };

  const handleReset = () => {
    const newGame = new MemoryMasterGame('easy');
    setGame(newGame);
    setScore(0);
    setMoves(0);
  };

  const gridSize = Math.sqrt(game.cards.length);

  return (
    <div className="memory-master-container">
      <div className="container">
        <div className="game-header">
          <h2>🧠 Memory Master</h2>
          <p>Match all pairs to win</p>
        </div>

        <div className="game-layout-memory">
          <div className="memory-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {game.cards.map((card, idx) => (
              <div
                key={idx}
                className={`memory-card ${game.flipped[idx] ? 'flipped' : ''} ${
                  game.matched[idx] ? 'matched' : ''
                }`}
                onClick={() => handleCardClick(idx)}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front">?</div>
                  <div className="memory-card-back">{String.fromCharCode(65 + game.cards[idx])}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-section-memory">
            <ScoreDisplay score={score} label="Score" />
            <div className="stat-box">
              <span className="stat-label">Moves</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Matched</span>
              <span className="stat-value">{game.matched.filter(m => m).length}/8</span>
            </div>
            <button className="btn btn-primary" onClick={handleReset} style={{ marginTop: '20px' }}>
              Restart
            </button>
          </div>
        </div>

        {won && (
          <Modal 
            isOpen={won}
            title="🎉 You Won!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={() => onGameEnd(score)}>Continue</button>}
          >
            <p>Excellent memory! All pairs matched!</p>
            <p style={{marginTop: '15px'}}>Final Score: <strong>{score}</strong></p>
            <p style={{color: '#FFD60A', marginTop: '10px'}}>Moves Used: {moves}</p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default MemoryMasterGame;
