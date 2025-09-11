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
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [, setGuesses] = useState([]); // {lng,lat}
  const [currentGuess, setCurrentGuess] = useState(null); // {lng, lat}

  const current = rounds[roundIndex];

  const handleCountdownComplete = useCallback(() => {
    setPhase(PHASES.IMAGE);
    // brief image reveal before map step
    setTimeout(() => {
      setPhase(PHASES.MAP);
      setToggleEnabled(true);
    }, 2000);
  }, []);

  const handleMapSelect = useCallback(({ lng, lat, hasMarker }) => {
    if (hasMarker) {
      setCurrentGuess({ lng, lat });
    }
  }, []);

  const handleSubmitGuess = useCallback(() => {
    if (!currentGuess) return;
    
    setGuesses((prev) => {
      const next = [...prev];
      next[roundIndex] = currentGuess;
      return next;
    });
    setCurrentGuess(null);
    setPhase(PHASES.RESULT);
  }, [currentGuess, roundIndex]);

  const handleNextRound = useCallback(() => {
    if (roundIndex + 1 < rounds.length) {
      setRoundIndex((i) => i + 1);
      setPhase(PHASES.COUNTDOWN);
      setToggleEnabled(false);
      setCurrentGuess(null);
    } else {
      // restart for now
      setRoundIndex(0);
      setGuesses([]);
      setPhase(PHASES.COUNTDOWN);
      setToggleEnabled(false);
      setCurrentGuess(null);
    }
  }, [roundIndex, rounds.length]);

  const handleToggleView = useCallback(() => {
    if (!toggleEnabled) return;
    setPhase((p) => (p === PHASES.MAP ? PHASES.IMAGE : PHASES.MAP));
  }, [toggleEnabled]);

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

      {toggleEnabled && (phase === PHASES.IMAGE || phase === PHASES.MAP) && (
        <button onClick={handleToggleView}>
          {phase === PHASES.MAP ? "Show Image" : "Show Map"}
        </button>
      )}

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
        <>
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
          {currentGuess && (
            <button 
              onClick={handleSubmitGuess}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                fontSize: "1.1rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Submit Guess
            </button>
          )}
        </>
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
