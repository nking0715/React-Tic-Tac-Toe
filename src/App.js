import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [crossArray, setCrossArray] = useState([]);
  const [circleArray, setCircleArray] = useState([]);

  const items = [11, 12, 13, 21, 122, 23, 31, 32, 33];
  const winArray = [36, 63, 69, 96, 166];

  const isWin = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length - 1; j++) {
        let sum = array[i] + array[j] + array[array.length - 1];
        if (winArray.includes(sum)) return true;
      }
    }
    return false;
  }

  const reset = () => {
    setTurn(Math.random() > 0.5);
    setCrossArray([]);
    setCircleArray([]);
    setWinner(null);
  }

  const handleTick = (item) => {
    if (circleArray.includes(item) || crossArray.includes(item)) return;
    if (turn) {
      const newCircleArray = [...circleArray, item];
      setCircleArray(newCircleArray);
      if(newCircleArray.length + crossArray.length === 9 && !isWin(newCircleArray)) setWinner('Tie');
      if (newCircleArray.length > 2 && isWin(newCircleArray)) setWinner('Circle');
    } else {
      const newCrossArray = [...crossArray, item];
      setCrossArray(newCrossArray);
      if(newCrossArray.length + circleArray.length === 9 && !isWin(newCrossArray)) setWinner('Tie');
      if (newCrossArray.length > 2 && isWin(newCrossArray)) setWinner('Cross');
    }
    if(circleArray.length + crossArray.length === 9 && winner === null) setWinner('Tie');
    setTurn(!turn);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {turn ? 'It\'s ⭕\'s turn' : 'It\'s ❌\'s turn'}
        </div>
        <div className='button-container'>
          <button onClick={reset}>Restart</button>
        </div>
        <div>
          {winner === null ? '' : winner === 'Cross' ? '❌ won, please restart.' : winner === 'Circle' ? '⭕ won, please restart.' : 'Tied, please restart.'}
        </div>
        <div className='item-box'>
          {items.map((item) =>
            <button key={item} className='item' onClick={winner == null ? () => handleTick(item) : null}>
              {crossArray.includes(item) ? <span>❌</span> : circleArray.includes(item) ? <span>⭕</span> : <span></span>}
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
