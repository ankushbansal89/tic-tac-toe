import React from 'react';
import { render } from '@testing-library/react';
import Board from '../Board.react'

test('Number of "x" and "o" should be correct', () => {
    const squares = ['o', 'x', 'o', 'x', 'x', 'o', 'x', 'x', 'o'];
    const { queryAllByText } = render(<Board squares={squares}/>);
    expect(queryAllByText('x').length).toBe(5);
    expect(queryAllByText('o').length).toBe(4);
});