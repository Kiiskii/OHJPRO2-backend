const express = require('express');

const { body } = require('express-validator');

const favoritesController = require('../controllers/favorites')

const router = express.Router();

// router.get('/', favoritesController.fetchAll);

router.post(
    '/',
    [
        body('user_id').notEmpty(),
        body('favorites_id').notEmpty()
    ],
    favoritesController.favoritesPost
);
router.delete('/:id', favoritesController.deleteFavorites);

module.exports = router;