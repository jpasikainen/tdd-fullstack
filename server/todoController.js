const db = require("./db.js");

exports.create = async (req, res) => {
  const todo = req.body;
  console.log(todo);
  if (todo.name === undefined) return res.status(400);

  db.one('INSERT INTO todos (name, completed) VALUES($1, $2) RETURNING id', [todo.name, false])
    .then((data) => {
      res.status(201).send({id: data.id});
    }).catch((err) => res.status(400).send(err));
}

exports.delete = (req, res) => {
  db.any('DELETE FROM todos WHERE completed = TRUE', [])
    .then((data) => {
      res.status(204);
    }).catch((err) => res.status(400).send(err));
}

exports.update = (req, res) => {
  const todo = req.body;
  if (todo.id === undefined || todo.name === undefined || todo.completed === undefined) return res.status(400);
  db.one('UPDATE todos SET name = $1, completed = $2 WHERE id = $3 RETURNING id, name, completed', [todo.name, todo.completed, todo.id])
    .then(() => {
      res.status(201).send({ id: todo.id, name: todo.name, completed: todo.completed });
    });
}

exports.getAll = (req, res) => {
  db.any('SELECT * FROM todos').then((data) => {
    res.status(200).send(data)
  });
}