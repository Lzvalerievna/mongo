const express = require('express');
const mongoose = require('mongoose');


const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/book');

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/book', todoRouter);

app.use(errorMiddleware);

async function start(PORT, UrlDB) {
    try{
        await mongoose.connect(UrlDB, {
            user: process.env.DB_USERNAME || 'root',
            pass: process.env.DB_USERNAME || 'example',
            dbName: process.env.DB_NAME || 'book_database',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log(`Сервер слушает на порту ${PORT}`);
        });
    }catch (e) {
        console.log(e);
    }
}
const UrlDB = process.env.UrlDB || 'mongodb://root:example@mongo:27017/';
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);
