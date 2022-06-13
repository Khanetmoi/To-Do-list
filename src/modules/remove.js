const removeTask = (task) => {
  const taskOption = document.querySelector('.tasks-options');
  taskOption.removeChild(task);
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('tasks'));
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.map((i) => {
    count += 1;
    i.index = count;
    return i.index;
  });
  localStorage.setItem('tasks', JSON.stringify(data));
};

export default removeTask;