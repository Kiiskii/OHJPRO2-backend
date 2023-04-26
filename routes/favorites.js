const express = require('express');

const { body } = require('express-validator');

const favoritesController = require('../controllers/favorites')

// const auth = require('../middleware/auth');

const router = express.Router();

// router.get('/', favoritesController.fetchAll);

router.post(
    '/',
    [
        // auth,
        body('user_id').notEmpty(),
        body('favorites_id').notEmpty()
    ],
    favoritesController.favoritesPost
);
router.delete('/:id', favoritesController.deleteFavorites);

module.exports = router;