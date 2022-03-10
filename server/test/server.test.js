var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var controller = require("../todoController.js");
const flushPromises = () => new Promise(setImmediate);

describe('server', () => {
  let req, res;
  beforeEach(() => {
    req = { body: {} };
    res = { code: sinon.stub().returnsThis(), send: sinon.stub() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('adds todo', async () => {
    req.body = { name: 'foo', completed: false }
    await controller.create(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 201);
    sinon.assert.calledWith(res.send, {message: 'created'});
  });

  it('doesnt add todo without name and completed status', async () => {
    await controller.create(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 400);
  });

  it('deletes todo', async () => {
    req.body = { id: 0 }
    controller.delete(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 204);
    sinon.assert.calledWith(res.send, {message: 'deleted'});
  });

  it('doesnt delete todo when no id', async () => {
    controller.delete(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 400);
  });

  it('updates todo with id, name and completed status', async () => {
    req.body = { id: 0, name: 'foo', completed: false }
    controller.update(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 201);
    sinon.assert.calledWith(res.send, { id: 0, name: 'foo', completed: false });
  });

  it('doesnt update faulty todo', async () => {
    controller.update(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 400);
  });

  it('gets todo', async () => {
    controller.getAll(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 200);
    sinon.assert.calledWith(res.send, {message: 'updated'});
  });
});