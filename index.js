import domSelectors from './modules/domSelectors.js';
import Store from './modules/LocalStorage.js';
import Book from './modules/Book.js';
import UI from './modules/UI.js';

setInterval(() => {
  document.getElementById('date').textContent = new Date();
}, 1000);

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
    // Do Nothing
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
