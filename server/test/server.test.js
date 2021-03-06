var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var controller = require("../todoController.js");
var db = require('../db');
const flushPromises = () => new Promise(setImmediate);

describe('server', () => {
  let req, res;
  beforeEach(() => {
    req = { body: {} };
    res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('adds todo', async () => {
    const data = { id: 0 };
    const dbStub = sinon.stub(db, 'one').resolves(data);
    req.body = { name: 'foo', completed: false }
    await controller.create(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.send, {id: 0});
    sinon.assert.calledWith(dbStub, 'INSERT INTO todos (name, completed) VALUES($1, $2) RETURNING id', ['foo', false]);
  });

  it('doesnt add todo without name and completed status', async () => {
    const dbStub = sinon.stub(db, 'one').resolves({});
    await controller.create(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.notCalled(dbStub);
  });

  it('deletes todo', async () => {
    const dbStub = sinon.stub(db, 'any').resolves({});
    controller.delete(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.status, 204);
    sinon.assert.calledWith(dbStub, 'DELETE FROM todos WHERE completed = TRUE', []);
  });

  it('updates todo with id, name and completed status', async () => {
    const data = { id: 0, name: 'foo', completed: false };
    const dbStub = sinon.stub(db, 'one').resolves(data);
    req.body = { id: 0, name: 'bar', completed: true }
    controller.update(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.send, { id: 0, name: 'bar', completed: true });
    sinon.assert.calledWith(dbStub, 'UPDATE todos SET name = $1, completed = $2 WHERE id = $3 RETURNING id, name, completed', ['bar', true, 0]);
  });

  it('doesnt update faulty todo', async () => {
    controller.update(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.status, 400);
  });

  it('gets all todos', async () => {
    const data = [{ id: 0, name: 'foo', completed: false }, { id: 1, name: 'bar', completed: true }];
    const dbStub = sinon.stub(db, 'any').resolves(data);
    req.body = {};
    controller.getAll(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, data);
    sinon.assert.calledWith(dbStub, 'SELECT * FROM todos');
  });
});