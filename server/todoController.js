exports.create = (req, res) => {
  res.code(201).send({message: 'created'});
}

exports.delete = (req, res) => {
  res.code(204).send({message: 'deleted'});
}

exports.update = (req, res) => {
  res.code(201).send({message: 'updated'});
}

exports.getAll = (req, res) => {
  res.code(201).send({message: 'updated'});
}