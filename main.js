/**
 * Module: main.js
 * Responsibility: app initialization and wiring modules together
 */
import { loadTasks, saveTasks, getNextId } from "./storage.js";
import { renderAllTasks, consoleLogAllTasks, filterCompleted } from "./renderer.js";
import { initModal, openModal } from "./modal.js";

let tasks = []; // in-memory tasks
let currentlyEditingId = null;

/**
 * Initialize app: load tasks, render them and set up UI handlers.
 */
function initApp() {
  tasks = loadTasks();
  renderAllTasks(tasks, handleTaskClick);
  consoleLogAllTasks(tasks);
  logCompletedOrMotivation();

  // wire Add Task button
  document.getElementById("add-task-btn").addEventListener("click", () => {
    currentlyEditingId = null;
    openModal({mode: "add"}, (data) => {
      addNewTask(data);
    });
  });

  // init modal close handlers (optional)
  initModal((saved) => {
    if (saved) {
      // already saved in submit handler
    }
  });
}

/**
 * Handler when a task element is clicked.
 * Opens edit modal and updates on save.
 * @param {number} taskId
 */
function handleTaskClick(taskId) {
  currentlyEditingId = taskId;
  const task = tasks.find(t => Number(t.id) === Number(taskId));
  if (!task) return;
  openModal({mode:"edit", task}, (data) => {
    // update the task and persist
    task.title = data.title;
    task.description = data.description;
    task.status = data.status;
    persistAndRender();
  });
}

/**
 * Add a new task to tasks array and persist.
 * @param {Object} data {title, description, status}
 */
function addNewTask(data) {
  const id = getNextId(tasks);
  const newTask = {
    id,
    title: data.title || `Task ${id}`,
    description: data.description || "",
    status: data.status || "todo"
  };
  tasks.push(newTask);
  persistAndRender();
}

/**
 * Save tasks to storage, render, and log completed tasks / all tasks.
 */
function persistAndRender() {
  saveTasks(tasks);
  renderAllTasks(tasks, handleTaskClick);
  consoleLogAllTasks(tasks);
  logCompletedOrMotivation();
}

/**
 * Show completed tasks in console or motivational message if none.
 */
function logCompletedOrMotivation() {
  const completed = filterCompleted(tasks);
  if (completed.length > 0) {
    console.group("Completed Tasks");
    completed.forEach(t => console.log(`ID:${t.id} • ${t.title}`));
    console.groupEnd();
  } else {
    console.log("No tasks completed, let's get to work!");
  }
}

// Start app
initApp();
