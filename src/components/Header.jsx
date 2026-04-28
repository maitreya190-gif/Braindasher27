import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ playerName, setPlayerName }) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState(playerName);

  const handleNameChange = () => {
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      localStorage.setItem('braindasher_player_name', tempName.trim());
      setShowNameModal(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            🧠 BrainDasher<span className="spectrum">Spectrum</span>
          </Link>

          <nav className="nav-menu">
            <Link to="/" className="nav-link">Games</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            <button 
              className="nav-link player-btn"
              onClick={() => setShowNameModal(true)}
            >
              👤 {playerName}
            </button>
          </nav>
        </div>
      </div>

      {showNameModal && (
        <div className="modal-overlay" onClick={() => setShowNameModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Enter Your Name</h3>
            <input 
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Player name..."
              autoFocus
            />
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowNameModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleNameChange}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
