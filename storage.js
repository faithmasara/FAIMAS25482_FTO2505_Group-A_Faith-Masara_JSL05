/**
 * storage.js
 * Small module to handle localStorage persistence
 */
const STORAGE_KEY = 'kanban_v2_tasks';

/**
 * Load tasks from localStorage.
 * @returns {Array<Object>} tasks array
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading tasks from storage', e);
    return [];
  }
}

/**
 * Save tasks array to localStorage
 * @param {Array<Object>} tasks
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks to storage', e);
  }
}

/**
 * Get next incremental ID.
 * @param {Array<Object>} tasks
 * @returns {number}
 */
export function getNextId(tasks) {
  if (!tasks || tasks.length === 0) return 1;
  const max = tasks.reduce((m, t) => Math.max(m, Number(t.id || 0)), 0);
  return max + 1;
}
