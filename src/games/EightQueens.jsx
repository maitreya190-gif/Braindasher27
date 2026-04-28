import React, { useState, useEffect } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { EightQueensGame } from '../games/eight-queens/game';
import './EightQueens.css';

function EightQueensGame({ onGameEnd, timeLimit }) {
  const [game, setGame] = useState(new EightQueensGame());
  const [selectedCell, setSelectedCell] = useState(null);
  const [moves, setMoves] = useState(0);
  const [queensPlaced, setQueensPlaced] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [won, setWon] = useState(false);

  const handleCellClick = (row, col) => {
    const newGame = { ...game };
    if (game.board[row][col]) {
      newGame.removeQueen(row, col);
    } else if (game.isValid(row, col)) {
      newGame.placeQueen(row, col);
    }
    setGame(newGame);
    setMoves(newGame.moves);
    setQueensPlaced(newGame.queens.length);

    if (newGame.isSolved()) {
      setWon(true);
      setTimeout(() => {
        const score = newGame.calculateScore();
        onGameEnd(score);
      }, 1000);
    }
  };

  const handleReset = () => {
    const newGame = new EightQueensGame();
    setGame(newGame);
    setMoves(0);
    setQueensPlaced(0);
    setSelectedCell(null);
  };

  const getCellColor = (row, col) => {
    return (row + col) % 2 === 0 ? 'light' : 'dark';
  };

  const isAttackZone = (row, col) => {
    if (game.board[row][col]) return false;
    for (let queen of game.queens) {
      if (queen.row === row || queen.col === col) return true;
      if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return true;
    }
    return false;
  };

  return (
    <div className="eight-queens-container">
      <div className="container">
        <div className="game-header">
          <h2>👑 Eight Queens</h2>
          <p>Place 8 queens without any attacks</p>
        </div>

        <div className="game-layout">
          <div className="board-section">
            <div className="chessboard">
              {game.board.map((row, rowIdx) =>
                row.map((cell, colIdx) => (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`chessboard-cell ${getCellColor(rowIdx, colIdx)} ${
                      game.board[rowIdx][colIdx] ? 'queen' : isAttackZone(rowIdx, colIdx) ? 'attack-zone' : ''
                    }`}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                  >
                    {game.board[rowIdx][colIdx] && '♛'}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="stats-section">
            <ScoreDisplay score={queensPlaced} label="Queens Placed" />
            <div className="stat-box">
              <span className="stat-label">Moves</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Time Limit</span>
              <span className="stat-value">{timeLimit}s</span>
            </div>

            <div className="controls">
              <button className="btn btn-primary" onClick={handleReset}>
                Reset
              </button>
              <button className="btn btn-accent" onClick={() => setShowSolution(true)}>
                Help
              </button>
            </div>
          </div>
        </div>

        <Modal 
          isOpen={showSolution}
          title="Need Help?"
          onClose={() => setShowSolution(false)}
          actions={<button className="btn btn-secondary" onClick={() => setShowSolution(false)}>Close</button>}
        >
          <p>Remember: Queens attack horizontally, vertically, and diagonally. Place each queen so no two queens can attack each other.</p>
          <p style={{marginTop: '15px', color: '#FFD60A'}}>💡 Try placing queens one by one, checking that each new queen is safe.</p>
        </Modal>

        {won && (
          <Modal 
            isOpen={won}
            title="🎉 Victory!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={() => onGameEnd(game.calculateScore())}>Continue</button>}
          >
            <p>Congratulations! You solved the Eight Queens puzzle!</p>
            <p style={{marginTop: '15px'}}>Score: <strong>{game.calculateScore()}</strong></p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default EightQueensGame;
