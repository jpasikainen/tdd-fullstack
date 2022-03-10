//const db = require("./db");

exports.create = async (req, res) => {
  //await db.query('INSERT INTO todos (name, completed) VALUES(${this.csv})', req.body);
  const todo = req.body;
  if (todo.name === undefined || todo.completed === undefined) return res.code(400);
  res.code(201).send({message: 'created'});
}

exports.delete = (req, res) => {
  res.code(204).send({message: 'deleted'});
}

exports.update = (req, res) => {
  res.code(201).send({message: 'updated'});
}

exports.getAll = (req, res) => {
  res.code(200).send({message: 'updated'});
}