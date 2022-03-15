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
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/",
      {"headers": {"Access-Control-Allow-Origin": "*"}, "mode": "cors"}
    );
  });

  it('gets id back when creating', async () => {
    const id = await create('foo');
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/",
      {"body": "{\"name\":\"foo\"}", "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}, "method": "POST", "mode": "cors"}
    );
    expect(id).toEqual({"id": 1});
  });

  it('put is called correctly', async () => {
    await put(1, 'foo', true);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/",
      {"body": "{\"id\":1,\"name\":\"foo\",\"completed\":true}", "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}, "method": "PUT", "mode": "cors"}
    );
  });
})
