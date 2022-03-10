//const db = require("./db");

exports.create = async (req, res) => {
  //await db.query('INSERT INTO todos (name, completed) VALUES(${this.csv})', req.body);
  const todo = req.body;
  if (todo.name === undefined || todo.completed === undefined) return res.code(400);
  res.code(201).send({message: 'created'});
}

exports.delete = (req, res) => {
  const id = req.body.id;
  if (id === undefined) return res.code(400);
  res.code(204).send({message: 'deleted'});
}

exports.update = (req, res) => {
  const todo = req.body;
  if (todo.id === undefined || todo.name === undefined || todo.completed === undefined) return res.code(400);
  res.code(201).send({ id: todo.id, name: todo.name, completed: todo.completed });
}

exports.getAll = (req, res) => {
  const todos = [];
  res.code(200).send(todos);
}