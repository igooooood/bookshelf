var books = [];
var bookshelf = document.getElementById('bookshelf');
var popup = document.getElementById('popup');
var editableElementId;

// открыть попап
function handleOpenPopup() {
  bookshelf.classList.add('bookshelf--invisible');
  popup.classList.add('popup--open');
}

// закрыть попап
function handleClosePopup() {
  popup.classList.remove('popup--open');
  bookshelf.classList.remove('bookshelf--invisible');
  popup.reset();
}

// генерируем случайный id
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// разметка одной книги
function generateHtml(obj) {
  var Html =    '<div id="' + obj.id + '" class="book bookshelf__book">' +
                  '<div class="book__information-box">' +
                    '<div class="book__information">' +
                      '<div class="book__name">' + obj.name + '</div>' +
                      '<div class="book__author">'+ obj.author + '</div>' +
                      '<div class="book__year">' + obj.year +' год</div>' +
                    '</div>' +
                    '<div class="book__img-wrapper">' +
                      '<img class="book__img" src="' + obj.img + '"  alt="изображение книги">' +
                    '</div>' +
                  '</div>' +
                  '<div class="book__btn-group">' +
                    '<button onclick="handleEditBook(this)" class="btn book__btn" type="button">Редактировать</button>' +
                    '<button onclick="handleRemoveBook(this)" class="btn book__btn" type="button">Удалить</button>' +
                  '</div>' +
                '</div>'
  return Html;
}

// создание элемента и добавление его на страницу и в массив
function createHtmlforBook(obj) {
  var item = document.createElement('div');
  item.innerHTML = generateHtml(books[books.length - 1]);
  item.className = 'bookshelf__book-wrapper';
  bookshelf.appendChild(item);
}

// обрабатываем событие submit
popup.addEventListener('submit', function(e) {
  if (!popup.noValidate) {
    if (editableElementId) {
      books.forEach(function(item, i, books) {
        if (editableElementId === item.id) {
          books.splice(i, 1);
          document.getElementById(editableElementId).parentNode.remove();
        }
      });
    }
  var obj = {
    id: generateId(),
    name: document.getElementById('nameBook').value,
    author: document.getElementById('authorBook').value,
    year: document.getElementById('yearStartBook').value,
    img: document.getElementById('pathImg').value
  }
  books.push(obj);
  createHtmlforBook(books);
  handleClosePopup();
  popup.reset();
  e.preventDefault();
}});

// Удаление книги со страницы и из массива
function handleRemoveBook(element) {
  var thisBook = element.parentNode.parentNode;
  books.forEach(function(item, i, books) {
    if (thisBook.id === item.id) {
      books.splice(i, 1);
    }
    thisBook.parentNode.remove();
  });
}

// Редактировать книгу путём удаления и добавления новой
function handleEditBook(element) {
  var thisBook = element.parentNode.parentNode;
  books.forEach(function(item, i, books) {
    if (thisBook.id === item.id) {
      handleOpenPopup();
      editableElementId = item.id;
      document.getElementById('nameBook').value = item.name;
      document.getElementById('authorBook').value = item.author;
      document.getElementById('yearStartBook').value = item.year;
      document.getElementById('pathImg').value = item.img;
    }
  });
}
