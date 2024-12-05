const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
import '@testing-library/jest-dom';


// Mock du module fetch
global.fetch = jest.fn();

// Structure de données simulée pour la réponse fetch
const tasks = [
  { title: 'Learn Node.js', completed: false },
  { title: 'Build an app', completed: true },
];

beforeEach(() => {
  // Reset du mock de fetch avant chaque test
  fetch.mockClear();
});

test('devrait afficher la liste des tâches à partir de la requête fetch', async () => {
  // Simuler une réponse réussie de fetch
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(tasks),
  });

  // Créer un élément de liste pour tester
  document.body.innerHTML = `<ul id="task-list"></ul>`;

  // Importer le script.js (assurez-vous qu'il est inclus correctement dans votre test)
  require('../public/script.js'); // Ce chemin dépend de votre structure de projet

  // Attendre que les tâches soient affichées
  await screen.findByText('Learn Node.js (En cours)');
  await screen.findByText('Build an app (Terminé)');

  // Vérifier que les tâches sont bien dans le DOM
  expect(screen.getByText('Learn Node.js (En cours)')).toBeInTheDocument();
  expect(screen.getByText('Build an app (Terminé)')).toBeInTheDocument();
});

test('devrait gérer une erreur si la requête échoue', async () => {
  // Simuler une erreur de fetch
  fetch.mockRejectedValueOnce(new Error('Erreur de réseau'));

  // Spy sur la fonction alert
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  // Créer un élément de liste pour tester
  document.body.innerHTML = `<ul id="task-list"></ul>`;

  // Importer le script.js (assurez-vous qu'il est inclus correctement dans votre test)
  require('../public/script.js'); // Ce chemin dépend de votre structure de projet

  // Vérifier que l'alerte d'erreur est appelée
  expect(alertSpy).toHaveBeenCalledWith('Erreur lors du chargement des tâches: Error: Erreur de réseau');
});
