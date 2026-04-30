import React, { useRef, useState } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { CircleOfHanoiGame } from '../games/circle-of-hanoi/game';
import './CircleOfHanoi.css';

function CircleOfHanoiGame({ onGameEnd, discCount = 3 }) {
  const gameRef = useRef(new CircleOfHanoiGame(discCount, Math.random() * 10000));
  const [, setTick] = useState(0);
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [won, setWon] = useState(false);
  const [invalidMove, setInvalidMove] = useState(false);
  const endedRef = useRef(false);

  const game = gameRef.current;
  const forceUpdate = () => setTick(t => t + 1);

  const handlePegClick = (pegIndex) => {
    if (won) return;
    setInvalidMove(false);

    if (selectedPeg === null) {
      if (game.pegs[pegIndex].length > 0) setSelectedPeg(pegIndex);
    } else if (selectedPeg === pegIndex) {
      setSelectedPeg(null);
    } else {
      // In circle, can only move to adjacent pegs
      if (!game.isAdjacentInCircle(selectedPeg, pegIndex)) {
        setInvalidMove(true);
        setTimeout(() => setInvalidMove(false), 600);
        return;
      }

      if (game.moveDisk(selectedPeg, pegIndex)) {
        forceUpdate();
        if (game.isSolved()) setWon(true);
      }
      setSelectedPeg(null);
    }
  };

  const handleReset = () => {
    gameRef.current = new CircleOfHanoiGame(discCount, Math.random() * 10000);
    setSelectedPeg(null);
    setWon(false);
    setInvalidMove(false);
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
    <div className="circle-hanoi-container">
      <div className="container">
        <div className="circle-hanoi-layout">
          {/* Circular arrangement of pegs */}
          <div className="circle-board">
            {game.pegs.map((peg, idx) => {
              const angle = (idx * 120) * (Math.PI / 180); // 120° apart
              const x = Math.cos(angle) * 140;
              const y = Math.sin(angle) * 140;
              return (
                <div
                  key={idx}
                  className={`peg-node ${selectedPeg === idx ? 'selected' : ''} ${invalidMove ? 'invalid' : ''}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  onClick={() => handlePegClick(idx)}
                >
                  <div className="peg-name">{game.pegNames[idx]}</div>
                  <div className="disks-stack-circle">
                    {peg.map((disk, diskIdx) => (
                      <div
                        key={diskIdx}
                        className="disk-circle"
                        style={{
                          width: `${25 + disk * 18}px`,
                          backgroundColor: `hsl(${disk * (360 / discCount)}, 85%, 55%)`
                        }}
                      >
                        {disk}
                      </div>
                    ))}
                  </div>
                  <div className="peg-base" />
                </div>
              );
            })}
            {/* Draw circle lines showing adjacency */}
            <svg className="circle-guide">
              <circle cx="160" cy="160" r="140" stroke="rgba(212,175,55,0.15)" strokeWidth="2" fill="none" />
              {[0, 1, 2].map(i => {
                const angle = (i * 120) * (Math.PI / 180);
                const x = 160 + Math.cos(angle) * 140;
                const y = 160 + Math.sin(angle) * 140;
                return (
                  <circle key={i} cx={x} cy={y} r="3" fill="rgba(212,175,55,0.3)" />
                );
              })}
            </svg>
          </div>

          <div className="stats-section-circle">
            <ScoreDisplay score={game.moves} label="Moves Made" />
            <div className="stat-box">
              <span className="stat-label">Min Moves</span>
              <span className="stat-value">{game.getMinimumMoves()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Discs</span>
              <span className="stat-value">{game.diskCount}</span>
            </div>
            <div className="stat-box" style={{ fontSize: '0.75rem', color: '#FFD60A', padding: '8px', borderRadius: '6px', background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.3)' }}>
              💡 Move discs only to adjacent pegs (circular)
            </div>
            <div className="controls-circle">
              <button className="btn btn-primary" onClick={handleReset}>Reset</button>
              <button className="btn btn-accent" onClick={handleUndo}>Undo</button>
            </div>
          </div>
        </div>

        {won && (
          <Modal
            isOpen={won}
            title="🎉 Circle Solved!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={handleContinue}>Continue →</button>}
          >
            <p>All discs moved to peg B (target in the circle)!</p>
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

export default CircleOfHanoiGame;
