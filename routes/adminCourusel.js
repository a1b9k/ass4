const express = require('express');
const router = express.Router();
const Element = require('../models/element');
const {isAuthenticatedAdmin} = require('../middlware/authentication');

router.get('', isAuthenticatedAdmin, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const elements = await Element.find();

        res.render('adminCourusel', { elements: elements, lang: lang });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;