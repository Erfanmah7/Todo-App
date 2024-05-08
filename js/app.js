const alarmMessage = document.querySelector(".alarm-message");
const textInput = document.getElementById("input-text");
const dateInput = document.getElementById("input-date");
const buttonAdd = document.querySelector(".button-add");
const buttonEdit = document.querySelector(".button-edit");
const Tbody = document.querySelector("tbody");
const deleteAll = document.getElementById("button-delete-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generatId = () => {
  return (Math.random() * Math.random() * Math.pow(10, 15)).toString();
};

const displayTbody = () => {
  Tbody.innerHTML = "";
  if (!todos.length) {
    Tbody.innerHTML = "<tr><td colspan='4'>No Task</td></tr>";
    return;
  }

  todos.forEach((item) => {
    Tbody.innerHTML += `<tr>
    <td>${item.task}</td>
    <td>${item.date || "No Date"}</td>
    <td>${item.completed ? "Pending" : "Completed"}</td>
    <td>
      <button class="actions-button" onClick="editHandeler('${
        item.id
      }')">Edit</button>
      <button class="actions-button" onClick="doHandeler('${item.id}')">${
      item.completed ? "Undo" : "Do"
    }</button>
      <button class="actions-button" onClick="deleteHandeler('${
        item.id
      }')">Delete</button>
    </td>
</tr> `;
  });
};

const showAlarm = (message, type) => {
  alarmMessage.innerHTML = "";
  const alarm = document.createElement("p");
  alarm.innerText = message;
  alarm.classList.add("alarm");
  alarm.classList.add(`alarm-${type}`);
  alarmMessage.append(alarm);
  setTimeout(() => {
    alarm.style.display = "none";
  }, 2000);
};

const editHandeler = (id) => {
  const mytodo = todos.find((todo) => todo.id === id);
  textInput.value = mytodo.task;
  dateInput.value = mytodo.date;
  buttonAdd.style.display = "none";
  buttonEdit.style.display = "inline-block";
  buttonEdit.dataset.id = id;
};

const doHandeler = (id) => {
  const todocomp = todos.find((todo) => todo.id === id);
  todocomp.completed = !todocomp.completed;
  saveLocalStorage();
  displayTbody();
  showAlarm("Task changed successfully", "success");
};

const deleteAllHandeler = () => {
  if (!todos.length) {
    showAlarm("There are no tasks to clear", "error");
  } else {
    todos = [];
    saveLocalStorage();
    displayTbody();
    showAlarm("All tasks cleared successfully", "success");
  }
};

const deleteHandeler = (id) => {
  const newTodos = todos.filter((todo) => todo.id != id);
  todos = newTodos;
  saveLocalStorage();
  displayTbody();
  showAlarm("The task was successfully deleted", "success");
};

const addHandeler = () => {
  const task = textInput.value;
  const date = dateInput.value;

  const todo = {
    id: generatId(),
    task,
    date,
    completed: false,
  };

  if (task) {
    todos.push(todo);
    saveLocalStorage();
    displayTbody();
    textInput.value = "";
    dateInput.value = "";
    showAlarm("Information has been successfully registered", "success");
  } else {
    showAlarm("No information has been entered", "error");
  }
};

const btneditHandeler = (e) => {
  const id = e.target.dataset.id;
  const keyTodo = todos.find((todo) => todo.id === id);
  console.log(id);
  keyTodo.task = textInput.value;
  keyTodo.date = dateInput.value;
  textInput.value = "";
  dateInput.value = "";
  buttonAdd.style.display = "inline-block";
  buttonEdit.style.display = "none";
  saveLocalStorage();
  displayTbody();
  showAlarm("File edited successfully", "success");
};

window.addEventListener("load", displayTbody);
deleteAll.addEventListener("click", deleteAllHandeler);
buttonAdd.addEventListener("click", addHandeler);
buttonEdit.addEventListener("click", btneditHandeler);
