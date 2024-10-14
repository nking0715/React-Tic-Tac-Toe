import React, { useMemo, useState } from 'react';
import './App.css';

const App = () => {
  const [turn, setTurn] = useState<boolean>(false);
  const [winner, setWinner] = useState<'Cross' | 'Circle' | 'Tie' | ''>('');
  const [crossArray, setCrossArray] = useState<number[]>([]);
  const [circleArray, setCircleArray] = useState<number[]>([]);

  const items: number[] = [11, 12, 13, 21, 122, 23, 31, 32, 33];
  const WIN_SUMS: number[] = [36, 63, 69, 96, 166];

  const checkWin = (array: number[]): boolean => {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length - 1; j++) {
        let sum = array[i] + array[j] + array[array.length - 1];
        if (WIN_SUMS.includes(sum)) return true;
      }
    }
    return false;
  };

  const reset: () => void = () => {
    setTurn(Math.random() > 0.5);
    setCrossArray([]);
    setCircleArray([]);
    setWinner('');
  };

  const handleTick = (item: number): void => {
    if (circleArray.includes(item) || crossArray.includes(item)) return;
    if (turn) {
      const newCircleArray = [...circleArray, item];
      setCircleArray(newCircleArray);
      if (newCircleArray.length + crossArray.length === 9 && !checkWin(newCircleArray))
        setWinner('Tie');
      if (newCircleArray.length > 2 && checkWin(newCircleArray)) setWinner('Circle');
    } else {
      const newCrossArray = [...crossArray, item];
      setCrossArray(newCrossArray);
      if (newCrossArray.length + circleArray.length === 9 && !checkWin(newCrossArray))
        setWinner('Tie');
      if (newCrossArray.length > 2 && checkWin(newCrossArray)) setWinner('Cross');
    }
    setTurn(!turn);
  };

  const winnerCheck = useMemo<string>(() => {
    return !winner
      ? ''
      : winner === 'Cross'
        ? '❌ won, please restart.'
        : winner === 'Circle'
          ? '⭕ won, please restart.'
          : 'Tied, please restart.';
  }, [winner]);

  return (
    <div className="App">
      <header className="App-header">
        <div>{turn ? "It's ⭕'s turn" : "It's ❌'s turn"}</div>
        <div className="button-container">
          <button onClick={reset}>Restart</button>
        </div>
        <div>{winnerCheck}</div>
        <div className="item-box">
          {items.map((item) => (
            <button
              key={item}
              className="item"
              onClick={!winner ? () => handleTick(item) : undefined}>
              <span>
                {crossArray.includes(item) ? '❌' : circleArray.includes(item) ? '⭕' : ''}
              </span>
            </button>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
