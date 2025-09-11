import React, { useCallback, useState } from "react";
import MapboxMap from "../components/MapboxMap";
import Countdown from "../components/Countdown";
import { getRandomLocations } from "../data/uofclocations";

const centerUofC = [-114.130081, 51.07811];

const PHASES = {
  COUNTDOWN: "COUNTDOWN",
  IMAGE: "IMAGE",
  MAP: "MAP",
  RESULT: "RESULT",
};

const GamePage = () => {
  const [rounds] = useState(() => getRandomLocations(3));
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState(PHASES.COUNTDOWN);
  const [, setGuesses] = useState([]); // {lng,lat}

  const current = rounds[roundIndex];

  const handleCountdownComplete = useCallback(() => {
    setPhase(PHASES.IMAGE);
    // brief image reveal before map step
    setTimeout(() => setPhase(PHASES.MAP), 2000);
  }, []);

  const handleMapSelect = useCallback(
    ({ lng, lat }) => {
      setGuesses((prev) => {
        const next = [...prev];
        next[roundIndex] = { lng, lat };
        return next;
      });
      setPhase(PHASES.RESULT);
    },
    [roundIndex]
  );

  const handleNextRound = useCallback(() => {
    if (roundIndex + 1 < rounds.length) {
      setRoundIndex((i) => i + 1);
      setPhase(PHASES.COUNTDOWN);
    } else {
      // restart for now
      setRoundIndex(0);
      setGuesses([]);
      setPhase(PHASES.COUNTDOWN);
    }
  }, [roundIndex, rounds.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        width: "100vw",
        height: "100vh",
        background: "#f8f9fa",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div>
        Round {roundIndex + 1} / {rounds.length}
      </div>

      {phase === PHASES.COUNTDOWN && (
        <Countdown durationSeconds={3} onComplete={handleCountdownComplete} />
      )}

      {phase === PHASES.IMAGE && (
        <img
          src={current.image || current.placeholderImage}
          alt={current.name}
          style={{ maxWidth: "80vw", maxHeight: "60vh", objectFit: "cover" }}
        />
      )}

      {phase === PHASES.MAP && (
        <MapboxMap
          onSelect={handleMapSelect}
          center={centerUofC}
          zoom={15}
          style={{
            width: "80vw",
            height: "60vh",
            borderRadius: "16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        />
      )}

      {phase === PHASES.RESULT && (
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "0.5rem" }}>Target: {current.name}</div>
          <img
            src={current.image || current.placeholderImage}
            alt={current.name}
            style={{ maxWidth: "80vw", maxHeight: "40vh", objectFit: "cover" }}
          />
          <button onClick={handleNextRound} style={{ marginTop: "0.75rem" }}>
            {roundIndex + 1 < rounds.length ? "Next round" : "Play again"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
