var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var { create } = require("../todoController");
const flushPromises = () => new Promise(setImmediate);

describe('server', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('adds data', async () => {
    const req = { body: {} };
    const res = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    create(req, res);
    await flushPromises();
    sinon.assert.calledWith(res.code, 201);
    sinon.assert.calledWith(res.send, {message: 'created'});
  });
});