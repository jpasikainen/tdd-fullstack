import { fireEvent, render, screen } from '@testing-library/react';
import Todo from './components/Todo';

describe('todos', () => {
  test('renders', () => {
    const name = 'Test Message'
    render(<Todo name={name} completed={false} />)
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test('can be marked as completed', () => {
    render(<Todo name="test" completed={false} />)
    fireEvent.click(screen.getByText("test"));
    expect(screen.getByText("test")).toHaveClass('completed');
  });

  test('can returned back to not completed', () => {
    render(<Todo name="test" completed={true} />)
    fireEvent.click(screen.getByText("test"));
    expect(screen.getByText("test")).not.toHaveClass('completed');
  });
});