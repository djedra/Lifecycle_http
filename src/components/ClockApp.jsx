import React, { useState, useEffect } from 'react';
import Clock from './Clock';

const timezones = [
  { name: 'New York', offset: -5 },
  { name: 'London', offset: 0 },
  { name: 'Tokyo', offset: 9 },
  { name: 'Sydney', offset: 11 },
];

const ClockApp = () => {
  const [clocks, setClocks] = useState([]);

  const addClock = (timezone) => {
    setClocks([...clocks, timezone]);
  };

  const removeClock = (index) => {
    setClocks(clocks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setClocks((prevClocks) => [...prevClocks]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Clocks</h2>
      <div>
        {timezones.map((tz, index) => (
          <button key={index} onClick={() => addClock(tz)}>
            Add {tz.name}
          </button>
        ))}
      </div>
      {clocks.map((timezone, index) => (
        <Clock
          key={index}
          timezone={timezone}
          onRemove={() => removeClock(index)}
        />
      ))}
    </div>
  );
};

export default ClockApp;
