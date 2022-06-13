const editTask = (taskContainer, task) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = task.textContent;
  taskContainer.replaceChild(editInput, task);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const taskContainers = document.querySelectorAll('.taskContainer');
      const localData = JSON.parse(localStorage.getItem('tasks'));
      for (let i = 0; i < taskContainers.length; i += 1) {
        if (taskContainers[i].classList.contains('checked')) {
          localData[i].description = editInput.value;
          localStorage.setItem('tasks', JSON.stringify(localData));
        }
      }
      editInput.parentElement.classList.remove('checked');
      taskContainer.replaceChild(task, editInput);
      task.textContent = editInput.value;
    }
  });
};

export default editTask;