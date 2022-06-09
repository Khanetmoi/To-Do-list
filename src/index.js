import './styles/style.css';

const list = [
  {
    id: 1,
    description: 'Wash the dishes',
    checkbox: 'false',
  },
  {
    id: 2,
    description: 'Complete the To do List',
    checkbox: 'false',
  },
];

const taskOption = document.querySelector('.tasks-options');
const listOfTasks = list.map((t) => `<li class="flex-justify">
                <div class="tasks flex">
                    <input type="checkbox">
                    <h2>${t.description}</h2>
                </div>
                <ul class="options">
                    <li ><button><i class="fa-solid fa-ellipsis-vertical"></i></button></li>
                    <li class="hide"><button>edit</button></li>
                    <li class="hide"><button>remove</button></li>
                </ul>
            </li>`).join('');
taskOption.innerHTML += listOfTasks;