import React, { useRef, useState } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { MemoryMasterGame as MemoryLogic } from '../games/memory-master/game';
import './MemoryMaster.css';

function MemoryMasterGame({ onGameEnd, rows = 4, cols = 4 }) {
  const gameRef = useRef(new MemoryLogic(rows, cols));
  const [, setTick] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);
  const endedRef = useRef(false);

  const game = gameRef.current;
  const forceUpdate = () => setTick(t => t + 1);

  const handleCardClick = (index) => {
    if (locked || game.matched[index] || game.flipped[index] || won) return;

    game.flipped[index] = true;
    game.moves++;
    forceUpdate();

    const flippedIndices = game.flipped
      .map((f, i) => (f && !game.matched[i] ? i : -1))
      .filter(i => i !== -1);

    if (flippedIndices.length === 2) {
      const [i1, i2] = flippedIndices;
      setLocked(true);

      setTimeout(() => {
        if (game.cards[i1] === game.cards[i2]) {
          game.matched[i1] = true;
          game.matched[i2] = true;
          game.score += 10;
        }
        game.flipped[i1] = false;
        game.flipped[i2] = false;
        setLocked(false);
        forceUpdate();

        if (game.isSolved()) setWon(true);
      }, 900);
    }
  };

  const handleReset = () => {
    gameRef.current = new MemoryLogic(rows, cols);
    setWon(false);
    setLocked(false);
    endedRef.current = false;
    forceUpdate();
  };

  const handleContinue = () => {
    if (!endedRef.current) {
      endedRef.current = true;
      onGameEnd(game.calculateScore(), true);
    }
  };

  const totalPairs = game.cards.length / 2;
  const matchedPairs = game.matched.filter(m => m).length / 2;

  return (
    <div className="memory-master-container">
      <div className="container">
        <div className="game-layout-memory">
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${game.cols}, 1fr)` }}
          >
            {game.cards.map((card, idx) => (
              <div
                key={idx}
                className={`memory-card ${game.flipped[idx] ? 'flipped' : ''} ${
                  game.matched[idx] ? 'matched' : ''
                }`}
                onClick={() => handleCardClick(idx)}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front">{game.matched[idx] ? '' : '?'}</div>
                  <div className="memory-card-back">{game.matched[idx] ? '' : String.fromCharCode(65 + game.cards[idx])}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-section-memory">
            <ScoreDisplay score={`${matchedPairs}/${totalPairs}`} label="Pairs Found" />
            <div className="stat-box">
              <span className="stat-label">Moves</span>
              <span className="stat-value">{game.moves}</span>
            </div>
            <button className="btn btn-primary" onClick={handleReset} style={{ marginTop: '20px' }}>
              Restart
            </button>
          </div>
        </div>

        {won && (
          <Modal
            isOpen={won}
            title="🎉 All Pairs Found!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={handleContinue}>Continue →</button>}
          >
            <p>Excellent memory! All pairs matched!</p>
            <p style={{ marginTop: '12px' }}>Moves used: <strong>{game.moves}</strong></p>
            <p style={{ color: '#FFD60A' }}>Score: {game.calculateScore()}</p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default MemoryMasterGame;
