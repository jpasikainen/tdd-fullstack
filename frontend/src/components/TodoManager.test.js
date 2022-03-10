import { fireEvent, render, screen } from '@testing-library/react';
import TodoManager from './TodoManager';

describe('todo manager', () => {
  beforeEach(() => {
    render(<TodoManager />)
  });

  test('initializes', () => {
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  
});