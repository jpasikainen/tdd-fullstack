import '@testing-library/jest-dom'
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Todo from '../src/components/Todo'

test('todo renders', () => {
  const name = 'Test Message'
  render(<Todo name={name} completed={false} />)
  expect(screen.getByText(name)).toBeInTheDocument();
})