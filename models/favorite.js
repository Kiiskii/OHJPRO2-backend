const db = require('../util/database');

module.exports = class Favorites {
    constructor(userid, favid) {
        this.userid = userid;
        this.favid = favid;
    }

    static fetchAll() {
        return db.query('SELECT favid FROM favorites WHERE user_id = $1', [userId])
    }

    static async save(favorites) {
        const result = await db.query(
            'INSERT INTO favorites (userid, favid) VALUES ($1, $2)',
            [favorites.userid, favorites.favid]
        );
        // console.log(`favid: ${favorites.userid}`)
        // console.log(`favid: ${favorites.favid}`)
        return result;
    }

    static delete(id) {
        return db.query('DELETE FROM favorites WHERE id = $1', [id]);
    }
}