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
