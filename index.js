// Nav Selectors
const GoToBookList = document.querySelector("#book-list");
const GoToAddBook = document.querySelector("#add-book");
const GoToContact = document.querySelector("#contact");

// Section Selectors
const bookListView = document.querySelector(".sec-all-books");
const addBookView = document.querySelector(".sec-add-book");
const contactView = document.querySelector(".sec-contact-us");

// Show bookList
bookListView.classList.toggle("show");

// NavBar Eventlisteners
GoToBookList.addEventListener("click", () => {
  bookListView.classList.add("show");
  addBookView.classList.remove("show");
  contactView.classList.remove("show");
});

GoToAddBook.addEventListener("click", () => {
  addBookView.classList.add("show");
  bookListView.classList.remove("show");
  contactView.classList.remove("show");
});

GoToContact.addEventListener("click", () => {
  contactView.classList.add("show");
  addBookView.classList.remove("show");
  bookListView.classList.remove("show");
});

// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list-table");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td id='title-decor'>${book.title}</td>
        by
        <td>${book.author}</td>
        <td>
          <button><a href="#" id='delete-btn' class="delete">Delete</a></button>
        </td>
      `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  static showAlert(message) {
    const div = document.createElement("div");
    div.className = "alert";
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#book-form");
    const addBook = document.querySelector("#add-book");
    // container.insertBefore(div, addBook);

    // Vanish in 3 seconds
    // setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
    document.getElementById("book-form").reset();
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  // Validate
  if (title === "" || author === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author);
    console.log(book);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list-table").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent
  );
  // Show success message
  // UI.showAlert('Book Removed', 'success');
});
