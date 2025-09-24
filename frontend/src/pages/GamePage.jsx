import React, { useCallback, useState } from "react";
import MapboxMap from "../components/MapboxMap";
import Countdown from "../components/Countdown";
import ResultDisplay from "../components/ResultDisplay";
import { getRandomLocations } from "../data/uofclocations";

const centerUofC = [-114.130081, 51.07811];

const PHASES = {
  COUNTDOWN: "COUNTDOWN",
  IMAGE: "IMAGE",
  MAP: "MAP",
  RESULT: "RESULT",
};

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(coord1, coord2) {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

// Helper function to calculate score based on distance
function calculateScore(distance) {
  // Max score: 5000 points
  // Decreases with distance
  if (distance < 10) return 5000; // Perfect guess
  if (distance < 100) return 4500; // Very close
  if (distance < 500) return 4000; // Close
  if (distance < 1000) return 3000; // Good
  if (distance < 2000) return 2000; // Fair
  if (distance < 5000) return 1000; // Poor
  return Math.max(0, 5000 - Math.floor(distance / 10)); // Very poor
}

const GamePage = () => {
  const [rounds] = useState(() => getRandomLocations(3));
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState(PHASES.COUNTDOWN);
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [, setGuesses] = useState([]); // {lng,lat}
  const [currentGuess, setCurrentGuess] = useState(null); // {lng, lat}
  const [lastGuess, setLastGuess] = useState(null); // Store the guess for results display

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
    
    setLastGuess(currentGuess); // Store the guess for results display
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

      {phase === PHASES.RESULT && lastGuess && (
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "1rem", color: "#000000" }}>
            <p style={{ margin: "0.25rem 0", fontSize: "1.1rem" }}>Distance: {Math.round(calculateDistance(current.coordinates, [lastGuess.lng, lastGuess.lat]))} meters</p>
            <p style={{ margin: "0.25rem 0", fontSize: "1.1rem" }}>Score: {calculateScore(calculateDistance(current.coordinates, [lastGuess.lng, lastGuess.lat]))} points</p>
          </div>
          <ResultDisplay
            correctLocation={current}
            playerGuess={lastGuess}
            distance={calculateDistance(current.coordinates, [lastGuess.lng, lastGuess.lat])}
            score={calculateScore(calculateDistance(current.coordinates, [lastGuess.lng, lastGuess.lat]))}
          />
          <button 
            onClick={handleNextRound} 
            style={{ 
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {roundIndex + 1 < rounds.length ? "Next Round" : "Play Again"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
