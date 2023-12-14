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

    let response = undefined;

    let unlockShow = (showID) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE Shows SET locked=0,lockedUntil=NULL WHERE showID=?;", [showID], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows && rows.affectedRows == 1) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let unlocked = await unlockShow(event.showID);
    response = {
        statusCode: (unlocked ? 200 : 400),
        success: unlocked
    };
    
    pool.end();
    return response;
};