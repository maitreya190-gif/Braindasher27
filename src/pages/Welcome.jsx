import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetition } from '../context/CompetitionContext';
import './Welcome.css';

function Welcome() {
  const { dispatch } = useCompetition();
  const navigate = useNavigate();
  const [prn, setPrn] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    const trimmed = prn.trim().toUpperCase();
    if (!trimmed) { setError('Please enter your PRN number.'); return; }
    if (trimmed.length < 3) { setError('PRN must be at least 3 characters.'); return; }

    dispatch({ type: 'SET_PRN', prn: trimmed });
    dispatch({ type: 'START_COMPETITION' });
    navigate('/competition');
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleStart(); };

  return (
    <div className="welcome-page">
      <div className="welcome-glow" />

      <div className="welcome-card">
        <div className="welcome-logo">
          <span className="logo-icon">🧠</span>
          <div>
            <h1 className="logo-title">BrainDasher</h1>
            <p className="logo-sub">Spectrum 2027 — PCCOE</p>
          </div>
        </div>

        <div className="welcome-divider" />

        <div className="welcome-info">
          <div className="info-item"><span className="info-icon">🎮</span><span>15 rounds across 5 games</span></div>
          <div className="info-item"><span className="info-icon">⏱</span><span>45-minute time limit</span></div>
          <div className="info-item"><span className="info-icon">↩</span><span>Skip any game — no penalty</span></div>
          <div className="info-item"><span className="info-icon">🏆</span><span>Ranked by games completed, then time</span></div>
        </div>

        <div className="welcome-form">
          <label className="form-label">Enter Your PRN Number</label>
          <input
            type="text"
            className={`form-input ${error ? 'input-error' : ''}`}
            placeholder="e.g. 22310054"
            value={prn}
            onChange={(e) => { setPrn(e.target.value); setError(''); }}
            onKeyDown={handleKey}
            autoFocus
            maxLength={20}
          />
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary btn-start" onClick={handleStart}>
            Start Competition →
          </button>
        </div>

        <button className="btn-leaderboard-link" onClick={() => navigate('/leaderboard')}>
          View Leaderboard 🏆
        </button>
      </div>
    </div>
  );
}

export default Welcome;
