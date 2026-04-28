import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer({ initialTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 30;
  const isDanger = timeLeft <= 10;

  return (
    <div className={`timer ${isDanger ? 'danger' : isWarning ? 'warning' : ''}`}>
      <div className="timer-value">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="timer-label">Time</div>
    </div>
  );
}

export default Timer;
