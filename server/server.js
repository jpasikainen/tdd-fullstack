'use strict';

const express = require('express');
const db = require('./db')

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

app.get('/healthcheck', async (req, res) => {
  const ok = await testConnection();
  res.send(ok);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);