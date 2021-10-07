import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setXNext] = useState(true);

  const handleClick = i => {
    const nextSquares = squares.slice();
    if (calculateWinner(nextSquares) || nextSquares[i]) {
      return;
    }
    nextSquares[i] = isXNext ? 'X' : 'O';
    setXNext(!isXNext);
    setSquares(nextSquares);
  };

  const playAgain = () => {
    setSquares(Array(9).fill(null));
  };

  const renderSquare = i => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
      />
    );
  };

  const winner = calculateWinner(squares);

  return (
    <div>
      <div className="status">
        {winner ? (
          <div>
            Winner: <span className="winner">{winner}</span>
          </div>
        ) : (
          <div>
            Next player:{' '}
            <span className="next-player">{isXNext ? 'X' : 'O'}</span>
          </div>
        )}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <button className="play-again" onClick={() => playAgain()}>
        Play Again
      </button>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
