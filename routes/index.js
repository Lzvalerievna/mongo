const express = require('express');
const router = express.Router();
const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

const client = redis.createClient({url: REDIS_URL});

(async () => {
    await client.connect();
})(); 

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Главная',
    });
});

module.exports = router;