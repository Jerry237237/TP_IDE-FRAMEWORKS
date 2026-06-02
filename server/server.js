require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/ping', (req, res) => {
  res.json({ message: "Serveur TaskFlow operationnel" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});