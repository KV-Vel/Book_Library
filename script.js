const library = [];
let emptyMessage;
let allBooks;
const dialogWindow = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book-btn");
const libraryWrapper = document.querySelector(".wrapper-library-center");
const libraryWrapperFilled = document.querySelector(".wrapper-library-center-filled");
const form = document.querySelector("form");
const formInputs = form.querySelectorAll('input');
const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-input-icon');
const [...inputs] = document.querySelectorAll('.book-form > input[type="text"]');

function createEmptyMessage () {
      let emptyMessage = document.createElement("div");
      emptyMessage.classList.add("empty-message");
      emptyMessage.textContent = "Your Library is empty";
      return emptyMessage;
}

class Library {
  static #books;
  
  static isLibraryEmpty () {
    if (Library.#books.length === 0 || Library.#books.length === null) {
      
      const emptyEl = createEmptyMessage()
      libraryWrapper.classList.contains("wrapper-library-center-filled") ?
      libraryWrapper.classList.replace("wrapper-library-center-filled", "wrapper-library-center-empty") :
      libraryWrapper.classList.add("wrapper-library-center-empty");
      libraryWrapper.append(emptyEl);
      return true
    } else {
      libraryWrapper.classList.replace("wrapper-library-center-empty", "wrapper-library-center-filled");

      if (document.querySelector('.empty-message')) document.querySelector('.empty-message').remove();
      return false
    }
  }

  constructor () {
    localStorage.getItem('library') === null ? Library.#books = [] : Library.#books = JSON.parse(localStorage.getItem('library'));
    if(Library.#books.length !== 0) {
      libraryWrapper.className = "wrapper-library-center wrapper-library-center-filled";
      displayBooks(JSON.parse(localStorage.getItem('library')));
    } else {
      Library.isLibraryEmpty();
    }
  }

  get books () {
    return Library.#books;
  }

  addBookToLibrary() {
    const titleInput = document.querySelector(".titleInput").value;
    const authorInput = document.querySelector(".authorInput").value;
    const pagesInput = document.querySelector(".pagesInput").value;
    const statusInput = document.querySelector(".statusInput").checked;
    
    Library.#books.push(new Book(titleInput, authorInput, pagesInput, statusInput));
    Library.isLibraryEmpty();

    localStorage.setItem('library', JSON.stringify(Library.#books));
  }

  removeBook(id) {
    Library.#books = Library.#books.filter((book) => book.id !== id);
    localStorage.setItem('library', JSON.stringify(Library.#books));
    Library.isLibraryEmpty();
  }

  changeStatus(id, status) {
    const foundBook = Library.#books.find((book) => book.id === id);
    foundBook.status = status;
    localStorage.setItem('library', JSON.stringify(Library.#books));
  }
}

class Book {
  constructor (title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = Date.now().toString();
  }
}
const lib = new Library();
  
  inputs.forEach((input) => input.addEventListener('input', () => { checkValidity(input) }));
  addBookBtn.addEventListener("click", showDialogWindow);
  dialogWindow.addEventListener("click", closeDialog);
  formInputs.forEach((input) => {
    input.addEventListener('focus', () => { applyUnderline(input) });
    input.addEventListener('blur', () => { removeUnderline(input) });
  });
  

  function checkValidity(input) {
    input.reportValidity();
    if(input.validity.tooShort) {
      input.setCustomValidity("Value is too short");
    } else {
      input.setCustomValidity("");
    }
  }

  function closeDialog(event) {
    if (event.target.tagName === "DIALOG") {
      event.preventDefault();
      dialogWindow.classList.add('hide-dialog');
  
      setTimeout(() => {
        dialogWindow.classList.remove('hide-dialog');
        dialogWindow.close();
      }, 500)
    }
  }
  
  function showDialogWindow() {
    dialogWindow.showModal();
    dialogWindow.classList.add('show-dialog');
  
    setTimeout(() => {
      dialogWindow.classList.remove('show-dialog');
    }, 1300)
  }

  function applyUnderline(input) {
    input.previousElementSibling.style.cssText = 'background-size: 0 1px, 100% 1px';
  }

  function removeUnderline(input) {
    input.previousElementSibling.style.cssText = 'background-size: 100% 1px, 0 1px';
  }

  function createBookUI(book) {
  // DIV - Book wrapper
  const divBook = document.createElement("div");
  divBook.classList.add("book");
  divBook.setAttribute("data-number", book.id);
  libraryWrapper.append(divBook);
  // FRONT COVER
  const frontCoverBook = document.createElement("div");
  frontCoverBook.classList.add("front-cover");
  divBook.append(frontCoverBook);
  // HEADER 
  const headerBook = document.createElement("div");
  headerBook.classList.add("header-book");
  // BOOK PAGES 
  const bookPages = document.createElement("h6");
  bookPages.classList.add("additional-book-info");
  bookPages.textContent = `${book.pages} pag.`;
  // BOOK STATUS
  const bookStatus = document.createElement("button");
  bookStatus.classList.add("additional-book-info-status");
  if (!book.status) {
    bookStatus.textContent = "Unread";
    bookStatus.classList.add("unread");
  } else {
    bookStatus.textContent = "Read";
    bookStatus.classList.add("read");
  }

  frontCoverBook.append(headerBook, bookPages, bookStatus);
  // Changing book status
  bookStatus.addEventListener("click", (e) => { changeBookStatusUI(e) });

//BOOK TITLE
const headerBookTitle = document.createElement("h4");
headerBookTitle.textContent = book.title;
// BOOK AUTHOR
const headerBookAuthor = document.createElement("h5");
headerBookAuthor.textContent = book.author;
headerBook.append(headerBookTitle, headerBookAuthor);
// DELETE BUTTON WRAPPER
const deleteBtnWrapper = document.createElement("div");
deleteBtnWrapper.classList.add("delete-btn-wrapper");
frontCoverBook.append(deleteBtnWrapper);
// DELETE BUTTON 
const deleteBtn = document.createElement("button");
deleteBtnWrapper.append(deleteBtn);
// DELETE ICON
const deleteIcon = document.createElement("img");
deleteIcon.setAttribute("src", "./sources/icons8-delete-30.png");
deleteIcon.width = 15;
deleteIcon.height = 14;
deleteBtn.append(deleteIcon);

//Delete book button 
deleteBtn.addEventListener("click", (e) => { deleteBookUI(e) });
  }

  function displayBooks(books) {
    const allBooksUI = document.querySelectorAll('.book');
    allBooksUI.forEach((book) => book.remove());
    books.forEach((book) => createBookUI(book));
  }

  function deleteBookUI(e) {
    const book = e.target.closest('.book');
    const bookID = book.getAttribute('data-number');
    lib.removeBook(bookID);
    book.remove();
    displayBooks(lib.books);
  }

  function changeBookStatusUI(e) {
    if (e.target.classList.contains("unread") || e.target.classList.contains("read")) {

      e.target.classList.contains("unread") ?
      e.target.classList.replace("unread", "read") :
      e.target.classList.replace("read", "unread");

      e.target.classList.add("shrink-btn");
      setTimeout(() => {
        e.target.classList.remove("shrink-btn");

        e.target.classList.contains("unread") ?
          e.target.textContent = "Unread" :
          e.target.textContent = "Read";

      }, 400);
      if (e.target.classList.contains("shrink-btn")) {
        e.target.textContent = "";
      }
    }
    e.target.classList.contains('unread') ? lib.changeStatus(e.target.closest('.book').getAttribute('data-number'), 'unread') : lib.changeStatus(e.target.closest('.book').getAttribute('data-number'), 'read');
  }

  function findClass(e, className) {
    const elArr = Array.from(e.target.classList);
    return elArr.find(className);
  }

/**EVENT LISTENERS */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  lib.addBookToLibrary();
  displayBooks(lib.books);
  
  dialogWindow.close();
  form.reset();
});

// ПОЗЖЕ РАЗОБРАТЬСЯ
searchInput.addEventListener('search', findBook);
searchBtn.addEventListener('click', findBook);

// Search for book using input
function findBook() {
  const userInput = searchInput.value;
  const allBooks = lib.books;

  const resultOfUserSearch = allBooks.filter((book) => {
    if (book.title.includes(userInput) || book.author.includes(userInput)) return book
  });

  if (resultOfUserSearch.length === 0) {
    alert('No such book');
  } else {
    displayBooks(resultOfUserSearch);
  }
}