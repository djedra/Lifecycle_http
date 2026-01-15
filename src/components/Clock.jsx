import { useEffect, useState } from 'react';

function Clock({ title, timezone, currentTime, onRemove }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + 3600000 * timezone);
    setTime(localTime.toLocaleTimeString());
  }, [currentTime, timezone]);

  const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
  const local = new Date(utc + 3600000 * timezone);

  const hours = local.getHours();
  const minutes = local.getMinutes();
  const seconds = local.getSeconds();

  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  return (
    <div className="clock-wrapper">
      <div className="clock-title">{title}</div>
      <div className="time-zone">GMT{timezone >= 0 ? '+' : ''}{timezone}</div>
      <div className="clock">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourDeg}deg)` }} // Исправлено
        />
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteDeg}deg)` }} // Исправлено
        />
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondDeg}deg)` }} // Исправлено
        />
        <div className="center-dot" />
      </div>
      <div className="digital-time">{time}</div>
      <button className="remove-btn" onClick={onRemove} aria-label="Remove clock">
        ×
      </button>
    </div>
  );
}

export default Clock;
