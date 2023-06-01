const express = require('express');
const router = express.Router();
const redis = require('redis');
const Books = require('../models/books');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

const client = redis.createClient({url: REDIS_URL});

(async () => {
    await client.connect();
})(); 

router.get('/', async (req, res) => {

    try {
        const books = await Books.find().select('-__v');
        res.render("book/index", {
           title: "Список книг",
           books: books,
        });
    }catch (e) {
        res.json(e);
    }
});

router.get('/create', (req, res) => {
    
    res.render("book/create", {
        title: "Создать книгу",
        book: {},
    });
});

router.post('/create', async (req, res) => {

    const {title, desc} = req.body;
    const book = new Books({title,desc});

    try {
        await book.save();
        res.redirect('/book');
    }catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:id', async (req, res) => {

    const {id} = req.params;

    try {
        const book = await Books.findById(id).select('-__v');
        const cnt = await client.incr(id);
        res.render("book/view", {
            title: "Информация по книге",
            book: book,
            counter: cnt,
        });  
    }catch (e) {
        res.status(404).json(e);
    }
    
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const book = await Books.findById(id).select('-__v');
        await  res.render("book/update", {
            title: "Редактирование книги",
            book: book,
        });
    }catch (e) {
        res.status(404).json(e);
    }
});

router.post('/update/:id', async (req, res) => {

    const {id} = req.params;
    const {title, desc} = req.body;
    
    try {
        await Books.findByIdAndUpdate(id, {title, desc});
        res.redirect('/');
    }catch (e) {
        res.status(404).json(e);
    }
});

router.post('/delete/:id', async (req, res) => {

    const {id} = req.params;

    try {
        await Books.deleteOne({ _id: id });
        await res.redirect('/');
    }catch (e) {
        res.json('404');
    }
});




module.exports = router;








