import { isArray, isBoolean, isNumber } from "util";

export const INCREMENT_STEP = 'incrementStep';
export const SET_STEP = 'setStep';
export const TOGGLE_X_IS_NEXT = 'toggleXIsNext';
export const SET_X_IS_NEXT = 'setXIsNext';
export const UPDATE_HISTORY = 'updateHistory';

export function stepsReducer(stepNumber, { type, newStepNumber } = {}) {
    switch(type) {
        case INCREMENT_STEP:
            return stepNumber + 1;
        case SET_STEP:
            if (newStepNumber !== undefined && newStepNumber !== null) {
                return newStepNumber;
            }
            throw new Error('newSteps is not defined');
        default:
            return stepNumber;
    }
}

export function xIsNextReducer(xIsNext, { type, stepNumber } = {}) {
    switch(type) {
        case TOGGLE_X_IS_NEXT:
            return !xIsNext;
        case SET_X_IS_NEXT:
            if (stepNumber !== undefined && stepNumber !== null) {
                return (stepNumber % 2 === 0);
            }
            throw new Error('steps is not defined');
        default:
            return xIsNext;
    }
}

export function historyReducer(history, { type, xIsNext, stepNumber, index } = {}) {
    switch(type) {
        case UPDATE_HISTORY:
            return updateHistory({ history, xIsNext,stepNumber, index });
        default:
            return history;
    }
}

function updateHistory({ history, xIsNext, stepNumber, index }) {
    if (!isArray(history)) {
        throw new Error('History does not have a correct value');
    }
    if (!isBoolean(xIsNext)) {
        throw new Error('xIsNext does not have a correct value');
    }
    if (!isNumber(stepNumber) || stepNumber < 0) {
        throw new Error('stepNumber does not have a correct value');
    }
    if (!isNumber(index) || index < 0) {
        throw new Error('index does not have a correct value');
    }
    const currHistory = history.slice(0, stepNumber + 1);
    const current = currHistory[currHistory.length - 1];
    const squares = current.squares.slice();
    squares[index] = xIsNext ? "X" : "O";
    return currHistory.concat(
        {
            squares: squares
        }
    );
}