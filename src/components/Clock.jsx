import React from 'react';

const Clock = ({ timezone, onRemove }) => {
  const getCurrentTime = () => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * timezone.offset));
    return localTime.toLocaleTimeString();
  };

  return (
    <div>
      <h3>{timezone.name}</h3>
      <p>{getCurrentTime()}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default Clock;
