import domSelectors from './modules/domSelectors.js';
import Store from './modules/LocalStorage.js';
import Book from './modules/Book.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const date = document.querySelector('#date');

date.textContent = DateTime.now();

// Show bookList
domSelectors.bookListView.classList.toggle('show');

// NavBar Eventlisteners
domSelectors.GoToBookList.addEventListener('click', () => {
  domSelectors.bookListView.classList.add('show');
  domSelectors.addBookView.classList.remove('show');
  domSelectors.contactView.classList.remove('show');
});

domSelectors.GoToAddBook.addEventListener('click', () => {
  domSelectors.addBookView.classList.add('show');
  domSelectors.bookListView.classList.remove('show');
  domSelectors.contactView.classList.remove('show');
});

domSelectors.GoToContact.addEventListener('click', () => {
  domSelectors.contactView.classList.add('show');
  domSelectors.addBookView.classList.remove('show');
  domSelectors.bookListView.classList.remove('show');
});

// ------  UI CLASS ----- //

class UI {
  // Display the list of Books
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  // Add book to the List
  static addBookToList(book) {
    const list = document.querySelector('#book-list-table');
    const row = document.createElement('tr');
    row.innerHTML = `
          <td id='title-decor'>${book.title}</td>
          by
          <td>${book.author}</td>
          <td>
            <button><a href='#' id='delete-btn' class='delete'>Delete</a></button>
          </td>
        `;
    list.appendChild(row);
  }

  // Delete a book from the storage
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // Validate
  if (title === '' || author === '') {
    return
  } else {
    // Instatiate book
    const book = new Book(title, author);
    // Add Book to UI
    UI.addBookToList(book);
    // Add book to store
    Store.addBook(book);
    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list-table').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent,
  );
});
