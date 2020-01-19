import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from '../Square.react';

test('Button click calls the onclick function', () => {
    const mockCallBack = jest.fn();
    const { getByText } = render(<Square value='x' onClick={mockCallBack}/>);
    fireEvent.click(getByText('x'));
    expect(mockCallBack).toBeCalled();
});