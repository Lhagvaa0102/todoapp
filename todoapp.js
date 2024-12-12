const STATUSES = {
  TODO: "todo",
  INPROGRESS: "inProgress",
  DONE: "done",
  BLOCKED: "blocked",
};

let todos = [
  {
    id: 1,
    text: "loan managament",
    status: STATUSES.TODO,
  },

  {
    id: 2,
    text: "loan managament",
    status: STATUSES.INPROGRESS,
  },
  {
    id: 3,
    text: "loan managament",
    status: STATUSES.DONE,
  },
  {
    id: 4,
    text: "loan managament",
    status: STATUSES.BLOCKED,
  },
];

const todoTasksContainer = document.getElementById("todo_task_container");
const inProgressTasksContainer = document.getElementById(
  "inprogress_task_container"
);
const doneTasksContainer = document.getElementById("done_task_container");
const blockedTasksContainer = document.getElementById("blocked_task_container");
const addTaskButton = document.getElementById("addTask");
const submitButton = document.getElementById("dialog_button");
const dialogContainer = document.querySelector("div.dialog_container");
const inputElement = document.getElementById("input_element");
const selectElement = document.getElementById("select_status");
const todoElementCounter = document.getElementById("todo_count");
const inprogressElementCounter = document.getElementById("inprogress_count");
const doneElementCounter = document.getElementById("done_count");
const blockElementCounter = document.getElementById("block_count");
const dialog = document.querySelector("div.dialog");
let isCreatingTask = false;
let taskId = 0;
let counter = ``;
function renderTodoApp() {
  let todoTasks = ``;
  let inProgessTasks = ``;
  let doneTasks = ``;
  let blockedTasks = ``;

  let todoCount = 0;
  let inProgessCount = 0;
  let doneCount = 0;
  let blockedCount = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === STATUSES.TODO) {
      todoTasks += `<div class="task">
                      <div class="task_text">
                      <p>${todos[i].text}</p></div>
                      <div class="button_img" >
                      <button class="edit_button" onclick="editTask(${todos[i].id})"> <img class="img" src="edit.png" /></button>
                      <button class="delete_button" onclick="removeTask(${todos[i].id})">  <img class="img" src="Frame.png" /></button>
                      </div>
                    </div>`;
      todoCount++;
    }
    if (todos[i].status === STATUSES.INPROGRESS) {
      inProgessTasks += `<div class="task">
                      <div class="task_text">
                      <p>${todos[i].text}</p></div>
                      <div class="button_img" >
                      <button class="edit_button" onclick="editTask(${todos[i].id})"> <img class="img" src="edit.png" /></button>
                     <button class="delete_button" onclick="removeTask(${todos[i].id})">  <img class="img" src="Frame.png" /></button>
                     </div>
                    </div>`;
      inProgessCount++;
    }
    if (todos[i].status === STATUSES.DONE) {
      doneTasks += `<div class="task">
                       <div class="task_text">
                      <p>${todos[i].text}</p></div>
                      <div class="button_img">
                      <button class="edit_button" onclick="editTask(${todos[i].id})"> <img class="img" src="edit.png" /></button>
                     <button class="delete_button" onclick="removeTask(${todos[i].id})">  <img class="img" src="Frame.png" /></button>
                     </div>
                    </div>`;
      doneCount++;
    }
    if (todos[i].status === STATUSES.BLOCKED) {
      blockedTasks += `<div class="task">
                       <div class="task_text">
                      <p>${todos[i].text}</p></div>
                      <div class="button_img" >
                      <button class="edit_button" onclick="editTask(${todos[i].id})"> <img class="img" src="edit.png" /></button>
                     <button class="delete_button" onclick="removeTask(${todos[i].id})">  <img class="img" src="Frame.png" /></button>
                     </div>
                    </div>`;
      blockedCount++;
    }
  }

  todoTasksContainer.innerHTML = todoTasks;
  inProgressTasksContainer.innerHTML = inProgessTasks;
  doneTasksContainer.innerHTML = doneTasks;
  blockedTasksContainer.innerHTML = blockedTasks;
  todoElementCounter.innerHTML = todoCount;
  inprogressElementCounter.innerHTML = inProgessCount;
  doneElementCounter.innerHTML = doneCount;
  blockElementCounter.innerHTML = blockedCount;
  inputElement.value = "";
  selectElement.value = "";
  taskId = 0;
  isCreatingTask = false;
}

renderTodoApp();

addTaskButton.addEventListener("click", addTask);
submitButton.addEventListener("click", submit);

function addTask() {
  isCreatingTask = true;
  dialogContainer.classList.add("flex");
}

function submit() {
  if (isCreatingTask) {
    todos.push({
      text: inputElement.value,
      status: selectElement.value,
      id: randomIntFromInterval(),
    });
  } else {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === taskId) {
        todos[i].text = inputElement.value;
        todos[i].status = selectElement.value;
      }
    }
  }

  renderTodoApp();
  dialogContainer.classList.remove("flex");
}

function removeTask(id) {
  let filteredTodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      filteredTodo.push(todos[i]);
    }
  }
  todos = filteredTodo;
  renderTodoApp();
}

function editTask(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      inputElement.value = todos[i].text;
      selectElement.value = todos[i].status;
    }
  }
  taskId = id;
  dialogContainer.classList.add("flex");
}

function randomIntFromInterval() {
  return Math.floor(Math.random() * 1000);
}

dialogContainer.addEventListener("click", dialoghide);
dialog.addEventListener("click", function (event) {
  event.stopPropagation();
});
function dialoghide() {
  dialogContainer.classList.remove("flex");
}
