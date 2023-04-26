const db = require('../util/database');

module.exports = class Favorites {
    constructor(user_id, re) {
        this.user_id = user_id;
        this.favorites_id = favorites_id
    }

    // static fetchAll() {
    //     return db.query('SELECT userid, nimi, kuvaus, homesite, osoite FROM favorites')
    // }

    static async save(favorites) {
        return db.query(
            'INSERT INTO favorites (user_id, favorites_id) VALUES ($1, $2)',
            [favorites.user_id, favorites.favorites_id]
        );
    }

    static delete(id) {
        return db.query('DELETE FROM favorites WHERE id = $1', [id]);
    }
}