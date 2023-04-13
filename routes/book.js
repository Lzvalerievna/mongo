const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", desc = "", id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.id = id;
    }
}
const stor = {
    books: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.render("book/index", {
        title: "Список книг",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Создать книгу",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = stor;
    const {title, desc} = req.body;

    const newBook = new Book(title, desc);
    books.push(newBook);

    res.redirect('/');
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 
        
    res.render("book/view", {
        title: "Информация по книге",
        books: books[idx],
    });
    
});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("book/update", {
        title: "Редактирование книги",
        books: books[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('errors/404');
    } 

    books[idx] = {
        ...books[idx],
        title,
        desc,
    };
    res.redirect(`/`);
});

router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    books.splice(idx, 1);
    res.redirect(`/`);
});

module.exports = router;








