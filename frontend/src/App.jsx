
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/game" element={<div>Game Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
