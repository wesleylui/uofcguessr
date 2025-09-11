import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <>
      <header>
        <h1>UofC Guessr</h1>
      </header>
      <main>
        <section>
          <p>
            Guess where you are on the University of Calgary campus based on a
            random view. Make your best guess and see how close you are.
          </p>
          <button onClick={handleStartGame}>Start Game</button>
        </section>
        <section aria-label="How to play">
          <h2>How to play</h2>
          <ol>
            <li>Look around to spot campus landmarks and hints.</li>
            <li>Click the map where you think the location is.</li>
            <li>Submit your guess and check your score.</li>
          </ol>
        </section>
      </main>
      <footer>
        <small>Wesley Lui.</small>
      </footer>
    </>
  );
};

export default LandingPage;
