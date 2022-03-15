import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import TodoManager from './TodoManager';

describe('todo manager', () => {
  let getAll;
  let create;
  let put;
  let deleteAll;
  beforeEach(() => {
    getAll = jest.fn();
    create = jest.fn().mockReturnValue({id: 0, name: 'foo', completed: false});
    put = jest.fn();
    deleteAll = jest.fn();
    render(<TodoManager testing={true} getAll={getAll} create={create} put={put} deleteAll={deleteAll} />)
  });

  test('initializes', () => {
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
  
  test('creates new todo', async () => {
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'foo'}});
    await waitFor(() => {
      fireEvent.click(screen.getByText('Add'));
    });
    
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('foo');
    expect(create).toBeCalledWith('foo');
  });

  test('can archive completed', async () => {
    await waitFor(() => {
      fireEvent.change(screen.getAllByRole('textbox')[0], {target: {value: 'foo'}});
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Complete'));
      fireEvent.click(screen.getByText('Archive'));
    });
    expect(put).toBeCalledWith(0, '', true);
    expect(deleteAll).toBeCalledWith();
  });
  
  test('updates todo text when changed', async () => {
    await waitFor(() => {
      fireEvent.change(screen.getAllByRole('textbox')[0], {target: {value: 'foo'}});
      fireEvent.click(screen.getByText('Add'));
      fireEvent.change(screen.getAllByRole('textbox')[1], {target: {value: 'bar'}});
    })
    expect(put).toBeCalledWith(0, 'bar', false);  });
});