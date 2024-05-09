//TODO: MAKE search work
// Animate Read Unread button. When clicked to shrink it and then width 100% again. Иконка сначала не должна появляться а когда кнопка сжалась то должен сначала поменяться цвет
// Поменить шрифт на обложке на более выделяющийся и может быть upperCASE сделать 
// Когда пользователь делает фокус на инпуте в dialog нужно чтобы label подчеркнулся... как сделать legend при focus?
// Поменять цвет обложки на черно-коричневый #925a47
// Анимация разворачивание и сворачивания диалога, именно сворачивания
// Добавить иконку сайта в html 
// Сделать описание другие шрифтов в dialog что нужно сделать
// Поменять в css переменную front cover
// В диалог при hoover на button что то придумать, хотя бы border
// Сделать focus у inputa search book
// После завершения посмотреть https://alexandrugatea.com/odin/odin-library/ как он тут сделал анимацию открытия окна диалогового
// Попробовать поставить все таки острые углы у книги, поиграться с этим.
// Проверить все это у FireFox b Edge
const library = [];
const dialogWindow = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book-btn");
const libraryWrapper = document.querySelector(".wrapper-library-center");
const libraryWrapperFilled = document.querySelector(".wrapper-library-center-filled");
const form = document.querySelector("form");
let emptyMessage;

function isLibraryEmpty() {
  if (library.length === 0) {
    emptyMessage = document.createElement("div");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "Your Library is empty";

    libraryWrapper.classList.contains("wrapper-library-center-filled") ?
      libraryWrapper.classList.replace(
        "wrapper-library-center-filled",
        "wrapper-library-center-empty"
      ) :
      libraryWrapper.classList.add("wrapper-library-center-empty");

    libraryWrapper.append(emptyMessage);
  } else {
    libraryWrapper.classList.replace(
      "wrapper-library-center-empty",
      "wrapper-library-center-filled"
    );
    emptyMessage.remove();
  }
}
isLibraryEmpty();

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  const titleInput = document.querySelector(".titleInput").value;
  const authorInput = document.querySelector(".authorInput").value;
  const pagesInput = document.querySelector(".pagesInput").value;
  const statusInput = document.querySelector(".statusInput").checked;
  library.push(new Book(titleInput, authorInput, pagesInput, statusInput));

  form.reset();
}

function displayNewBook() {
  let lastAddedBookInLibrary = library[library.length - 1];

  const divBook = document.createElement("div");
  divBook.classList.add("book");
  divBook.setAttribute("data-number", String(library.length - 1));
  libraryWrapper.append(divBook);

  const frontCoverBook = document.createElement("div");
  frontCoverBook.classList.add("front-cover");
  divBook.append(frontCoverBook);

  const headerBook = document.createElement("div");
  headerBook.classList.add("header-book");
  const bookPages = document.createElement("h6");
  bookPages.classList.add("additional-book-info");
  bookPages.textContent = lastAddedBookInLibrary.pages + " pag.";

  const bookStatus = document.createElement("button");
  bookStatus.classList.add("additional-book-info-status");
  if (lastAddedBookInLibrary.status === false) {
    bookStatus.textContent = "Unread";
    bookStatus.classList.add("unread");
  } else {
    bookStatus.textContent = "Read";
    bookStatus.classList.add("read");
  }
  frontCoverBook.append(headerBook, bookPages, bookStatus);

  bookStatus.addEventListener("click", () => {
    if (bookStatus.classList.contains("unread")) {
      bookStatus.classList.replace("unread", "read");
      bookStatus.classList.add("shrink-btn");
      setTimeout(()=> {
        bookStatus.classList.remove("shrink-btn");
        bookStatus.textContent = "Read";
      }, 1000);
      if (bookStatus.classList.contains("shrink-btn")) {
        bookStatus.textContent = "";
      }
      
    } else if (bookStatus.classList.contains("read")) {
      bookStatus.classList.replace("read", "unread");
      bookStatus.classList.add("shrink-btn");
      setTimeout(()=> {
        bookStatus.classList.remove("shrink-btn");
        bookStatus.textContent = "Unread";
      }, 1000)
      if (bookStatus.classList.contains("shrink-btn")) {
        bookStatus.textContent = "";
      }
    }
  });

  const headerBookTitle = document.createElement("h4");
  headerBookTitle.textContent = lastAddedBookInLibrary.title;
  const headerBookAuthor = document.createElement("h5");
  headerBookAuthor.textContent = lastAddedBookInLibrary.author;
  headerBook.append(headerBookTitle, headerBookAuthor);

  const deleteBtnWrapper = document.createElement("div");
  deleteBtnWrapper.classList.add("delete-btn-wrapper");
  frontCoverBook.append(deleteBtnWrapper);
  const deleteBtn = document.createElement("button");
  deleteBtnWrapper.append(deleteBtn);
  const deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "./sources/icons8-delete-30.png");
  deleteIcon.width = 15;
  deleteIcon.height = 14;
  deleteBtn.append(deleteIcon);

  deleteBtn.addEventListener("click", () => {
    const dataNumber = divBook.getAttribute("data-number");
    library.splice(dataNumber, 1);
    divBook.remove();
    isLibraryEmpty();
  });
}

addBookBtn.addEventListener("click", () => {
  dialogWindow.showModal();
});

dialogWindow.addEventListener("click", (event) => {
  if (event.target.tagName === "DIALOG") {
    event.preventDefault();
    dialogWindow.close();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  isLibraryEmpty();
  displayNewBook();
  dialogWindow.close();
});