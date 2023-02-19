let submitButton = document.querySelector('button');
let input = document.querySelector('input');
let form = document.querySelector('form');
let arrow = document.querySelector('.icon-arrow');
let close = document.querySelector('.icon-error');
let check = document.querySelector('.icon-success');
let checkPath = document.querySelector('.icon-success path');



const taskList = document.getElementById('task-list');
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



console.log(checkPath.getTotalLength());
submitButton.addEventListener('click', e => {
  e.preventDefault();
  if (form.dataset.state != "typing") {
    TweenMax.to(close, 0.5, {
      opacity: 0,
      rotation: 0 });

    TweenMax.fromTo(check, 0.5, {
      rotation: 360 * 3 },
    {
      rotation: 0 });

    TweenMax.to(checkPath, 0.5, {
      strokeDashoffset: 175 });

    form.dataset.state = "typing";
    TweenMax.fromTo(arrow, 0.45, {
      rotation: 0,
      x: '-60px',
      opacity: '0' },
    {
      rotation: 0,
      x: '0',
      opacity: '1' });

    return;
  }

  TweenMax.to(arrow, 1, {
    rotation: 360 * 5,
    transformOrigin: "50% 50%",
    opacity: 0 });


  setTimeout(() => {
    if (input.value == '') {
      form.dataset.state = "error";
      // alert('Please enter a task name');
      TweenMax.to(close, 0.5, {
        rotation: 360 * 3,
        opacity: 1 });

    } else {
      form.dataset.state = "success";
      TweenMax.to(checkPath, 0.65, {
        strokeDashoffset: 0 });

        const taskName = taskInput.value.trim();
        createTaskElement(taskName);
        tasks.push(taskName);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
    }
  }, 500);
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
