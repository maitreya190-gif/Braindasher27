import React, { useRef, useState } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { WordleGame as WordleLogic } from '../games/wordle/game';
import './Wordle.css';

function WordleGame({ onGameEnd, maxAttempts = 6, wordDifficulty = 'medium' }) {
  const gameRef = useRef(new WordleLogic(maxAttempts, wordDifficulty));
  const [, setTick] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const endedRef = useRef(false);

  const game = gameRef.current;
  const forceUpdate = () => setTick(t => t + 1);

  const handleGuess = () => {
    if (input.length !== 5) { setMessage('❌ Word must be 5 letters'); return; }

    const feedback = game.makeGuess(input);
    if (feedback) {
      setInput('');
      setMessage('');
      forceUpdate();

      if (game.won) {
        setWon(true);
      } else if (game.gameOver) {
        setLost(true);
      }
    }
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter') handleGuess(); };

  const handleContinue = (completed) => {
    if (!endedRef.current) {
      endedRef.current = true;
      onGameEnd(completed ? game.calculateScore() : 0, completed);
    }
  };

  return (
    <div className="wordle-container">
      <div className="container">
        <div className="game-layout-wordle">
          <div className="wordle-game">
            <div className="guesses-history">
              {game.guesses.map((guess, idx) => (
                <div key={idx} className="guess-row">
                  {guess.word.split('').map((letter, letterIdx) => (
                    <div key={letterIdx} className={`guess-letter ${guess.feedback[letterIdx]}`}>
                      {letter}
                    </div>
                  ))}
                </div>
              ))}

              {/* Empty rows for remaining attempts */}
              {Array.from({ length: Math.max(0, game.maxAttempts - game.guesses.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="guess-row empty-row">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <div key={j} className="guess-letter empty"></div>
                  ))}
                </div>
              ))}
            </div>

            <div className="wordle-input-section">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                onKeyDown={handleKeyPress}
                placeholder="Type a 5-letter word"
                maxLength="5"
                autoFocus
                disabled={game.gameOver}
              />
              <button className="btn btn-primary" onClick={handleGuess} disabled={game.gameOver}>
                Guess
              </button>
            </div>

            {message && <div className="message">{message}</div>}
          </div>

          <div className="stats-section-wordle">
            <ScoreDisplay score={game.maxAttempts - game.guesses.length} label="Attempts Left" />
            <div className="stat-box">
              <span className="stat-label">Guesses</span>
              <span className="stat-value">{game.guesses.length}/{game.maxAttempts}</span>
            </div>
            <div className="keyboard-info">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>🟩 Correct position</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>🟨 Wrong position</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>⬜ Not in word</p>
            </div>
          </div>
        </div>

        {won && (
          <Modal
            isOpen={won}
            title="🎉 You got it!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={() => handleContinue(true)}>Continue →</button>}
          >
            <p>The word was <strong>{game.secretWord}</strong>!</p>
            <p style={{ marginTop: '12px', color: '#FFD60A' }}>
              Solved in {game.guesses.length} attempt{game.guesses.length !== 1 ? 's' : ''}.
            </p>
          </Modal>
        )}

        {lost && (
          <Modal
            isOpen={lost}
            title="💀 Out of attempts"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={() => handleContinue(false)}>Continue →</button>}
          >
            <p>The word was <strong style={{ color: '#EF4444' }}>{game.secretWord}</strong>.</p>
            <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Better luck on the next one!</p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default WordleGame;
