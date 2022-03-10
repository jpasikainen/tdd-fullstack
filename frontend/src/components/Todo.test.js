import { fireEvent, render, screen } from '@testing-library/react';
import Todo from './Todo';

describe('todo', () => {
  let updated = false;
  const mockUpdate = () => updated = true;
  let toggled = false;
  const mockToggle = () => toggled = !toggled;
  beforeEach(() => {
    updated = false;
    toggled = false;
  });

  test('renders', () => {
    render(<Todo id={0} name={"foo"} completed={false} updateCallback={mockUpdate} toggleCallback={mockToggle} />);
    expect(screen.getByRole('textbox')).toHaveValue("foo")
  });
  test('can be marked as completed', () => {
    render(<Todo id={0} name={"foo"} completed={false} updateCallback={mockUpdate} toggleCallback={mockToggle} />);
    fireEvent.click(screen.getByText('Complete'));
    expect(toggled).toBe(true);
  });
  
  test('can returned back to not completed', () => {
    render(<Todo id={0} name={"foo"} completed={false} updateCallback={mockUpdate} toggleCallback={mockToggle} />);
    fireEvent.click(screen.getByText('Complete'));
    fireEvent.click(screen.getByText('Complete'));
    expect(toggled).toBe(false);
  });
  
  test('can be renamed', () => {
    render(<Todo id={0} name={"foo"} completed={false} updateCallback={mockUpdate} toggleCallback={mockToggle} />);
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'foo'}});
    expect(screen.getByRole('textbox')).toHaveValue('foo');
  });
});