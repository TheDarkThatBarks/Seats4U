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

    let validate = (venueName, venuePassword) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE name=? AND password=?", [venueName, venuePassword], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows && rows.length == 1) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    const validUser = await validate(event.venueName, event.venuePassword);
    let response = undefined;

    if (validUser) {
        let activateShow = (showID) => {
            return new Promise((resolve, reject) => {
                pool.query("UPDATE Shows SET active=1 WHERE showID=?;", [showID], (error, rows) => {
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

        let activated = await activateShow(event.showID,
                                           event.venueName,
                                           event.venuePassword);
        response = {
            statusCode: 200,
            success: activated
        };
    } else {
        response = {
            statusCode: 400,
            error: "Invalid Venue Manager credentials"
        };
    }

    pool.end();
    return response;
};