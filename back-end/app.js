const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

module.exports = app; // <--- Exporta o app
