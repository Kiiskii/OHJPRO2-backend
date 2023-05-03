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
            await db.query(
                    'INSERT INTO favorites (userid, favid) VALUES ($1, $2)',
                    [favorites.userid, favorites.favid],
                    console.log('Favorite added to db!')
                )
         } catch(err) {
            console.error(err);
            throw err;
        }
    }

    static async delete(favid) {
        try {
            await db.query('DELETE FROM favorites WHERE favid = $1', [favid]);
            console.log('Favorite removed from db!');
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
    
    }

