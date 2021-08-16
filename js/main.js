let books = [{
        title: 'book1',
        author: 'author1',
        id : 0
    },
    {
        title: 'book2',
        author: 'author2',
        id : 1
    },
    {
        title: 'book3',
        author: 'author3',
        id : 2
    },
    
]

function displayBook () {
    let bookCollection = document.getElementById ('book-list');
    let list = document.createElement ('ul')
    books.forEach ((book) => { 
         let { title } = book 
         let { author } = book 
         let { id } = book
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
    } )
    bookCollection.innerHTML = '';
    bookCollection.appendChild(list);
}

displayBook();