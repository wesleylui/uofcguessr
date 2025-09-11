import React, { useEffect, useState } from "react";

const Countdown = ({ durationSeconds = 3, onComplete }) => {
  const [count, setCount] = useState(durationSeconds);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowGo(true);
      if (typeof onComplete === "function") {
        const t = setTimeout(() => onComplete(), 300);
        return () => clearTimeout(t);
      }
    }
  }, [count, onComplete]);

  useEffect(() => {
    setCount(durationSeconds);
    setShowGo(false);
  }, [durationSeconds]);

  return (
    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
      {showGo ? "Go!" : count}
    </div>
  );
};

export default Countdown;
