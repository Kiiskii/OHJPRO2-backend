const db = require('../util/database');

module.exports = class Favorites {
    constructor(userid, favid) {
        this.userid = userid;
        this.favid = favid;
    }

    static fetchAll(userid) {
        return db.query('SELECT * FROM favorites WHERE userid = $1', [userid])
          .then(result => result.rows.map(row => row.favid));
      }


    static async save(favorites) {
        try {
            const { rows } = await db.query('SELECT COUNT(*) FROM favorites WHERE favid = $1', [favorites.favid]);
            const favCount = rows[0].count;
            
            if (favCount > 0) {
                await db.query('DELETE FROM favorites WHERE favid = $1', [favorites.favid]);
                console.log('Favorite removed from db!');
            } else {
                const result = await db.query(
                    'INSERT INTO favorites (userid, favid) VALUES ($1, $2)',
                    [favorites.userid, favorites.favid],
                    console.log('Favorite added to db!')
                );
                // console.log(`favid: ${favorites.userid}`)
                // console.log(`favid: ${favorites.favid}`)
                return result;
            }
         } catch(err) {
            console.error(err);
            throw err;
        }
    }

}