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

  it('doesnt add faulty todo', async () => {
    await controller.create(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 400);
  });

  it('deletes todo', async () => {
    controller.delete(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 204);
    sinon.assert.calledWith(res.send, {message: 'deleted'});
  });

  it('updates todo', async () => {
    controller.update(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 201);
    sinon.assert.calledWith(res.send, {message: 'updated'});
  });

  it('gets todo', async () => {
    controller.getAll(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 200);
    sinon.assert.calledWith(res.send, {message: 'updated'});
  });
});