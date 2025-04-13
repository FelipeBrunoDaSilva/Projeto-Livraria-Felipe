let books = [];
let editingBookId = null;

const bookForm = document.getElementById("book-form");
const bookTableBody = document.querySelector("#book-table tbody");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const year = document.getElementById("year").value.trim();

  if (editingBookId !== null) {
    // Atualização
    const book = books.find((b) => b.id === editingBookId);
    if (book) {
      book.title = title;
      book.author = author;
      book.year = year;
    }
    editingBookId = null;
  } else {
    // Criação
    const newBook = {
      id: Date.now(),
      title,
      author,
      year,
    };
    books.push(newBook);
  }

  bookForm.reset();
  renderBooks();
});

function renderBooks() {
  // Limpar tabela
  bookTableBody.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.year}</td>
<td>
<button class="action edit" onclick="editBook(${book.id})">Editar</button>
<button class="action delete" onclick="deleteBook(${book.id})">Excluir</button>
</td>
    `;

    bookTableBody.appendChild(row);
  });
}

function editBook(id) {
  const book = books.find((b) => b.id === id);
  if (book) {
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("year").value = book.year;
    editingBookId = id;
  }
}

function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  renderBooks();
}
