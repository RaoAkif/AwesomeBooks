import Store from './modules/LocalStorage.js';
import Book from './modules/Book.js';

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
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    // Do Nothing
  } else {
    const book = new Book(title, author);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list-table').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  Store.removeBook(
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent,
  );
});
