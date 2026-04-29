import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CompetitionProvider } from './context/CompetitionContext';
import Welcome from './pages/Welcome';
import Competition from './pages/Competition';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import Bonus from './pages/Bonus';
import './App.css';

function App() {
  return (
    <CompetitionProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/"            element={<Welcome />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/results"     element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/bonus"       element={<Bonus />} />
          </Routes>
        </div>
      </Router>
    </CompetitionProvider>
  );
}

export default App;
