import { useState } from 'react';

import Clock from './Clock';
import initialClocks from '../data/clocks.json';

function ClockApp() {
  const [clocks, setClocks] = useState(initialClocks);
  const [title, setTitle] = useState('');
  const [timezone, setTimezone] = useState('');
  const [error, setError] = useState('');

  const addClock = () => {
    setError('');
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!timezone || isNaN(timezone)) {
      setError('Please enter a valid timezone number');
      return;
    }

    const timezoneNum = parseFloat(timezone);
    if (timezoneNum < -12 || timezoneNum > 14) {
      setError('Timezone must be between -12 and +14');
      return;
    }

    setClocks([...clocks, {
      id: Date.now(),
      title: title.trim(),
      timezone: timezoneNum
    }]);

    setTitle('');
    setTimezone('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addClock();
    }
  };

  const removeClock = (id) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  };

  return (
    <div className="clock-app">
      <h1 className="app-title">World Clocks</h1>
      
      <div className="form-container">
        <div className="form">
          <div className="form-group">
            <label htmlFor="clock-title">Название</label>
            <input
              id="clock-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. New York"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="clock-timezone">Временная зона (GMT)</label>
            <input
              id="clock-timezone"
              type="number"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. -5"
              min="-12"
              max="14"
              step="0.5"
            />
          </div>
          
          <button className="add-button" onClick={addClock}>
            Добавить
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="clocks-container">
        {clocks.map(clock => (
          <Clock
            key={clock.id}
            title={clock.title}
            timezone={clock.timezone}
            onRemove={() => removeClock(clock.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClockApp;