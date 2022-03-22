import Store from './LocalStorage.js';

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

  // Clear the Form fields, on book submission
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

export default UI;
