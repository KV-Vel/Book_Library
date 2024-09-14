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

inputs.forEach((input) => input.addEventListener('input', () => {
  input.reportValidity();
  if(input.validity.tooShort) {
    input.setCustomValidity("Value is too short");
  } else {
    console.log('ok');
    input.setCustomValidity("");
  }
}));

//Display empty library message
function isLibraryEmpty() {
  if (!library.length) {
    emptyMessage = document.createElement("div");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "Your Library is empty";

    libraryWrapper.classList.contains("wrapper-library-center-filled") ?
      libraryWrapper.classList.replace("wrapper-library-center-filled", "wrapper-library-center-empty") :
      libraryWrapper.classList.add("wrapper-library-center-empty");

    libraryWrapper.append(emptyMessage);
  } else {
    libraryWrapper.classList.replace("wrapper-library-center-empty", "wrapper-library-center-filled");
    emptyMessage.remove();
  }
}
isLibraryEmpty(); // ON DOM LOAD?

class Book {
  constructor (title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary() {
  const titleInput = document.querySelector(".titleInput").value;
  const authorInput = document.querySelector(".authorInput").value;
  const pagesInput = document.querySelector(".pagesInput").value;
  const statusInput = document.querySelector(".statusInput").checked;
  
  library.push(new Book(titleInput, authorInput, pagesInput, statusInput));

  form.reset();
}

function checkValidity(input) {
  console.log(input.validity.tooShort)
  if(input.validity.tooShort) {
    input.setCustomValidity("Value is too short");
    return;
  } else {
    input.setCustomValidity("");
  }
}

function displayNewBook() {
  let lastAddedBookInLibrary = library.at(-1);
  // DIV - Book wrapper
  const divBook = document.createElement("div");
  divBook.classList.add("book");
  divBook.setAttribute("data-number", String(library.length - 1));
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
  bookPages.textContent = `${lastAddedBookInLibrary.pages} pag.`;
  // BOOK STATUS
  const bookStatus = document.createElement("button");
  bookStatus.classList.add("additional-book-info-status");
  if (!lastAddedBookInLibrary.status) {
    bookStatus.textContent = "Unread";
    bookStatus.classList.add("unread");
  } else {
    bookStatus.textContent = "Read";
    bookStatus.classList.add("read");
  }

  frontCoverBook.append(headerBook, bookPages, bookStatus);
  // Changing book status
  bookStatus.addEventListener("click", () => {
    if (bookStatus.classList.contains("unread") || bookStatus.classList.contains("read")) {

      bookStatus.classList.contains("unread") ?
        bookStatus.classList.replace("unread", "read") :
        bookStatus.classList.replace("read", "unread");
  
      bookStatus.classList.add("shrink-btn");
      setTimeout(() => {
        bookStatus.classList.remove("shrink-btn");
  
        bookStatus.classList.contains("unread") ?
          bookStatus.textContent = "Unread" :
          bookStatus.textContent = "Read";
  
      }, 400);
      if (bookStatus.classList.contains("shrink-btn")) {
        bookStatus.textContent = "";
      }
    }
  });

  //BOOK TITLE
  const headerBookTitle = document.createElement("h4");
  headerBookTitle.textContent = lastAddedBookInLibrary.title;
  // BOOK AUTHOR
  const headerBookAuthor = document.createElement("h5");
  headerBookAuthor.textContent = lastAddedBookInLibrary.author;
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
  deleteBtn.addEventListener("click", () => {
    const dataNumber = divBook.getAttribute("data-number");
    // Reduce data-number if book was deleted
    allBooks = document.querySelectorAll('.book');
  
    allBooks.forEach((book) => {
      if (dataNumber < book.dataset.number) {
        book.dataset.number = book.dataset.number - 1;
      } 
    });
  
    library.splice(dataNumber, 1);
    divBook.remove();
    isLibraryEmpty();
  });
  
}
  //add book show dialog window
  addBookBtn.addEventListener("click", showDialogWindow);

  //close onclick outside of dialog
  dialogWindow.addEventListener("click", closeDialog);

/**EVENT LISTENERS */
  
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  isLibraryEmpty();
  displayNewBook();
  dialogWindow.close();
});

formInputs.forEach((input) => {
  input.addEventListener('focus', () => {
    // Styling labels on input focus
    input.previousElementSibling.style.cssText = 'background-size: 0 1px, 100% 1px';
  });
});

formInputs.forEach((input) => {
  input.addEventListener('blur', () => {
    input.previousElementSibling.style.cssText = 'background-size: 100% 1px, 0 1px';
  });
});

searchInput.addEventListener('search', findBook);
searchBtn.addEventListener('click', findBook);

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

// Search for book using input
function findBook() {
  allBooks = document.querySelectorAll('.book');
  const userInput = searchInput.value;
  // Taking index of Books that match search
  const resultOfUserSearch = library.map((book, index) => {if (book.title.includes(userInput) || book.author.includes(userInput)) {return index}})
                                    .filter(bookIndex => bookIndex !== undefined);

  if (resultOfUserSearch.length === 0) {
    alert('No such book');
  }
  // Hidding books that don't meet search
  for (let bookIndex of resultOfUserSearch) {
    allBooks.forEach((book) => {
      if (book.getAttribute('data-number') != bookIndex && !resultOfUserSearch.includes(Number(book.getAttribute('data-number')))) {
        book.style.cssText += 'display: none;';
      } else {
        book.style.cssText += 'display: flex;';
      }
    })
  }
  // After deleting input, book that was hidding will appear back
  if (!userInput || userInput === ' ') {
    allBooks.forEach((book) => book.style.cssText += 'display: flex;');
  }
}