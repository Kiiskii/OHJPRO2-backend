const express = require('express');

const { body } = require('express-validator');

const favoritesController = require('../controllers/favorites')

const router = express.Router();

router.get('/:userid', favoritesController.fetchAll);

router.post(
    '/',
    [
        body('userid').notEmpty(),
        body('favid').notEmpty()
    ],
    favoritesController.favoritesPost
);
router.delete('/:id', favoritesController.deleteFavorites);

module.exports = router;