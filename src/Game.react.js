import React, { useReducer } from 'react';
import Board from './Board.react';
import { calculateWinner } from './CalculateWinner.lib';
import { stepsReducer, SET_STEP, INCREMENT_STEP, xIsNextReducer, TOGGLE_X_IS_NEXT, SET_X_IS_NEXT, historyReducer, UPDATE_HISTORY } from './Reducers';

export default function Game() {
  const [history, historyDispatch] = useReducer(historyReducer, [{
    squares: Array(9).fill(null)
  }]);
  const [stepNumber, stepsDispatch] = useReducer(stepsReducer, 0);
  const [xIsNext, xIsNextDispatch] = useReducer(xIsNextReducer, true);

  function handleClick(index) {
    const { squares } = history[stepNumber];
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    historyDispatch({
      type: UPDATE_HISTORY,
      stepNumber,
      xIsNext,
      index
    })
    stepsDispatch({
      type: INCREMENT_STEP
    });
    xIsNextDispatch({
      type: TOGGLE_X_IS_NEXT
    });
  }

  function jumpTo(stepNumber) {
    stepsDispatch({
      type: SET_STEP,
      newStepNumber: stepNumber
    });
    xIsNextDispatch({
      type: SET_X_IS_NEXT,
      stepNumber
    });
  }

  const squares = history[stepNumber].squares;
  const winner = calculateWinner(squares);
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}