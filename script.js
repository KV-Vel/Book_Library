//TODO : MAKE search work
// const documentBackground = document.querySelector('html');
// const body = document.querySelector('body');
const dialogWindow = document.querySelector('dialog');
const addBookBtn = document.querySelector('.add-book-btn');

addBookBtn.addEventListener('click', event => {
    dialogWindow.showModal();
});

dialogWindow.addEventListener('click', event => {
    if (event.target.tagName === 'DIALOG') {
        event.preventDefault();
        dialogWindow.close();
    }
})

// addBookBtn.onclick = function(event) {
//     documentBackground.classList.toggle('darken');
//     event.stopPropagation();
// }

// body.onclick = function() {
//     if(documentBackground.classList.contains('darken')) {
//         documentBackground.classList.remove('darken');
//     }
// }


// stars[0].classList.remove('fa fa-star-o fa-2x');
// stars[0].classList.add('fa fa-star fa-2x');

/**Add stars for rating? */
const library = [];

function Book () {

}

function addBookToLibrary () {

}