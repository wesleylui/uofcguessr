import React, { useCallback, useState, useMemo } from "react";
import MapboxMap from "../components/MapboxMap";
import Countdown from "../components/Countdown";
import ResultDisplay from "../components/ResultDisplay";
import Button from "../components/Button";
import { getRandomLocations } from "../data/uofclocations";
import { calculateGuessResult } from "../utils/gameUtils";
import {
  GAME_PHASES,
  CENTER_UOFC,
  GAME_CONFIG,
} from "../constants/gameConstants";

const GamePage = () => {
  const [rounds] = useState(() => getRandomLocations(GAME_CONFIG.totalRounds));
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState(GAME_PHASES.COUNTDOWN);
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [, setGuesses] = useState([]); // {lng,lat}
  const [currentGuess, setCurrentGuess] = useState(null); // {lng, lat}
  const [lastGuess, setLastGuess] = useState(null); // Store the guess for results display

  const current = rounds[roundIndex];

  // Calculate result once and memoize it to avoid repeated calculations
  const guessResult = useMemo(() => {
    if (!lastGuess || !current) return null;
    return calculateGuessResult(current, lastGuess);
  }, [current, lastGuess]);

  const handleCountdownComplete = useCallback(() => {
    setPhase(GAME_PHASES.IMAGE);
    // brief image reveal before map step
    setTimeout(() => {
      setPhase(GAME_PHASES.MAP);
      setToggleEnabled(true);
    }, GAME_CONFIG.imageDisplayDuration);
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
    setPhase(GAME_PHASES.RESULT);
  }, [currentGuess, roundIndex]);

  const handleNextRound = useCallback(() => {
    if (roundIndex + 1 < rounds.length) {
      setRoundIndex((i) => i + 1);
      setPhase(GAME_PHASES.COUNTDOWN);
      setToggleEnabled(false);
      setCurrentGuess(null);
    } else {
      // restart for now
      setRoundIndex(0);
      setGuesses([]);
      setPhase(GAME_PHASES.COUNTDOWN);
      setToggleEnabled(false);
      setCurrentGuess(null);
    }
  }, [roundIndex, rounds.length]);

  const handleToggleView = useCallback(() => {
    if (!toggleEnabled) return;
    setPhase((p) =>
      p === GAME_PHASES.MAP ? GAME_PHASES.IMAGE : GAME_PHASES.MAP
    );
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

      {toggleEnabled &&
        (phase === GAME_PHASES.IMAGE || phase === GAME_PHASES.MAP) && (
          <Button onClick={handleToggleView} variant="secondary">
            {phase === GAME_PHASES.MAP ? "Show Image" : "Show Map"}
          </Button>
        )}

      {phase === GAME_PHASES.COUNTDOWN && (
        <Countdown
          durationSeconds={GAME_CONFIG.countdownDuration}
          onComplete={handleCountdownComplete}
        />
      )}

      {phase === GAME_PHASES.IMAGE && (
        <img
          src={current.image || current.placeholderImage}
          alt={current.name}
          style={{ maxWidth: "80vw", maxHeight: "60vh", objectFit: "cover" }}
        />
      )}

      {phase === GAME_PHASES.MAP && (
        <>
          <MapboxMap
            onSelect={handleMapSelect}
            center={CENTER_UOFC}
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
            <Button
              onClick={handleSubmitGuess}
              variant="success"
              style={{ marginTop: "1rem" }}
            >
              Submit Guess
            </Button>
          )}
        </>
      )}

      {phase === GAME_PHASES.RESULT && lastGuess && guessResult && (
        <div style={{ textAlign: "center" }}>
          <ResultDisplay
            correctLocation={current}
            playerGuess={lastGuess}
            distance={guessResult.distance}
            score={guessResult.score}
          />
          <Button
            onClick={handleNextRound}
            variant="primary"
            style={{ marginTop: "1rem" }}
          >
            {roundIndex + 1 < rounds.length ? "Next Round" : "Play Again"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
