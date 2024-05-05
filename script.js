//TODO: MAKE search work
// TODO: для добавленной книги нужно сделать ползунок или еще один чебокс, чтобы отметить, что книга прочитана.
// TODO: сделать анимацию перехода из заполнения формы в добавление ее в начало библиотеки?
// style scroll bar https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll
// Проверить переменные в css Все ли исползуются?
// Сделать что если больше 5-6 книг в библиотеке то .wrapper-library-center должен иметь свойство justify-content: center
// Что если название слишком длинное
const library = []; // if library.length !== 0 => убрать Your library is empty
const dialogWindow = document.querySelector('dialog');
const addBookBtn = document.querySelector('.add-book-btn');
const libraryWrapper = document.querySelector('.wrapper-library-center');
const form = document.querySelector('form');

function Book (title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary () {
    const titleInput = document.querySelector('.titleInput').value;
    const authorInput = document.querySelector('.authorInput').value;
    const pagesInput = document.querySelector('.pagesInput').value;
    const statusInput = document.querySelector('.statusInput').checked;
    library.push(new Book(titleInput, authorInput, pagesInput, statusInput));

    form.reset();
}

function displayNewBook () {
    let lastAddedBookInLibrary = library[library.length - 1];

    const divBook = document.createElement('div');
    divBook.classList.add('book');
    divBook.setAttribute('data-number', String(library.length - 1));
    libraryWrapper.append(divBook);
    
    const frontCoverBook = document.createElement('div');
    frontCoverBook.classList.add('front-cover');
    divBook.append(frontCoverBook);

    const headerBook = document.createElement('div');
    headerBook.classList.add('header-book');
    const bookPages = document.createElement('h6');
    bookPages.classList.add('additional-book-info');
    bookPages.textContent = lastAddedBookInLibrary.pages + ' .pag';

    const bookStatus = document.createElement('h6');
    bookStatus.classList.add("additional-book-info-status");
    lastAddedBookInLibrary.status === false ? bookStatus.textContent = 'Not read' : bookStatus.textContent = 'Read';
    frontCoverBook.append(headerBook, bookPages, bookStatus);

    const headerBookTitle = document.createElement('h4');
    headerBookTitle.textContent = lastAddedBookInLibrary.title;
    const headerBookAuthor = document.createElement('h5');
    headerBookAuthor.textContent = lastAddedBookInLibrary.author;
    headerBook.append(headerBookTitle, headerBookAuthor);

    const deleteBtnWrapper = document.createElement('div');
    deleteBtnWrapper.classList.add('delete-btn-wrapper');
    frontCoverBook.append(deleteBtnWrapper);
    const deleteBtn = document.createElement('button');
    deleteBtnWrapper.append(deleteBtn);
    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', "./sources/icons8-delete-30.png");
    deleteIcon.width = 15;
    deleteIcon.height = 14;
    deleteBtn.append(deleteIcon);

    deleteBtn.addEventListener('click', () => {
       const dataNumber = divBook.getAttribute('data-number');
       library.splice(dataNumber, 1);
       divBook.remove();
    });
}

addBookBtn.addEventListener('click', () => {
    dialogWindow.showModal();
});

dialogWindow.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIALOG') {
        event.preventDefault();
        dialogWindow.close();
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary()
    displayNewBook()
    dialogWindow.close();
});