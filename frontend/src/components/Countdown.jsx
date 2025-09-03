import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const [count, setCount] = useState(3);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowGo(true);
    }
  }, [count]);

  return (
    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
      {showGo ? 'Go!' : count}
    </div>
  );
};

export default Countdown;
