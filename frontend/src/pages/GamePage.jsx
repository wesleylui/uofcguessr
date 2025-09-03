import React from 'react';
import Countdown from '../components/Countdown';
import { Link } from 'react-router-dom';

const GamePage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Countdown />
    <h2>Game starting soon</h2>
    <Link to="/" style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#007bff', textDecoration: 'underline' }}>
      Back to Home
    </Link>
  </div>
);

export default GamePage;
