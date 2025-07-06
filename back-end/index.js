const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/odds', async (req, res) => {
  // Chame seus scrapers aqui
  res.json({ message: 'Odds serão aqui' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
