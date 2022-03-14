export const getAll = async () => {
  try {
    const res = await fetch("http://localhost:8080/", {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (err) {
    return [];
  }
};

export const create = async (todoName) => {
  const res = await fetch("http://localhost:8080/", {
    method: 'POST',
    mode: 'cors',
    headers: { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: todoName })
  });
  const json = await res.json();
  return json;
}

export const put = async (id, name, completed) => {
  await fetch("http://localhost:8080/", {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, name: name, completed: completed })
  });
}