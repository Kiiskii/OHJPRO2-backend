const { validationResult } = require('express-validator');

const Favorites = require('../models/favorite');

const db = require('../util/database');

exports.fetchAll = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT userid, nimi, kuvaus, homesite, osoite FROM favorites')

      res.status(200).json(rows)
    } catch (err) {
      console.error(err)
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  }

exports.favoritesPost = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { userid, nimi, kuvaus, homesite, osoite } = req.body;

    try {

        const favoritesDetails = {
            userid: userid,
            nimi: nimi,
            kuvaus: kuvaus,
            homesite: homesite,
            osoite: osoite
        }

        const result = await Favorites.save(favoritesDetails)

        res.status(201).json({ message: 'Posted!' })
        
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteFavorites = async (req, res, next) => {
    try {

        const deleteResponse = await Favorites.delete(req.params.id)
        res.status(200).json(deleteResponse);

    } catch(err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}