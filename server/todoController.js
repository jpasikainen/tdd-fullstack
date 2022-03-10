const db = require("./db.js");

exports.create = async (req, res) => {
  const todo = req.body;
  db.one('INSERT INTO todos VALUES($1) RETURNING id', [todo.name])
    .then((data) => {
      res.code(201).send({id: data.id});
    }).catch((err) => res.code(400).send(err));
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