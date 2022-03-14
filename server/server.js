'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors')
const db = require('./db')
const controller = require('./todoController')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

async function testConnection() {
  try {
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    return "OK"; // return server version
  } catch (err) {
    return "FAILURE"
  }
}

// App
const app = express();
app.use(cors())

app.get('/healthcheck', async (req, res) => {
  const ok = await testConnection();
  res.send(ok);
});

router.get('/', controller.getAll);
router.put('/', controller.update);
router.delete('/', controller.delete);
router.post('/', controller.create);

app.use(router)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);