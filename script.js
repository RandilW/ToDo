const taskList = document.getElementById('task-list');
const form = document.getElementById('form');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');

// Check for tasks in local storage
let tasks;
if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    createTaskElement(task);
  });
}

// Event listener for form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  const taskName = taskInput.value.trim();

  if (taskName === '') {
    alert('Please enter a task name');
  } else {
    createTaskElement(taskName);
    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
  }
});

// Function to create a new task element
function createTaskElement(taskName) {
  const task = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', e => {
    if (checkbox.checked) {
      label.classList.add('completed');
    } else {
      label.classList.remove('completed');
    }
    updateLocalStorage();
  });

  label.innerText = taskName;

  task.appendChild(checkbox);
  task.appendChild(label);
  taskList.appendChild(task);
}

// Function to update local storage
function updateLocalStorage() {
  const taskElements = document.querySelectorAll('#task-list li label');
  const taskNames = [];
  taskElements.forEach(element => {
    taskNames.push(element.innerText);
  });
  localStorage.setItem('tasks', JSON.stringify(taskNames));
}
