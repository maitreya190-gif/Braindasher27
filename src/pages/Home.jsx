import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import './Home.css';

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Import games config
    import('../games/config.json').then(config => {
      setGames(config.games);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">BrainDasher Spectrum 2027</h1>
          <p className="hero-subtitle">Challenge Your Mind with 5 Unique Brain-Teasing Games</p>
          <p className="hero-description">
            Experience an immersive gaming platform designed to test your logic, memory, strategy, and deduction skills. 
            Progress through games of increasing difficulty and climb the leaderboard!
          </p>
        </section>

        <section className="games-section">
          <h2>🎮 Choose Your Challenge</h2>
          <div className="games-grid">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        <section className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🧠</div>
              <h3>Brain Training</h3>
              <p>Enhance your cognitive abilities with carefully designed puzzles</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🏆</div>
              <h3>Compete</h3>
              <p>Challenge yourself and compete on the global leaderboard</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Fast-Paced</h3>
              <p>Time-based challenges that keep your adrenaline pumping</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Progressive</h3>
              <p>Games sorted by difficulty from easy to very hard</p>
            </div>
          </div>
        </section>

        <section className="rules-section">
          <h2>📋 How to Play</h2>
          <div className="rules-content">
            <div className="rule">
              <span className="rule-number">1</span>
              <div>
                <h4>Select a Game</h4>
                <p>Choose from 5 unique brain-teasing games</p>
              </div>
            </div>
            <div className="rule">
              <span className="rule-number">2</span>
              <div>
                <h4>Play & Score</h4>
                <p>Complete the challenge before time runs out and earn points</p>
              </div>
            </div>
            <div className="rule">
              <span className="rule-number">3</span>
              <div>
                <h4>Beat Your Score</h4>
                <p>Replay games to improve your score and climb the rankings</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
