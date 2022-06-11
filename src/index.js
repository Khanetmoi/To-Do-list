import './styles/style.css';
import Tasks from './modules/task.js';
import updateLocal from './modules/updateLocal.js';
import editTask from './modules/editTask.js';
import removeTask from './modules/remove.js';
import clear from './modules/clear.js';
// const container = document.querySelector('.maincontainer');
const taskOption = document.querySelector('.tasks-options');
const textInput = document.querySelector('.input-width');
const clearBtn = document.querySelector('.clear-button');
const tasksArray = [];

// Task
// class Tasks {
//   constructor(description, completed, index) {
//     this.description = description;
//     this.completed = completed;
//     this.index = index;
//   }
// }

// const updateLocal = () => {
//   const localData = JSON.parse(localStorage.getItem('tasks'));
//   const tasks = document.querySelectorAll('span');
//   for (let i = 0; i < tasks.length; i += 1) {
//     if (tasks[i].classList.contains('crossed')) {
//       localData[i].completed = true;
//     } else {
//       localData[i].completed = false;
//     }
//   }
//   localStorage.setItem('tasks', JSON.stringify(localData));
// };

// const editTask = (taskContainer, task) => {
//   const editInput = document.createElement('input');
//   editInput.type = 'text';
//   editInput.className = 'editInput';
//   editInput.value = task.textContent;
//   taskContainer.replaceChild(editInput, task);
//   editInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//       const taskContainers = document.querySelectorAll('.taskContainer');
//       const localData = JSON.parse(localStorage.getItem('tasks'));
//       for (let i = 0; i < taskContainers.length; i += 1) {
//         if (taskContainers[i].classList.contains('checked')) {
//           localData[i].description = editInput.value;
//           localStorage.setItem('tasks', JSON.stringify(localData));
//         }
//       }
//       editInput.parentElement.classList.remove('checked');
//       taskContainer.replaceChild(task, editInput);
//       task.textContent = editInput.value;
//     }
//   });
// };

// const removeTask = (task) => {
//   taskOption.removeChild(task);
//   let count = 0;
//   const localData = JSON.parse(localStorage.getItem('tasks'));
//   const data = Array.from(localData).filter((i) => i.completed === false);
//   data.map((i) => {
//     count += 1;
//     i.index = count;
//     return i.index;
//   });
//   localStorage.setItem('tasks', JSON.stringify(data));
// };

const addTask = (taskValue) => {
  const taskContainer = document.createElement('div');
  taskContainer.className = 'taskContainer';
  taskContainer.innerHTML += `
     <input type="checkbox" class="checkbox">
     <span>${taskValue}</span>
     <i class="fa-solid fa-ellipsis-vertical"></i>
     <i class="fa-solid fa-trash-can"></i>
     
    `;
  taskOption.appendChild(taskContainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checked');
      i.nextElementSibling.classList.toggle('crossed');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
      updateLocal();
    });
  });

  const task = new Tasks(taskValue, false, checkbox.length - 1);
  tasksArray.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));

  const edit = document.querySelectorAll('.fa-ellipsis-vertical');
  edit.forEach((i) => {
    i.addEventListener('click', () => {
      editTask(taskContainer, i.previousElementSibling);
      i.parentElement.classList.add('checked');
    });
  });

  const removeIcons = document.querySelectorAll('.fa-trash-can');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTask(i.parentElement);
    });
  });
};

textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && textInput.value) {
    e.preventDefault();
    addTask(textInput.value);
    textInput.value = null;
  }
});

const getFromLocal = () => {
  const data = JSON.parse(localStorage.getItem('tasks'));
  data.map((i) => {
    tasksArray.push(i);
    const taskContainer = document.createElement('div');
    taskContainer.className = 'taskContainer';
    taskContainer.innerHTML += `
     <input type="checkbox" class="checkbox">
     <span>${i.description}</span>
     <i class="fa-solid fa-ellipsis-vertical"></i>
     <i class="fa-solid fa-trash-can"></i>
    `;
    taskOption.appendChild(taskContainer);
    const edit = document.querySelectorAll('.fa-ellipsis-vertical');
    edit.forEach((i) => {
      i.addEventListener('click', () => {
        editTask(taskContainer, i.previousElementSibling);
        i.parentElement.classList.add('checked');
      });
    });
  });
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checked');
      i.nextElementSibling.classList.toggle('crossed');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
      updateLocal();
    });
  });
  const removeIcons = document.querySelectorAll('.fa-trash-can');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTask(i.parentElement);
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasksArray));
};

window.addEventListener('load', getFromLocal);

// const clear = () => {
//   const localData = JSON.parse(localStorage.getItem('tasks'));
//   const taskContainer = document.querySelectorAll('.taskContainer');
//   taskContainer.forEach((i) => {
//     if (i.classList.contains('checked')) {
//       removeTask(i);
//     }
//   });
//   let count = 0;
//   const data = Array.from(localData).filter((i) => i.completed === false);
//   data.map((i) => {
//     count += 1;
//     i.index = count;
//     return i.index;
//   });
//   localStorage.setItem('tasks', JSON.stringify(data));
// };

clearBtn.addEventListener('click', clear);