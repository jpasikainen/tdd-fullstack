exports.create = (req, res) => {
  res.code(201).send({message: 'created'});
}

exports.delete = (req, res) => {
  res.code(204).send({message: 'deleted'});
}