// Array to store the books
const myLibrary = [];

// Constructor function for creating Book objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
}

// Function to toggle the read status of a book
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
}

// Function to display all books in the library
function displayBooks() {
  // Get the container where books will be displayed
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = ''; // Clear previous content

  // Loop through each book in the library
  myLibrary.forEach((book, index) => {
    // Create a Bootstrap card element
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Create elements for book title, author, pages, and read status
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.classList.add('card-text');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.classList.add('card-text');
    pages.textContent = `Pages: ${book.pages}`;

    const readStatus = document.createElement('p');
    readStatus.classList.add('card-text');
    readStatus.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

    // Create buttons to remove the book and toggle read status
    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'mr-2');
    removeButton.textContent = 'Remove';
    removeButton.dataset.index = index;

    const toggleReadButton = document.createElement('button');
    toggleReadButton.classList.add('btn', 'btn-info');
    toggleReadButton.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
    toggleReadButton.dataset.index = index;

    // Append elements to card body
    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(readStatus);
    cardBody.appendChild(removeButton);
    cardBody.appendChild(toggleReadButton);

    // Append card body to card
    card.appendChild(cardBody);

    // Append card to library container
    libraryContainer.appendChild(card);

    // Add event listeners to remove and toggle read status buttons
    removeButton.addEventListener('click', () => {
      removeBook(index);
      displayBooks();
    });

    toggleReadButton.addEventListener('click', () => {
      toggleReadStatus(index);
      displayBooks();
    });
  });
}

// Event listener for showing the new book form
document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('new-book-form').style.display = 'block';
});

// Event listener for submitting the new book form
document.getElementById('book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  displayBooks();
  document.getElementById('new-book-form').style.display = 'none';
  document.getElementById('book-form').reset();
});

// Manually add some books for demonstration
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

// Display initial books
displayBooks();
