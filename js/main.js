import Books from './books.js';

const NewBooks = new Books();

document.addEventListener('DOMContentLoaded', () => {
  NewBooks.updateLocalStorage(false);
  NewBooks.eventListeners();
  const addbutton = document.getElementById('btnAdd');
  addbutton.addEventListener('click', (event) => {
    event.preventDefault();
    NewBooks.addBook();
  });
});

const clear = () => {
  const menuElements = document.querySelectorAll('[data-tab]');
  let i;
  for (i = 0; i < menuElements.length; i += 1) {
    menuElements[i].classList.remove('active-tab');
    const id = menuElements[i].getAttribute('data-tab');
    document.getElementById(id).classList.remove('active-tab');
  }
};

const change = (e) => {
  clear();
  e.target.classList.add('active-tab');
  const id = e.currentTarget.getAttribute('data-tab');
  document.getElementById(id).classList.add('active-tab');
};

const bindAll = () => {
  const menuElements = document.querySelectorAll('[data-tab]');
  let i;
  for (i = 0; i < menuElements.length; i += 1) {
    menuElements[i].addEventListener('click', change, false);
  }
};

bindAll();