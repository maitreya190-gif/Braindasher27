import React, { useRef, useState } from 'react';
import Modal from '../components/Modal';
import { MastermindGame as MastermindLogic } from '../games/mastermind/game';
import './Mastermind.css';

const ALL_COLORS = [
  { id: 0, name: 'Red',    hex: '#EF4444' },
  { id: 1, name: 'Blue',   hex: '#3B82F6' },
  { id: 2, name: 'Green',  hex: '#10B981' },
  { id: 3, name: 'Yellow', hex: '#F59E0B' },
  { id: 4, name: 'Purple', hex: '#A855F7' },
  { id: 5, name: 'Pink',   hex: '#EC4899' },
  { id: 6, name: 'Orange', hex: '#F97316' },
  { id: 7, name: 'Cyan',   hex: '#06B6D4' },
];

function MastermindGame({ onGameEnd, codeLength = 4, numColors = 6, maxAttempts = 10 }) {
  const gameRef = useRef(new MastermindLogic(codeLength, numColors, maxAttempts));
  const [, setTick] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(() => Array(codeLength).fill(null));
  const [activeSlot, setActiveSlot] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const endedRef = useRef(false);

  const game = gameRef.current;
  const forceUpdate = () => setTick(t => t + 1);
  const colors = ALL_COLORS.slice(0, numColors);

  const handleSlotClick = (pos) => {
    setActiveSlot(pos);
  };

  const handleColorClick = (colorId) => {
    setCurrentGuess(prev => {
      const g = [...prev];
      g[activeSlot] = colorId;
      return g;
    });
    // Auto-advance to next empty slot, or next slot
    const nextEmpty = currentGuess.findIndex((c, i) => i > activeSlot && c === null);
    if (nextEmpty !== -1) setActiveSlot(nextEmpty);
    else {
      const anyEmpty = currentGuess.findIndex((c, i) => i !== activeSlot && c === null);
      if (anyEmpty !== -1) setActiveSlot(anyEmpty);
    }
  };

  const handleSubmit = () => {
    if (game.gameOver || currentGuess.includes(null)) return;
    const feedback = game.makeGuess([...currentGuess]);
    if (!feedback) return;
    forceUpdate();
    setCurrentGuess(Array(codeLength).fill(null));
    setActiveSlot(0);
    if (game.won) setWon(true);
    else if (game.gameOver) setLost(true);
  };

  const handleContinue = (completed) => {
    if (!endedRef.current) {
      endedRef.current = true;
      onGameEnd(completed ? game.calculateScore() : 0, completed);
    }
  };

  const allFilled = !currentGuess.includes(null);
  const attemptsLeft = game.maxAttempts - game.attempts.length;

  return (
    <div className="mastermind-container">
      <div className="container">
        <div className="mm-layout">

          {/* ── Board: past attempts ─────────────────────────── */}
          <div className="mm-board">
            <div className="mm-attempts">
              {game.attempts.length === 0 && (
                <p className="mm-empty">Select colours below and submit your first guess.</p>
              )}
              {game.attempts.map((attempt, idx) => (
                <div key={idx} className="mm-row past">
                  <span className="mm-row-num">{idx + 1}</span>
                  <div className="mm-pegs">
                    {attempt.guess.map((colorId, pos) => (
                      <div
                        key={pos}
                        className="mm-peg"
                        style={{ backgroundColor: ALL_COLORS[colorId].hex }}
                        title={ALL_COLORS[colorId].name}
                      />
                    ))}
                  </div>
                  <div className="mm-feedback">
                    <span className="mm-fb-item mm-correct" title="Right colour, right position">
                      ● {attempt.feedback.correctPosition}
                    </span>
                    <span className="mm-fb-item mm-present" title="Right colour, wrong position">
                      ○ {attempt.feedback.correctColor}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Current guess row ─────────────────────────── */}
            {!game.gameOver && (
              <div className="mm-current">
                <p className="mm-hint">Click a slot, then pick a colour</p>
                <div className="mm-row active-row">
                  <span className="mm-row-num">{game.attempts.length + 1}</span>
                  <div className="mm-pegs">
                    {currentGuess.map((colorId, pos) => (
                      <div
                        key={pos}
                        className={`mm-peg mm-peg-input ${activeSlot === pos ? 'mm-peg-active' : ''} ${colorId === null ? 'mm-peg-empty' : ''}`}
                        style={colorId !== null ? { backgroundColor: ALL_COLORS[colorId].hex } : {}}
                        onClick={() => handleSlotClick(pos)}
                        title={colorId !== null ? ALL_COLORS[colorId].name : `Slot ${pos + 1}`}
                      >
                        {colorId === null && (pos === activeSlot ? '▾' : '')}
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary mm-submit"
                    onClick={handleSubmit}
                    disabled={!allFilled}
                  >
                    Submit
                  </button>
                </div>

                {/* ── Colour palette ─────────────────────────── */}
                <div className="mm-palette">
                  {colors.map(color => (
                    <button
                      key={color.id}
                      className="mm-color-btn"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleColorClick(color.id)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <div className="mm-sidebar">
            <div className="stat-box">
              <span className="stat-label">Attempts Left</span>
              <span className="stat-value">{attemptsLeft}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Used</span>
              <span className="stat-value">{game.attempts.length}/{game.maxAttempts}</span>
            </div>
            <div className="mm-legend">
              <p className="mm-legend-title">Feedback</p>
              <div className="mm-legend-row">
                <span className="mm-correct">●</span>
                <span>Right colour + position</span>
              </div>
              <div className="mm-legend-row">
                <span className="mm-present">○</span>
                <span>Right colour, wrong position</span>
              </div>
            </div>
          </div>
        </div>

        {won && (
          <Modal
            isOpen={won}
            title="🎉 Code Cracked!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={() => handleContinue(true)}>Continue →</button>}
          >
            <p>Solved in <strong>{game.attempts.length}</strong> attempt{game.attempts.length !== 1 ? 's' : ''}!</p>
            <p style={{ color: '#d4af37', marginTop: '10px' }}>Score: {game.calculateScore()}</p>
          </Modal>
        )}

        {lost && (
          <Modal
            isOpen={lost}
            title="Out of attempts"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={() => handleContinue(false)}>Continue →</button>}
          >
            <p>The secret code was:</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', justifyContent: 'center' }}>
              {game.secretCode.map((colorId, i) => (
                <div
                  key={i}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: ALL_COLORS[colorId].hex, border: '2px solid rgba(255,255,255,0.3)' }}
                  title={ALL_COLORS[colorId].name}
                />
              ))}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default MastermindGame;
