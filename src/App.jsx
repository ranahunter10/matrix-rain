import { useEffect, useState } from 'react';
import './App.css';

const GRID_ROWS = 15;
const GRID_COLS = 20;

const App = () => {
  const [drops, setDrops] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Initialize drops
    const initialDrops = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(false)
    );
    setDrops(initialDrops);

    // Start the rain animation
    startRain();

    return () => clearInterval(intervalId);
  }, []);

  const startRain = () => {
    const id = setInterval(() => {
      setDrops((prevDrops) => {
        const newDrops = prevDrops.map((row) => [...row]);

        // Move drops down
        for (let col = 0; col < GRID_COLS; col++) {
          for (let row = GRID_ROWS - 1; row >= 0; row--) {
            if (prevDrops[row][col] && prevDrops[row][col].falling) {
              if (row === GRID_ROWS - 1) {
                newDrops[row][col] = false;
              } else {
                newDrops[row][col] = false;
                newDrops[row + 1][col] = {
                  ...prevDrops[row][col],
                  color: getRandomColor(),
                };
              }
            }
          }

          // Start a new drop at the top with a 10% chance
          if (Math.random() > 0.9 && !prevDrops[0][col]) {
            newDrops[0][col] = { color: getRandomColor(), falling: true };
          }
        }

        return newDrops;
      });
    }, 300); // Adjust the interval for animation speed

    setIntervalId(id);
  };

  const getRandomColor = () => {
    const colors = ['#00f', '#0f0', '#f00', '#ff0', '#0ff', '#f0f'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const resetRain = () => {
    clearInterval(intervalId);
    const initialDrops = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(false)
    );
    setDrops(initialDrops);
    startRain();
  };

  return (
    <div className="app">
      <header className="header">Rain Pattern Game</header>
      <div className="controls">
        {/* <button onClick={startRain}>Start</button> */}
        {/* <button onClick={() => clearInterval(intervalId)}>Pause</button> */}
        <button onClick={resetRain}>Reset</button>
      </div>
      <div className="grid">
        {drops.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell ? 'falling' : ''}`}
              style={{ backgroundColor: cell ? cell.color : 'black' }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;






