import { fireEvent, render, screen } from '@testing-library/react';
import TodoManager from './TodoManager';

describe('todo manager', () => {
  beforeEach(() => {
    render(<TodoManager />)
  });

  test('initializes', () => {
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('creates new todo', () => {
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'foo'}});
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('foo');
  });
});