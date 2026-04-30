import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCompetition } from '../context/CompetitionContext';
import { COMPETITION_GAMES, TOTAL_COMPETITION_TIME } from '../games/competitionConfig';
import EightQueensGame from '../games/EightQueens';
import MemoryMasterGame from '../games/MemoryMaster';
import CircleOfHanoiGame from '../games/CircleOfHanoi';
import WordleGame from '../games/Wordle';
import MastermindGame from '../games/Mastermind';
import './Competition.css';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function GlobalTimer({ timeLeft }) {
  const pct = (timeLeft / TOTAL_COMPETITION_TIME) * 100;
  const urgent = timeLeft < 300;
  return (
    <div className={`global-timer ${urgent ? 'urgent' : ''}`}>
      <span className="timer-icon">⏱</span>
      <span className="timer-value">{formatTime(timeLeft)}</span>
      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function GameIntro({ game, onPlay, onSkip }) {
  return (
    <div className="game-intro">
      {/* Title row */}
      <div className="intro-title-row">
        <span className={`diff-badge ${game.difficulty.toLowerCase()}`}>{game.difficulty}</span>
        <h2 className="intro-title">{game.game}</h2>
      </div>

      {/* Rule card */}
      <div className="rule-card">
        <div className="rule-card-section">
          <span className="rule-card-label">🎯 Goal</span>
          <p className="rule-card-goal">{game.goal}</p>
        </div>

        <div className="rule-card-section">
          <span className="rule-card-label">📋 Rules</span>
          <ul className="rule-list">
            {game.rules.map((r, i) => (
              <li key={i} className="rule-item">{r}</li>
            ))}
          </ul>
        </div>

        <div className="rule-card-section rule-controls">
          <span className="rule-card-label">🎮 Controls</span>
          <p className="rule-card-controls">{game.controls}</p>
        </div>
      </div>

      <div className="intro-actions">
        <button className="btn btn-primary btn-play" onClick={onPlay}>▶ Play Now</button>
        <button className="btn btn-ghost btn-skip-intro" onClick={onSkip}>Skip this game →</button>
      </div>
    </div>
  );
}

function Competition() {
  const { state, dispatch } = useCompetition();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(TOTAL_COMPETITION_TIME);
  const [showIntro, setShowIntro] = useState(true);
  const [gameKey, setGameKey] = useState(0);
  const [confirmBonus, setConfirmBonus] = useState(false);
  const gameStartTimeRef = useRef(null);
  const endedRef = useRef(false);

  // Guard — must have entered PRN to be here
  if (!state.prn) return <Navigate to="/" replace />;

  const { currentGameIndex, gameResults } = state.competition;
  const isDone = currentGameIndex >= COMPETITION_GAMES.length;

  // ── End helpers (each called at most once via endedRef) ───────
  const endToResults = useCallback((usedSeconds) => {
    if (endedRef.current) return;
    endedRef.current = true;
    dispatch({ type: 'END_COMPETITION', timeUsed: usedSeconds });
    navigate('/results');
  }, [dispatch, navigate]);

  const endToBonus = useCallback((usedSeconds) => {
    if (endedRef.current) return;
    endedRef.current = true;
    dispatch({ type: 'END_COMPETITION', timeUsed: usedSeconds });
    navigate('/bonus');
  }, [dispatch, navigate]);

  // ── Countdown timer ────────────────────────────────────────────
  useEffect(() => {
    if (isDone) return;
    const id = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isDone]);

  // ── Timer hits zero → no time left, skip bonus, go to results ─
  useEffect(() => {
    if (timeLeft === 0) endToResults(TOTAL_COMPETITION_TIME);
  }, [timeLeft, endToResults]);

  // ── All games done → go to bonus (time still remaining) ───────
  useEffect(() => {
    if (isDone) endToBonus(TOTAL_COMPETITION_TIME - timeLeft);
  }, [isDone]);  // intentionally excludes timeLeft to avoid re-fire

  // ─────────────────────────────────────────────────────────────
  const currentGame = isDone ? null : COMPETITION_GAMES[currentGameIndex];
  const completedCount = gameResults.filter(r => r?.completed).length;
  const runningScore = gameResults.reduce((sum, r) => sum + (r?.score || 0), 0);

  const advance = (result) => {
    dispatch({ type: 'RECORD_GAME', result });
    dispatch({ type: 'ADVANCE_GAME' });
    setShowIntro(true);
    setGameKey(k => k + 1);
  };

  const handleGameEnd = (_score, completed = true) => {
    const timeTaken = gameStartTimeRef.current
      ? Math.floor((Date.now() - gameStartTimeRef.current) / 1000) : 0;
    const score = completed ? (currentGame.points ?? 0) : 0;
    advance({
      id: currentGame.id, game: currentGame.game, difficulty: currentGame.difficulty,
      score, timeTaken, completed, skipped: false,
    });
  };

  const handleSkip = () => {
    advance({
      id: currentGame.id, game: currentGame.game, difficulty: currentGame.difficulty,
      score: 0, timeTaken: 0, completed: false, skipped: true,
    });
  };

  const handlePlay = () => {
    gameStartTimeRef.current = Date.now();
    setShowIntro(false);
  };

  const handleBonusConfirmed = () => {
    endToBonus(TOTAL_COMPETITION_TIME - timeLeft);
  };

  const renderGame = () => {
    if (!currentGame) return null;
    const { component, config } = currentGame;
    const props = { key: gameKey, onGameEnd: handleGameEnd };
    switch (component) {
      case 'EightQueens':  return <EightQueensGame  {...props} boardSize={config.boardSize} />;
      case 'MemoryMaster': return <MemoryMasterGame {...props} rows={config.rows} cols={config.cols} />;
      case 'CircleOfHanoi': return <CircleOfHanoiGame {...props} discCount={config.discCount} />;
      case 'Wordle':       return <WordleGame       {...props} maxAttempts={config.maxAttempts} wordDifficulty={config.wordDifficulty} />;
      case 'Mastermind':   return <MastermindGame   {...props} codeLength={config.codeLength} numColors={config.numColors} maxAttempts={config.maxAttempts} />;
      default: return null;
    }
  };

  return (
    <div className="competition-page">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="comp-header">
        <div className="comp-prn">PRN: <strong>{state.prn}</strong></div>
        <GlobalTimer timeLeft={timeLeft} />
        <div className="comp-stats">

          <span className="comp-stat-item">
            <span className="comp-stat-label">Game</span>
            <span className="comp-stat-val">{Math.min(currentGameIndex + 1, COMPETITION_GAMES.length)}/{COMPETITION_GAMES.length}</span>
          </span>
          <span className="comp-stat-item">
            <span className="comp-stat-label">Solved</span>
            <span className="comp-stat-val solved-val">{completedCount}</span>
          </span>
          <span className="comp-stat-item">
            <span className="comp-stat-label">Score</span>
            <span className="comp-stat-val score-val">{runningScore.toLocaleString()}</span>
          </span>
        </div>
        <button className="btn btn-ghost comp-bonus-btn" onClick={() => setConfirmBonus(true)}>
          ★ Bonus Round
        </button>
      </div>

      {/* ── Bonus confirmation overlay ──────────────────────────── */}
      {confirmBonus && (
        <div className="bonus-confirm-overlay">
          <div className="bonus-confirm-box">
            <h3 className="bonus-confirm-title">Start Bonus Round?</h3>
            <p className="bonus-confirm-body">
              Your current competition progress will be saved and locked.
              You <strong>cannot return</strong> to the games once you proceed.
            </p>
            <div className="bonus-confirm-actions">
              <button className="btn btn-primary" onClick={handleBonusConfirmed}>Yes, go to Bonus</button>
              <button className="btn btn-ghost" onClick={() => setConfirmBonus(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Progress dots ──────────────────────────────────────── */}
      <div className="progress-dots">
        {COMPETITION_GAMES.map((g, i) => {
          const r = gameResults[i];
          const cls =
            i < currentGameIndex
              ? r?.completed ? 'done' : r?.skipped ? 'skipped' : 'failed'
              : i === currentGameIndex ? 'active' : 'pending';
          return (
            <div key={g.id} className={`dot ${cls}`} title={`${g.game} (${g.difficulty})`} />
          );
        })}
      </div>

      {/* ── Game area ───────────────────────────────────────────── */}
      <div className="comp-body">
        {currentGame && showIntro && (
          <GameIntro game={currentGame} onPlay={handlePlay} onSkip={handleSkip} />
        )}
        {currentGame && !showIntro && (
          <>
            <div className="game-banner">
              <span className="game-banner-name">{currentGame.game}</span>
              <span className={`diff-badge ${currentGame.difficulty.toLowerCase()}`}>{currentGame.difficulty}</span>
              <button className="btn btn-ghost btn-skip-top" onClick={handleSkip}>Skip →</button>
            </div>
            {renderGame()}
          </>
        )}
      </div>
    </div>
  );
}

export default Competition;
