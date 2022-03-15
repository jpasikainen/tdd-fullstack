import {getAll, create, put, deleteAll} from './TodoService'

const fetchMock = jest
  .spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }))

beforeEach(() => {
  fetch.mockClear();
});

describe('service', () => {
  it('gets all', async () => {
    await getAll();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });


})
