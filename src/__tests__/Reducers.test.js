import { stepsReducer, INCREMENT_STEP, SET_STEP, xIsNextReducer, TOGGLE_X_IS_NEXT, SET_X_IS_NEXT, historyReducer, UPDATE_HISTORY } from '../Reducers';

describe('stepsReducer function', () => {
    test('increase step number by one when INCREMENT_STEP is dispatched', () => {
        const newStepNumber = stepsReducer(0, {
            type: INCREMENT_STEP
        });
        expect(newStepNumber).toBe(1);
    });
    test('set step number to new step number when SET_STEP is dispatched', () => {
        const newStepNumber = stepsReducer(0, {
            type: SET_STEP,
            newStepNumber: 1
        });
        expect(newStepNumber).toBe(1);
    });
    test('throws error if new step number is not defined when SET_STEP is dispatched', () => {
        expect(() => stepsReducer(0, {
            type: SET_STEP
        })).toThrow();
    });
    test('return default state if type is not defined', () => {
        const stepNumber = stepsReducer(1);
        expect(stepNumber).toBe(1);
    });
});

describe('xIsNextReducer function', () => {
    test('toggle xIsNext when TOGGLE_X_IS_NEXT is dispatched', () => {
        const xIsNext = xIsNextReducer(true, {
            type: TOGGLE_X_IS_NEXT
        });
        expect(xIsNext).toBe(false);
    });
    test('set xIsNext to false if set number is odd when SET_X_IS_NEXT is dispatched', () => {
        const xIsNext = xIsNextReducer(true, {
            type: SET_X_IS_NEXT,
            stepNumber: 5
        });
        expect(xIsNext).toBe(false);
    });
    test('set xIsNext to true if set number is even when SET_X_IS_NEXT is dispatched', () => {
        const xIsNext = xIsNextReducer(true, {
            type: SET_X_IS_NEXT,
            stepNumber: 6
        });
        expect(xIsNext).toBe(true);
    });
    test('throws error if set number is even when SET_X_IS_NEXT is dispatched', () => {
        expect(() => xIsNextReducer(true, {
            type: SET_X_IS_NEXT,
        })).toThrow();
    });
    test('return default state if type is not defined', () => {
        const xIsNext = xIsNextReducer(true);
        expect(xIsNext).toBe(true);
    });
});

describe('historyReducer function', () => {
    test('returns new history based on xIsNext = true, stepNumber and index when UPDATE_HISTORY is dispatched', () => {
        const currHistory = [{
            squares: Array(9).fill(null)
        }];
        const index = 1;
        const stepNumber = 0;
        const newHistory = historyReducer(currHistory, {
            type: UPDATE_HISTORY,
            xIsNext: true,
            stepNumber,
            index
        });
        expect(newHistory).toHaveLength(2);
        expect(newHistory).not.toBe(currHistory);
        expect(newHistory[stepNumber + 1].squares[index]).toBe('X');
    });
    test('returns new history based on xIsNext = false, stepNumber and index when UPDATE_HISTORY is dispatched', () => {
        const currHistory = [{
            squares: Array(9).fill(null)
        }];
        const index = 1;
        const stepNumber = 0;
        const newHistory = historyReducer(currHistory, {
            type: UPDATE_HISTORY,
            xIsNext: false,
            stepNumber,
            index
        });
        expect(newHistory).toHaveLength(2);
        expect(newHistory).not.toBe(currHistory);
        expect(newHistory[stepNumber + 1].squares[index]).toBe('O');
    });

    test('throws error if index is not set correctly when UPDATE_HISTORY is dispatched', () => {
        const currHistory = [{
            squares: Array(9).fill(null)
        }];
        const stepNumber = 0;
        expect(() => historyReducer(currHistory, {
            type: UPDATE_HISTORY,
            xIsNext: true,
            stepNumber,
        })).toThrow();
    });    
    test('throws error if xIsNext is not set correctly when UPDATE_HISTORY is dispatched', () => {
        const currHistory = [{
            squares: Array(9).fill(null)
        }];
        const stepNumber = 0;
        const index = 1;
        expect(() => historyReducer(currHistory, {
            type: UPDATE_HISTORY,
            stepNumber,
            index
        })).toThrow();
    });    

    test('throws error if stepNumber is not set correctly when UPDATE_HISTORY is dispatched', () => {
        const currHistory = [{
            squares: Array(9).fill(null)
        }];
        const index = 1;
        expect(() => historyReducer(currHistory, {
            type: UPDATE_HISTORY,
            index,
            xIsNext: true
        })).toThrow();
    });

    test('throws error if history is not set correctly when UPDATE_HISTORY is dispatched', () => {
        const currHistory = {
            squares: Array(9).fill(null)
        };
        const index = 1;
        const stepNumber = 0;
        expect(() => historyReducer(currHistory, {
            type: UPDATE_HISTORY,
            index,
            xIsNext: true,
            stepNumber
        })).toThrow();
    });

    test('return default state if type is not defined', () => {
        const currHistory = [{
            squares: Array(9).fill(null)
        }];
        const newHistory = historyReducer(currHistory);
        expect(newHistory.length).toBe(currHistory.length);
        expect(newHistory).toBe(currHistory);
    });
});