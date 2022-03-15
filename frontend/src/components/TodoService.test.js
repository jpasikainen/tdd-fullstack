import {getAll, create, put, deleteAll} from './TodoService'

describe('service', () => {    
  let fetchMock;
  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({id: 1})
    })
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets all', async () => {
    await getAll();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('gets id back when creating', async () => {
    const id = await create('foo');
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/",
      {"body": "{\"name\":\"foo\"}", "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}, "method": "POST", "mode": "cors"}
    );
    expect(id).toEqual({"id": 1});
  })
})
