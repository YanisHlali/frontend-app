const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour récupérer les tâches (proxy si besoin)
app.get('/api/tasks', async (req, res) => {
  try {
    const response = await fetch('http://192.168.49.2:32062/api/tasks');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend app running at http://localhost:${PORT}`);
});
