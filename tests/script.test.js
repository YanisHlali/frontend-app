const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// Mock du module fetch
global.fetch = jest.fn();

const tasks = [
  { title: 'Learn Node.js', completed: false },
  { title: 'Build an app', completed: true },
];

beforeEach(() => {
  // Reset du mock fetch et du DOM avant chaque test
  fetch.mockClear();
  document.body.innerHTML = `<ul id="task-list"></ul>`;
});

test('devrait afficher la liste des tâches à partir de la requête fetch', async () => {
  // Simuler une réponse réussie de fetch
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(tasks),
  });

  // Charger et exécuter le script
  require('../public/script.js');

  // Attendre que les tâches soient affichées
  const task1 = await screen.findByText('Learn Node.js (En cours)');
  const task2 = await screen.findByText('Build an app (Terminé)');

  // Vérifier la présence des tâches dans le DOM
  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();
});
