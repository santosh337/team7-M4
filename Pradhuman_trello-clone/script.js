let cardInput;
let todoLane;
let input;
let form;

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  form = document.getElementById("todo-form");
  input = document.getElementById("todo-input");
  todoLane = document.getElementById("todo-lane");
  cardInput = document.getElementById("workInput");
  loadTasks();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    const newTask = createCard(value);
    todoLane.appendChild(newTask);
    input.value = "";
    saveTasks();
  });

  document.querySelectorAll('[type="date"]').forEach(function (dateInput) {
    dateInput.addEventListener("change", function () {
      saveTasks();
    });
  });
  document.querySelectorAll('[name="workInput"]').forEach(function (dateInput) {
    dateInput.addEventListener("change", function () {
      saveTasks();
    });
  });
});

let taskId = Date.now();

function createCard(content) {
  const input = document.getElementById("todo-input").value;
  const card = document.createElement("div");
  const taskId = Date.now();

  card.classList.add("card");
  card.setAttribute("data-task-id", taskId);
  card.innerHTML = `
    <div class="card-content">
      <div class="header">
        <span>${input}</span>
      <button class="delete-card-btn">Delete</button>
      </div>
      <div class="work-div">
        <label for="workInput">Work:</label>
        <textarea name="workInput" id="workInput" cols="30" rows="3"></textarea>
      </div>
      <div class="date-div">
        <label for="dateInput">Date:</label>
        <input type="date" id="dateInput" />
      </div>
      <div class="custom-select" tabindex="0">
        <span class="selected">Select priority</span>
        <div class="custom-options" style="display: none;">
          <div class="custom-option" data-value="low" style="color: green;">Low</div>
          <div class="custom-option" data-value="mid" style="color: blue;">Mid</div>
          <div class="custom-option" data-value="high" style="color: red;">High</div>
        </div>
      </div>
    </div>
  `;
  todoLane.appendChild(card);
  initializeCustomSelect(card);

  card.setAttribute("draggable", "true");

  card.addEventListener("dragstart", () => {
    card.classList.add("is-dragging");
    saveTasks();
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
    saveTasks();
  });
  saveTasks();
  attachDeleteEventToCard(card);
  return card;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".card").forEach((card) => {
    const taskObj = {
      id: card.getAttribute("data-task-id"),
      content: card.querySelector("span").textContent,
      work: card.querySelector('[name="workInput"]').value,
      date: card.querySelector('[type="date"]').value,
      priority: card.querySelector(".selected").textContent,
    };
    tasks.push(taskObj);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      const newTask = createCard(task.content);
      // Set the values from task object
      newTask.querySelector("span").textContent = task.content;
      newTask.querySelector('[name="workInput"]').value = task.work;
      newTask.querySelector('[type="date"]').value = task.date;
      newTask.querySelector(".selected").textContent = task.priority;
      todoLane.appendChild(newTask); // Append the recreated task to the lane
    });
  }
}

function initializeCustomSelect(cardElement) {
  const customSelect = cardElement.querySelector(".custom-select");
  customSelect.addEventListener("click", function () {
    this.querySelector(".custom-options").style.display = "block";
  });

  const options = cardElement.querySelectorAll(".custom-option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const selected =
        this.closest(".custom-select").querySelector(".selected");
      selected.textContent = this.textContent;
      selected.style.color = this.style.color;
      this.closest(".custom-options").style.display = "none";
    });
  });
}

function attachDeleteEventToCard(card) {
  const deleteBtn = card.querySelector(".delete-card-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      card.remove();
      saveTasks();
    });
  }
}

document.addEventListener("click", function (event) {
  if (!event.target.matches(".custom-select, .custom-select *")) {
    document.querySelectorAll(".custom-options").forEach(function (optionDiv) {
      optionDiv.style.display = "none";
      saveTasks();
    });
  }
});
