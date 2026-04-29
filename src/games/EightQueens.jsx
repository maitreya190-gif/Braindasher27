import React, { useRef, useState } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import Modal from '../components/Modal';
import { EightQueensGame as EightQueensLogic } from '../games/eight-queens/game';
import './EightQueens.css';

function EightQueensGame({ onGameEnd, boardSize = 8 }) {
  const gameRef = useRef(new EightQueensLogic(boardSize));
  const [, setTick] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [won, setWon] = useState(false);
  const endedRef = useRef(false);

  const game = gameRef.current;
  const forceUpdate = () => setTick(t => t + 1);

  const handleCellClick = (row, col) => {
    if (won) return;
    if (game.board[row][col]) {
      game.removeQueen(row, col);
    } else if (game.isValid(row, col)) {
      game.placeQueen(row, col);
    }
    forceUpdate();

    if (game.isSolved()) {
      setWon(true);
    }
  };

  const handleReset = () => {
    gameRef.current = new EightQueensLogic(boardSize);
    setWon(false);
    endedRef.current = false;
    forceUpdate();
  };

  const handleContinue = () => {
    if (!endedRef.current) {
      endedRef.current = true;
      onGameEnd(game.calculateScore(), true);
    }
  };

  const getCellColor = (row, col) => (row + col) % 2 === 0 ? 'light' : 'dark';

  const isAttackZone = (row, col) => {
    if (game.board[row][col]) return false;
    for (const queen of game.queens) {
      if (queen.row === row || queen.col === col) return true;
      if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return true;
    }
    return false;
  };

  return (
    <div className="eight-queens-container">
      <div className="container">
        <div className="game-layout">
          <div className="board-section">
            <div
              className="chessboard"
              style={{ gridTemplateColumns: `repeat(${game.boardSize}, 60px)` }}
            >
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
            <ScoreDisplay score={`${game.queens.length}/${game.boardSize}`} label="Queens Placed" />
            <div className="stat-box">
              <span className="stat-label">Moves</span>
              <span className="stat-value">{game.moves}</span>
            </div>
            <div className="controls">
              <button className="btn btn-primary" onClick={handleReset}>Reset</button>
              <button className="btn btn-accent" onClick={() => setShowHelp(true)}>Hint</button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showHelp}
          title="Hint"
          onClose={() => setShowHelp(false)}
          actions={<button className="btn btn-secondary" onClick={() => setShowHelp(false)}>Close</button>}
        >
          <p>Queens attack along rows, columns, and diagonals. Red cells show attack zones. Place each queen safely, one per row.</p>
          <p style={{ marginTop: '12px', color: '#FFD60A' }}>💡 Start from a corner and work inward.</p>
        </Modal>

        {won && (
          <Modal
            isOpen={won}
            title="🎉 Solved!"
            onClose={() => {}}
            actions={<button className="btn btn-primary" onClick={handleContinue}>Continue →</button>}
          >
            <p>All queens placed safely!</p>
            <p style={{ marginTop: '12px' }}>Score: <strong>{game.calculateScore()}</strong></p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default EightQueensGame;
