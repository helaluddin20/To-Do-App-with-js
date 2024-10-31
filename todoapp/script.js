const taskInput = document.getElementById('taskInput');
const taskOutput = document.getElementById('taskOutput');
const addTaskButton = document.getElementById('addTaskButton');
let tasks = [];
const buttonStyles = {
  checkboxStyles: {
    color: 'red',
    backgroundColor: 'yellow',

    fontSize: '15px',
    height: '20px',
    width: '20px',
  },
  deleteStyles: {
    color: 'red',
    backgroundColor: 'yellow',
    marginLeft: '20px',

    fontSize: '15px',
    height: '30px',
    width: '60px',
    borderRadius: '30%',
    position: 'absolute',
  },
};

function displayTask() {
  taskOutput.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement('li');

    // Create checkbox for marking task as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    Object.assign(checkbox.style, buttonStyles.checkboxStyles);

    checkbox.checked = tasks[i].completed;
    checkbox.onclick = function () {
      tasks[i].completed = checkbox.checked; // Update completed status
      displayTask(); // Re-display tasks
    };

    // Set task text and apply line-through if completed
    li.textContent = tasks[i].text;
    if (tasks[i].completed) {
      li.style.textDecoration = 'line-through';
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    Object.assign(deleteButton.style, buttonStyles.deleteStyles);
    deleteButton.addEventListener('mouseover', () => {
      deleteButton.style.backgroundColor = 'blue';
    });
    deleteButton.addEventListener('mouseout', () => {
      deleteButton.style.backgroundColor = deleteStyles.backgroundColor;
    });
    deleteButton.onclick = function (event) {
      event.stopPropagation(); // Prevent checkbox toggle on delete click
      tasks.splice(i, 1); // Remove task
      displayTask(); // Re-display tasks
    };

    // Append checkbox and delete button to list item
    li.prepend(checkbox);
    li.appendChild(deleteButton);
    taskOutput.appendChild(li);
  }
}

addTaskButton.onclick = function () {
  const task = taskInput.value;
  if (task) {
    tasks.push({ text: task, completed: false }); // Add task with completed property
    taskInput.value = '';
    displayTask();
  } else {
    alert('Please enter a task!');
  }
};
