const express = require('express');
const router = express.Router();
const axios = require('axios');
const {isAuthenticated} = require('../middlware/authentication');

const apiKey = 'a2b5ac5d';

router.get('', isAuthenticated, async (req, res) =>{
    const lang = req.query.lang || 'en';
    res.render('currency', { title: null, movie: null, year: null, lang: lang})
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const  title  = req.body.q;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
        const movie = response.data;
        console.log(movie);
        const lang = req.query.lang || 'en';
        res.render('currency', { title, movie: movie.Genre, year: movie.Year, lang: lang });
    } catch (error) {
        console.error('Error fetching movie info:', error);
        res.render('error');
    }
});

module.exports = router;
