const express = require('express');
const router = express.Router();
const axios = require('axios');
const {isAuthenticated} = require('../middlware/authentication');

router.get('', isAuthenticated, (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('index', { number: null, fact: null, lang: lang});
});


router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const number = req.body.q;
    try {
        const response = await axios.get(`http://numbersapi.com/${number}`);
        console.log(response.data)
        res.render(`index`, { number: number, fact: response.data, lang: lang });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch fact');
    }
});


module.exports = router;