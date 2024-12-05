fetch('/api/tasks')
  .then(response => response.json())
  .then(tasks => {
    const taskList = document.getElementById('task-list');
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title} (${task.completed ? 'Terminé' : 'En cours'})`;
      taskList.appendChild(li);
    });
  })
  .catch(error => {
        handleError('Erreur lors du chargement des tâches:', error);
    
    function handleError(message, error) {
      // Implement custom error handling logic here
      alert(`${message} ${error}`);
    }
  });
