require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;
const apiKey = process.env.ODDS_API_KEY;

app.use(cors());

// Função para buscar odds, recebe o esporte como parâmetro
async function fetchOdds(sport = 'soccer_epl') {
  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds`;
  const response = await axios.get(url, {
    params: {
      apiKey,
      regions: 'eu',
      markets: 'h2h',
      oddsFormat: 'decimal',
    },
  });
  return response.data;
}

// Rota geral de odds
app.get('/api/odds', async (req, res) => {
  try {
    const data = await fetchOdds();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar odds' });
  }
});

// Rota para odds dos jogos de hoje
app.get('/api/odds/today', async (req, res) => {
  try {
    const data = await fetchOdds();
    const today = new Date().toISOString().split('T')[0];
    const jogosHoje = data.filter(jogo => jogo.commence_time.startsWith(today));
    res.json(jogosHoje);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar odds' });
  }
});

// Rota para listar esportes disponíveis
app.get('/api/sports', async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/', {
      params: { apiKey },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar esportes' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
