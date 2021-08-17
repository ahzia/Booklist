let books = null;

const displayBooks = () => {
  const bookCollection = document.getElementById('book-list');
  const list = document.createElement('ul');
  books.forEach((book) => {
    const { title } = book;
    const { author } = book;
    const { id } = book;
    const liId = `li${title}`;
    const bookCard = `<li id=${liId}>
        <div class="text">
        <p>"${title}" by</p>
        <p>: ${author}</p>
        </div>
        <button id="btn${id}" class="remove button">Remove</button>
        </li>
        <hr>`;
    list.insertAdjacentHTML('beforeend', bookCard);
  });
  bookCollection.innerHTML = '';
  bookCollection.appendChild(list);
};

const updateLocalStorage = (remove) => {
  if (!remove) {
    if (books === null) {
      books = JSON.parse(window.localStorage.getItem('books'));
    }
  }
  window.localStorage.setItem('books', JSON.stringify(books));
  if (books === null) {
    books = [];
  }
  displayBooks();
  // eslint-disable-next-line no-use-before-define
  eventListeners();
};

const removebook = (id) => { // eslint-disable-line no-unused-vars
  const temp = [];
  let update = false;
  books.forEach((book) => {
    if (book.id != id) { // eslint-disable-line eqeqeq
      if (!update) {
        temp.push({
          id: (book.id - 1),
          title: book.title,
          author: book.author,
        });
      } else {
        temp.push(book);
      }
    } else {
      update = true;
    }
  });
  books = temp;
  updateLocalStorage(true);
};

const eventListeners = () => {
  const removeBtn = document.querySelectorAll('.remove');
  removeBtn.forEach((btn) => {
    btn.onclick = (event) => {
      const { target } = event;
      const { id } = target;
      const bookId = (id).replace('btn', '');
      removebook(bookId);
    };
  });
};

const addBook = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const error = document.getElementById('error');
  let status = false;
  if (title === '') {
    error.innerHTML = 'title is Required';
  } else {
    books.forEach((book) => {
      if (book.title === title && book.author === author) {
        error.innerHTML = 'Alert: Book already exists in your list';
        status = true;
      }
    });
    if (!status) {
      const id = books.length;
      const book = { id, title, author };
      books.push(book);
      updateLocalStorage(false);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateLocalStorage(false);
  eventListeners();
  const addbutton = document.getElementById('btnAdd');
  addbutton.addEventListener('click', (event) => {
    event.preventDefault();
    addBook();
  });
});
