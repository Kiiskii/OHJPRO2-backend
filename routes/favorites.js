const express = require('express');

const { body } = require('express-validator');

const favoritesController = require('../controllers/favorites')

const router = express.Router();

router.get('/', favoritesController.fetchAll);

router.post(
    '/',
    [
        body('userid').notEmpty(),
        body('nimi').notEmpty(),
        body('kuvaus').notEmpty(),
        body('homesite').notEmpty(),
        body('osoite').notEmpty()
    ],
    favoritesController.favoritesPost
);
router.delete('/:id', favoritesController.deleteFavorites);

module.exports = router;