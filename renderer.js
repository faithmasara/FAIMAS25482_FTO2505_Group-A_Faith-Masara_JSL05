/**
 * renderer.js
 * Responsible for generating DOM elements for tasks and updating counts
 */

/**
 * Create a task card element and attach click handler
 * @param {Object} task
 * @param {(id:number)=>void} onClick
 * @returns {HTMLElement}
 */
export function createTaskElement(task, onClick) {
  const el = document.createElement('div');
  el.className = 'task';
  el.dataset.id = String(task.id);

  const t = document.createElement('div');
  t.className = 'title';
  t.textContent = task.title;

  el.appendChild(t);

  if (task.description) {
    const d = document.createElement('div');
    d.className = 'desc';
    d.textContent = task.description;
    el.appendChild(d);
  }

  el.addEventListener('click', () => onClick(task.id));
  return el;
}

/**
 * Render tasks into their columns and update counts
 * @param {Array<Object>} tasks
 * @param {(id:number)=>void} onTaskClick
 */
export function renderAllTasks(tasks, onTaskClick) {
  const lists = document.querySelectorAll('.task-list');
  lists.forEach(l => l.innerHTML = '');

  let counts = { todo:0, doing:0, done:0 };

  tasks.forEach(task => {
    const status = (task.status || 'todo').toLowerCase();
    const column = document.querySelector(`.task-list[data-column="${status}"]`);
    if (!column) return;
    const el = createTaskElement(task, onTaskClick);
    column.appendChild(el);
    if (counts[status] !== undefined) counts[status]++;
  });

  document.getElementById('count-todo').textContent = `(${counts.todo})`;
  document.getElementById('count-doing').textContent = `(${counts.doing})`;
  document.getElementById('count-done').textContent = `(${counts.done})`;
}

/**
 * Console logging helpers
 */
export function consoleLogAll(tasks){
  console.group('All Tasks');
  if (!tasks.length) console.log('No tasks');
  tasks.forEach(t => console.log(`ID:${t.id} • ${t.title} • ${t.status}`));
  console.groupEnd();
}

export function filterCompleted(tasks){
  return tasks.filter(t => String(t.status).toLowerCase() === 'done');
}