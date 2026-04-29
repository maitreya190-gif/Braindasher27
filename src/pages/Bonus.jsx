import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCompetition } from '../context/CompetitionContext';
import { TOTAL_COMPETITION_TIME } from '../games/competitionConfig';
import VisualMemory from '../games/VisualMemory';
import './Bonus.css';

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function Bonus() {
  const { state, dispatch } = useCompetition();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const startedAtRef = useRef(null);

  if (!state.prn) return <Navigate to="/" replace />;

  const compStartTime = state.competition.startTime;

  // Remaining seconds from the global 45-min clock
  function getRemainingSeconds() {
    if (!compStartTime) return TOTAL_COMPETITION_TIME;
    const elapsed = Math.floor((Date.now() - compStartTime) / 1000);
    return Math.max(0, TOTAL_COMPETITION_TIME - elapsed);
  }

  // Live countdown display while on intro screen
  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown(getRemainingSeconds());
    }, 1000);
    setCountdown(getRemainingSeconds());
    return () => clearInterval(tick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // If timer already expired on the intro screen, send straight to results
  useEffect(() => {
    if (countdown !== null && countdown <= 0 && !started) {
      dispatch({ type: 'RECORD_BONUS', score: 0 });
      navigate('/results');
    }
  }, [countdown, started, dispatch, navigate]);

  const handleGameEnd = useCallback((bonusScore) => {
    dispatch({ type: 'RECORD_BONUS', score: bonusScore });
    navigate('/results');
  }, [dispatch, navigate]);

  const handleStart = () => {
    startedAtRef.current = Date.now();
    setStarted(true);
  };

  // ── Intro ──────────────────────────────────────────────────
  if (!started) {
    const urgent = countdown !== null && countdown < 120;
    return (
      <div className="bonus-page">
        <div className="bonus-intro-card">
          <div className="bonus-badge">Bonus Round</div>
          <h1 className="bonus-title">Visual Memory</h1>
          <p className="bonus-sub">Up to 16 levels · 3 lives · Score = sum of levels passed</p>

          <div className="bonus-timer-display" style={{ color: urgent ? '#ef4444' : 'var(--gold)' }}>
            ⏱ Time remaining: <strong>{countdown !== null ? formatTime(countdown) : '—'}</strong>
          </div>

          <div className="bonus-rules">
            <div className="bonus-rule-item">
              <span className="bonus-rule-icon">1</span>
              <span>A grid of white squares appears. Some flash <strong>black</strong> briefly.</span>
            </div>
            <div className="bonus-rule-item">
              <span className="bonus-rule-icon">2</span>
              <span>After they disappear, click every square that was black.</span>
            </div>
            <div className="bonus-rule-item">
              <span className="bonus-rule-icon">3</span>
              <span>Wrong click = lose a life. You have <strong>3 lives total</strong> across all levels.</span>
            </div>
            <div className="bonus-rule-item">
              <span className="bonus-rule-icon">4</span>
              <span>Passing level N earns N points. Survive as long as possible.</span>
            </div>
          </div>

          <div className="bonus-warning">
            ⚠ Your competition games are locked. The 45-minute clock keeps running.
          </div>

          <button className="btn btn-primary bonus-start-btn" onClick={handleStart}>
            ▶ Start Visual Memory
          </button>
        </div>
      </div>
    );
  }

  // ── Active game — pass remaining time so it auto-ends at 45 min ─
  const msRemaining = compStartTime
    ? Math.max(0, TOTAL_COMPETITION_TIME * 1000 - (Date.now() - compStartTime))
    : null;

  return (
    <div className="bonus-page bonus-active">
      <VisualMemory
        onGameEnd={handleGameEnd}
        maxDuration={msRemaining}
      />
    </div>
  );
}

export default Bonus;
