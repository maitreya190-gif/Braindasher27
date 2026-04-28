import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EightQueensGame from '../games/EightQueens';
import MemoryMasterGame from '../games/MemoryMaster';
import TowerOfHanoiGame from '../games/TowerOfHanoi';
import WordleGame from '../games/Wordle';
import MastermindGame from '../games/Mastermind';
import Timer from '../components/Timer';
import './GameRoom.css';

function GameRoom({ onGameEnd }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameComponent, setGameComponent] = useState(null);
  const [timeLimit, setTimeLimit] = useState(600);
  const [gameName, setGameName] = useState('');

  useEffect(() => {
    const gameConfigs = {
      1: { name: 'Eight Queens', component: EightQueensGame, time: 600 },
      2: { name: 'Memory Master', component: MemoryMasterGame, time: 120 },
      3: { name: 'Tower of Hanoi', component: TowerOfHanoiGame, time: 300 },
      4: { name: 'Wordle', component: WordleGame, time: 300 },
      5: { name: 'Mastermind', component: MastermindGame, time: 600 }
    };

    const config = gameConfigs[gameId];
    if (config) {
      setGameName(config.name);
      setTimeLimit(config.time);
      setGameComponent(config.component);
    }
  }, [gameId]);

  const handleGameEnd = (score) => {
    onGameEnd(gameName, score, timeLimit);
    navigate('/result');
  };

  if (!gameComponent) {
    return <div className="loading">Loading game...</div>;
  }

  const GameComponent = gameComponent;

  return (
    <div className="game-room">
      <Timer initialTime={timeLimit} onTimeUp={() => handleGameEnd(0)} />
      <GameComponent onGameEnd={handleGameEnd} timeLimit={timeLimit} />
    </div>
  );
}

export default GameRoom;
