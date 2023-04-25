const db = require('../util/database');

module.exports = class Favorites {
    constructor(userId, nimi, kuvaus, homesite, osoite) {
        this.userId = userId;
        this.nimi = nimi;
        this.kuvaus = kuvaus;
        this.homesite = homesite;
        this.osoite = osoite;
    }

    static async save(favorites) {
        return db.query(
            'INSERT INTO favorites (userId, nimi, kuvaus, homesite, osoite) VALUES ($1, $2, $3, $4, $5)',
            [user.userId, user.nimi, user.kuvaus, user.homesite, user.osoite]
        );
    }
}