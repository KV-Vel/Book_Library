//TODO: MAKE search work
// TODO: для добавленной книги нужно сделать ползунок или еще один чебокс, чтобы отметить, что книга прочитана.
// TODO: По нажатию на add book сбрасывать значения предыдущие?
// TODO: сделать анимацию перехода из заполнения формы в добавление ее в начало библиотеки?
// https://web.dev/articles/building/a-dialog-component?hl=ru
// Make random background color for book
// style scroll bar
// Сделать закладку с иконкой мусорки, чтобы можно было удалять
// Проверить переменные в css Все ли исползуются?
const library = []; // if library.length !== 0 => убрать Your library is empty
const dialogWindow = document.querySelector('dialog');
const addBookBtn = document.querySelector('.add-book-btn');
const createBookBtn = document.querySelector('.create-book-btn');
const form = document.querySelector('form');

addBookBtn.addEventListener('click', event => {
    dialogWindow.showModal();
});

dialogWindow.addEventListener('click', event => {
    if (event.target.tagName === 'DIALOG') {
        event.preventDefault();
        dialogWindow.close();
    }
})

// createBookBtn.addEventListener('click', event => {
//     console.log(form.elements.value);
// })

function Book () {

}

function addBookToLibrary () {

}