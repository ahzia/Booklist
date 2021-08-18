export default class Books {
  constructor() {
    this.books = null;
  }

   displayBooks = () => {
     const bookCollection = document.getElementById('book-list');
     const list = document.createElement('ul');
     let grey = true;
     this.books.forEach((book) => {
       const { title } = book;
       const { author } = book;
       const { id } = book;
       const liId = `li${title}`;
       let bookCard;
       if (grey) {
         list.style.border = '2px solid black';
         bookCard = `<li class="grey" id=${liId}>
          <div class="text">
          <p class = "paragraph-1">"${title}" by</p>
          <p class = "paragraph-2">: ${author}</p>
          </div>
          <button id="btn${id}" class="remove button">Remove</button>
          </li>`;
         grey = false;
       } else {
         bookCard = `<li id=${liId}>
        <div class="text">
        <p class = "paragraph-1">"${title}" by</p>
        <p class = "paragraph-2">: ${author}</p>
        </div>
        <button id="btn${id}" class="remove button">Remove</button>
        </li>`;
         grey = true;
       }

       list.insertAdjacentHTML('beforeend', bookCard);
     });
     bookCollection.innerHTML = '';
     bookCollection.appendChild(list);
     this.clearInputs();
   };

    eventListeners = () => {
      const removeBtn = document.querySelectorAll('.remove');
      removeBtn.forEach((btn) => {
        btn.onclick = (event) => {
          const { target } = event;
          const { id } = target;
          const bookId = (id).replace('btn', '');
          this.removebook(bookId);
        };
      });
    };

    updateLocalStorage = (remove) => {
      if (!remove) {
        if (this.books === null) {
          this.books = JSON.parse(window.localStorage.getItem('books'));
        }
      }
      window.localStorage.setItem('books', JSON.stringify(this.books));
      if (this.books === null) {
        this.books = [];
      }
      this.displayBooks();
      // eslint-disable-next-line no-use-before-define
      this.eventListeners();
    };

   removebook = (id) => { // eslint-disable-line no-unused-vars
     const temp = [];
     let update = false;
     this.books.forEach((book) => {
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
     this.books = temp;
     this.updateLocalStorage(true);
   };

     addBook = () => {
       const title = document.getElementById('title').value;
       const author = document.getElementById('author').value;
       const error = document.getElementById('error');
       let status = false;
       if (title === '') {
         error.innerHTML = 'title is Required';
       } else {
         this.books.forEach((book) => {
           if (book.title === title && book.author === author) {
             error.innerHTML = 'Alert: Book already exists in your list';
             status = true;
           }
         });
         if (!status) {
           const id = this.books.length;
           const book = { id, title, author };
           this.books.push(book);
           this.updateLocalStorage(false);
         }
       }
     };

     clearInputs = () => {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('error').innerHTML = '';
     }
}
