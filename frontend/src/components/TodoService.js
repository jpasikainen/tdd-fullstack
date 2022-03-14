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
