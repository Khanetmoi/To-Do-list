const updateLocal = () => {
  const localData = JSON.parse(localStorage.getItem('tasks'));
  const tasks = document.querySelectorAll('span');
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('crossed')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(localData));
};

export default updateLocal;