/**
 * modal.js
 * Manage the add/edit modal interactions
 */

const modalRoot = document.getElementById('modal');
const form = document.getElementById('modal-form');
const titleInput = document.getElementById('field-title');
const descInput = document.getElementById('field-desc');
const statusSelect = document.getElementById('field-status');
const modalTitle = document.getElementById('modal-title');

let submitHandlerRef = null;

/**
 * Initialize simple close handlers for backdrop / buttons
 * @param {(saved:boolean)=>void} onClose
 */
export function initModal(onClose = () => {}) {
  document.getElementById('modal-clo