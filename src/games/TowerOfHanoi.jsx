import React, { useRef, useState } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { TowerOfHanoiGame as HanoiLogic } from '../games/tower-of-hanoi/game';
import './TowerOfHanoi.css';

function TowerOfHanoiGame({ onGameEnd, discCount = 3 }) {
  const gameRef = useRef(new HanoiLogic(discCount, Math.random() * 10000));
  const [, setTick] = useState(0);
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [won, setWon] = useState(false);
  const endedRef = useRef(false);

  const game = gameRef.current;
  const forceUpdate = () => setTick(t => t + 1);

  const handlePegClick = (pegIndex) => {
    if (won) return;

    if (selectedPeg === null) {
      if (game.pegs[pegIndex].length > 0) setSelectedPeg(pegIndex);
    } else if (selectedPeg === pegIndex) {
      setSelectedPeg(null);
    } else {
      if (game.moveDisk(selectedPeg, pegIndex)) {
        forceUpdate();
        if (game.isSolved()) setWon(true);
      }
      setSelectedPeg(null);
    }
  };

  const handleReset = () => {
    gameRef.current = new HanoiLogic(discCount);
    setSelectedPeg(null);
    setWon(false);
    endedRef.current = false;
    forceUpdate();
  };

  const handleUndo = () => {
    game.undo();
    forceUpdate();
  };

  const handleContinue = () => {
    if (!endedRef.current) {
      endedRef.current = true;
      onGameEnd(game.calculateScore(), true);
    }
  };

  return (
    <div className="hanoi-container">
      <div className="container">
        <div className="game-layout-hanoi">
          <div className="hanoi-board">
            {game.pegs.map((peg, idx) => (
              <div key={idx} className="peg-container" onClick={() => handlePegClick(idx)}>
                <div className={`peg ${selectedPeg === idx ? 'selected' : ''}`}>
                  <div className="peg-name">{game.pegNames[idx]}</div>
                  <div className="disks-stack">
                    {peg.map((disk, diskIdx) => (
                      <div
                        key={diskIdx}
                        className="disk"
                        style={{
                          width: `${30 + disk * 25}px`,
                          backgroundColor: `hsl(${disk * (360 / discCount)}, 85%, 55%)`
                        }}
                      >
                        {disk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-section-hanoi">
            <ScoreDisplay score={game.moves} label="Moves Made" />
            <div className="stat-box">
              <span className="stat-label">Minimum</span>
              <span className="stat-value">{game.getMinimumMoves()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Discs</span>
              <span className="stat-value">{game.diskCount}</span>
            </div>
            <div className="controls-hanoi">
              <button className="btn btn-primary" onClick={handleReset}>Reset</button>
              <button className="btn btn-accent" onClick={handleUndo}>Undo</button>
            </div>
          </div>
        </div>

        {won && (
          <Modal
            isOpen={won}
            title="🎉 Solved!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={handleContinue}>Continue →</button>}
          >
            <p>All discs moved to peg C!</p>
            <p style={{ marginTop: '12px' }}>
              Moves: <strong>{game.moves}</strong> (min: {game.getMinimumMoves()})
            </p>
            <p style={{ color: '#FFD60A' }}>
              {game.moves <= game.getMinimumMoves() ? '⭐ Perfect solution!' : '✓ Solved!'}
            </p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TowerOfHanoiGame;
