import React, { useState, useEffect, useCallback, useRef } from 'react';
import './VisualMemory.css';

const MAX_LEVEL = 16;
const MAX_LIVES = 3;

// Grid size and tile count per level
const LEVEL_CONFIG = [
  null,                          // index 0 unused
  { gridSize: 3, tiles: 3 },   // 1
  { gridSize: 3, tiles: 4 },   // 2
  { gridSize: 4, tiles: 4 },   // 3
  { gridSize: 4, tiles: 5 },   // 4
  { gridSize: 4, tiles: 6 },   // 5
  { gridSize: 5, tiles: 6 },   // 6
  { gridSize: 5, tiles: 7 },   // 7
  { gridSize: 5, tiles: 8 },   // 8
  { gridSize: 5, tiles: 9 },   // 9
  { gridSize: 6, tiles: 9 },   // 10
  { gridSize: 6, tiles: 10 },  // 11
  { gridSize: 6, tiles: 11 },  // 12
  { gridSize: 6, tiles: 12 },  // 13
  { gridSize: 7, tiles: 12 },  // 14
  { gridSize: 7, tiles: 13 },  // 15
  { gridSize: 7, tiles: 14 },  // 16
];

function getShowDuration(level) {
  // 2500ms at level 1 down to 1000ms at level 16
  return Math.max(1000, 2500 - (level - 1) * 100);
}

function generatePattern(gridSize, numTiles) {
  const total = gridSize * gridSize;
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return new Set(indices.slice(0, numTiles));
}

// phases: 'pre' → 'showing' → 'recall' → 'levelcomplete' → back to 'pre'
//         at any point in 'recall': wrong clicks can → 'gameover'
//         after MAX_LEVEL complete: 'winner'

function VisualMemory({ onGameEnd, maxDuration = null }) {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('pre');
  const [pattern, setPattern] = useState(() => generatePattern(3, 3));
  const [tileStates, setTileStates] = useState({}); // idx → 'correct' | 'wrong'
  const [correctFound, setCorrectFound] = useState(0);
  const endedRef = useRef(false);
  const scoreRef = useRef(0);

  const cfg = LEVEL_CONFIG[level];
  const { gridSize, tiles: numTiles } = cfg;

  // Keep a ref so the timeout callback always sees the latest score
  useEffect(() => { scoreRef.current = score; }, [score]);

  const callEnd = useCallback((finalScore) => {
    if (!endedRef.current) {
      endedRef.current = true;
      onGameEnd(finalScore);
    }
  }, [onGameEnd]);

  // Global time limit — fires once on mount
  useEffect(() => {
    if (!maxDuration || maxDuration <= 0) return;
    const t = setTimeout(() => {
      setPhase('timeout');
      callEnd(scoreRef.current);
    }, maxDuration);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // pre → showing
  useEffect(() => {
    if (phase !== 'pre') return;
    const t = setTimeout(() => setPhase('showing'), 800);
    return () => clearTimeout(t);
  }, [phase]);

  // showing → recall (after show duration)
  useEffect(() => {
    if (phase !== 'showing') return;
    const t = setTimeout(() => setPhase('recall'), getShowDuration(level));
    return () => clearTimeout(t);
  }, [phase, level]);

  // levelcomplete → next level or winner
  useEffect(() => {
    if (phase !== 'levelcomplete') return;
    const newScore = score + level;
    const t = setTimeout(() => {
      if (level >= MAX_LEVEL) {
        setScore(newScore);
        callEnd(newScore);
        setPhase('winner');
        return;
      }
      const nextLevel = level + 1;
      const nextCfg = LEVEL_CONFIG[nextLevel];
      setScore(newScore);
      setLevel(nextLevel);
      setPattern(generatePattern(nextCfg.gridSize, nextCfg.tiles));
      setTileStates({});
      setCorrectFound(0);
      setPhase('pre');
    }, 900);
    return () => clearTimeout(t);
  }, [phase, level, score, callEnd]);

  // gameover → call parent after showing state
  useEffect(() => {
    if (phase !== 'gameover') return;
    const t = setTimeout(() => callEnd(score), 1800);
    return () => clearTimeout(t);
  }, [phase, score, callEnd]);

  const handleTileClick = useCallback((idx) => {
    if (phase !== 'recall') return;
    if (tileStates[idx] !== undefined) return; // already clicked

    if (pattern.has(idx)) {
      const newCorrect = correctFound + 1;
      setTileStates(prev => ({ ...prev, [idx]: 'correct' }));
      setCorrectFound(newCorrect);
      if (newCorrect === numTiles) {
        setPhase('levelcomplete');
      }
    } else {
      setTileStates(prev => ({ ...prev, [idx]: 'wrong' }));
      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) setPhase('gameover');
        return next;
      });
    }
  }, [phase, tileStates, pattern, correctFound, numTiles]);

  const getTileClass = (idx) => {
    const s = tileStates[idx];
    if (s === 'correct') return 'vm-tile vm-correct';
    if (s === 'wrong')   return 'vm-tile vm-wrong';
    if (phase === 'showing' && pattern.has(idx)) return 'vm-tile vm-active';
    // at levelcomplete, show remaining uncliked pattern tiles as correct
    if (phase === 'levelcomplete' && pattern.has(idx)) return 'vm-tile vm-correct';
    return 'vm-tile';
  };

  const total = gridSize * gridSize;

  return (
    <div className="vm-container">

      {/* ── Header bar ─────────────────────────────────────── */}
      <div className="vm-header">
        <div className="vm-stat">
          <span className="vm-stat-label">Level</span>
          <span className="vm-stat-val">{level}<span className="vm-max">/{MAX_LEVEL}</span></span>
        </div>

        <div className="vm-lives">
          {Array.from({ length: MAX_LIVES }, (_, i) => (
            <span key={i} className={`vm-heart ${i < lives ? '' : 'vm-heart-lost'}`}>♥</span>
          ))}
        </div>

        <div className="vm-stat" style={{ textAlign: 'right' }}>
          <span className="vm-stat-label">Score</span>
          <span className="vm-stat-val">{score}</span>
        </div>
      </div>

      {/* ── Instruction ────────────────────────────────────── */}
      <div className="vm-instruction">
        {phase === 'pre'          && <span className="vm-instr-pulse">Level {level} — remember <strong>{numTiles}</strong> tile{numTiles !== 1 ? 's' : ''}</span>}
        {phase === 'showing'      && <span>Memorise!</span>}
        {phase === 'recall'       && <span>Click the tiles — <strong>{correctFound}/{numTiles}</strong> found</span>}
        {phase === 'levelcomplete'&& <span className="vm-instr-ok">✓ Level {level} complete! +{level} pts</span>}
        {phase === 'gameover'     && <span className="vm-instr-fail">Out of lives — game over</span>}
        {phase === 'timeout'      && <span className="vm-instr-fail">Time's up!</span>}
        {phase === 'winner'       && <span className="vm-instr-ok">🏆 All {MAX_LEVEL} levels complete!</span>}
      </div>

      {/* ── Grid ───────────────────────────────────────────── */}
      <div
        className="vm-grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: total }, (_, idx) => (
          <div
            key={`${level}-${idx}`}
            className={getTileClass(idx)}
            onClick={() => handleTileClick(idx)}
          />
        ))}
      </div>

    </div>
  );
}

export default VisualMemory;
