import { calculateWinner } from "../CalculateWinner.lib";

describe('calculate winner function', () => {
    test('returns correct winner when a row has same symbol', () => {
        const winner = calculateWinner(['X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O']);
        expect(winner).toBe('X');
    });
    test('returns correct winner when a diagonal has same symbol', () => {
        const winner = calculateWinner(['X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'X']);
        expect(winner).toBe('X');
    });
    test('returns null when there is no winner', () => {
        const winner = calculateWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
        expect(winner).toBeNull();
    });
});