import { render, screen } from '@testing-library/react';
import Todo from './components/Todo';

test('renders learn react link', () => {
  const name = 'Test Message'
  render(<Todo name={name} completed={false} />)
  expect(screen.getByText(name)).toBeInTheDocument();
});
