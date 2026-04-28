import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';
import Leaderboard from './pages/Leaderboard';
import GameResult from './pages/GameResult';
import Header from './components/Header';
import './App.css';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentScore, setCurrentScore] = useState(null);
  const [playerName, setPlayerName] = useState('Player');

  useEffect(() => {
    const saved = localStorage.getItem('braindasher_leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  const addScore = (gameName, score, time) => {
    const newEntry = {
      id: Date.now(),
      playerName,
      gameName,
      score,
      time,
      date: new Date().toLocaleDateString(),
      difficulty: getDifficulty(gameName)
    };

    const updated = [newEntry, ...leaderboard].sort((a, b) => b.score - a.score).slice(0, 50);
    setLeaderboard(updated);
    localStorage.setItem('braindasher_leaderboard', JSON.stringify(updated));
    setCurrentScore(newEntry);
  };

  const getDifficulty = (gameName) => {
    const difficultyMap = {
      'Eight Queens': 'Medium',
      'Memory Master': 'Easy',
      'Tower of Hanoi': 'Medium',
      'Wordle': 'Hard',
      'Mastermind': 'Very Hard'
    };
    return difficultyMap[gameName] || 'Unknown';
  };

  return (
    <Router>
      <div className="app">
        <Header playerName={playerName} setPlayerName={setPlayerName} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/game/:gameId" 
              element={<GameRoom onGameEnd={addScore} />} 
            />
            <Route 
              path="/result" 
              element={<GameResult score={currentScore} />} 
            />
            <Route 
              path="/leaderboard" 
              element={<Leaderboard scores={leaderboard} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
