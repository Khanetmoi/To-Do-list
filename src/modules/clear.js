import removeTask from './remove.js';

const clear = () => {
  const localData = JSON.parse(localStorage.getItem('tasks'));
  const taskContainer = document.querySelectorAll('.taskContainer');
  taskContainer.forEach((i) => {
    if (i.classList.contains('checked')) {
      removeTask(i);
    }
  });
  let count = 0;
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.map((i) => {
    count += 1;
    i.index = count;
    return i.index;
  });
  localStorage.setItem('tasks', JSON.stringify(data));
};

export default clear;