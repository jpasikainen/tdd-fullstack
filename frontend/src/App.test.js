import { fireEvent, render, screen } from '@testing-library/react';
import Todo from './components/Todo';

describe('todos', () => {
  test('renders', () => {
    const name = 'Test Message'
    render(<Todo name={name} completed={false} />)
    expect(screen.getByRole('textbox')).toHaveValue(name)
  });

  test('can be marked as completed', () => {
    render(<Todo name="test" completed={false} />)
    fireEvent.click(screen.getByText('Complete'));
    expect(screen.getByRole('textbox').closest('div')).toHaveClass('completed');
  });

  test('can returned back to not completed', () => {
    render(<Todo name="test" completed={true} />)
    fireEvent.click(screen.getByText('Complete'));
    expect(screen.getByRole('textbox').closest('div')).not.toHaveClass('completed');
  });

  test('only one is affected on click', () => {
    render(
      <div>
        <Todo name='test' completed={false} />
        <Todo name='foobar' completed={false} />
      </div>
    );
    fireEvent.click(screen.getAllByText('Complete')[0]);
    expect(screen.getAllByRole('textbox')[0].closest('div')).toHaveClass('completed');
  });

  test('can be renamed', () => {
    render(<Todo name='test' completed={true} />)
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'foo'}});
    
    expect(screen.getByRole('textbox')).toHaveValue('foo')
  });
});