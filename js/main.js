let books = [];

function addBook() {
  const bookName = document.getElementById("book-name").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookGenre = document.getElementById("book-genre").value;

  if (bookName === "" || bookAuthor === "" || bookGenre === "") {
    document.getElementById("error-message").textContent = "Please fill all the fields below";
    return;
  }

  document.getElementById("error-message").textContent = "";

  books.push({ name: bookName, author: bookAuthor, genre: bookGenre });
  saveBooks();
  renderBooks();
}

function deleteBook(index) {
  document.getElementById("confirm-message").style.display = "block";
  window.deleteIndex = index;
}

function confirmDelete() {
  document.getElementById("confirm-message").style.display = "none";
  books.splice(window.deleteIndex, 1);
  saveBooks();
  renderBooks();
}

function cancelDelete() {
  document.getElementById("confirm-message").style.display = "none";
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
  const savedBooks = localStorage.getItem("books");
  if (savedBooks) {
    books = JSON.parse(savedBooks);
  }
}

function renderBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  const ol = document.createElement("ol");

  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${book.name} by ${book.author} (${book.genre})`;
    li.onclick = () => deleteBook(index);

    ol.appendChild(li);
  });

  bookList.appendChild(ol);
}

loadBooks();

renderBooks();
