const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {

    // get credentials from the db_access layer (loaded separately via AWS console)
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let deactivateShows = () => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE Shows SET active=0 WHERE time<?", [Date.now()], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let unlockShows = () => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE Shows SET locked=0, lockedUntil=NULL WHERE lockedUntil<?", [Date.now()], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let showList = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows", [], (error, rows) => {
                if (error)
                    return reject(error);
                return resolve(rows);
            });
        });
    };

    let response = undefined;
    let deactivated = await deactivateShows();
    let unlocked = await unlockShows();

    if (deactivated && unlocked) {
        response = {
            statusCode: 200,
            venues: await showList()
        };
    } else {
        response = {
            statusCode: 400,
            error: "Could not update show list"
        };
    }

    pool.end();
    return response;
};