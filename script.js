//TODO : MAKE search work
const documentBackground = document.querySelector('html');
const body = document.querySelector('body');
const addBookBtn = document.querySelector('.add-book-btn');

addBookBtn.onclick = function(event) {
    documentBackground.classList.toggle('darken');
    event.stopPropagation();
}

body.onclick = function() {
    if(documentBackground.classList.contains('darken')) {
        documentBackground.classList.remove('darken');
    }
}

/**Add stars for rating? */
const library = [];

function Book () {

}

function addBookToLibrary () {

}