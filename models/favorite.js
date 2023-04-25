const db = require('../util/database');

module.exports = class Favorites {
    constructor(userid, nimi, kuvaus, homesite, osoite) {
        this.userid = userid;
        this.nimi = nimi;
        this.kuvaus = kuvaus;
        this.homesite = homesite;
        this.osoite = osoite;
    }

    static fetchAll() {
        return db.query('SELECT userid, nimi, kuvaus, homesite, osoite FROM favorites')
    }

    static async save(favorites) {
        return db.query(
            'INSERT INTO favorites (userid, nimi, kuvaus, homesite, osoite) VALUES ($1, $2, $3, $4, $5)',
            [favorites.userid, favorites.nimi, favorites.kuvaus, favorites.homesite, favorites.osoite]
        );
    }

    static delete(id) {
        return db.query('DELETE FROM favorites WHERE id = $1', [id]);
    }
}