import './styles/style.css';
import Tasks from './modules/task.js';
import updateLocal from './modules/updateLocal.js';
import editTask from './modules/editTask.js';
import removeTask from './modules/remove.js';
import clear from './modules/clear.js';

const taskOption = document.querySelector('.tasks-options');
const textInput = document.querySelector('.input-width');
const clearBtn = document.querySelector('.clear-button');
const tasksArray = [];

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

clearBtn.addEventListener('click', clear);
