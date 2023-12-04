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

    let showList = (venueName) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows WHERE venueName=?", [venueName], (error, rows) => {
                if (error)
                    return reject(error);
                return resolve(rows);
            });
        });
    };

    const validUser = await validate(event.venueName, event.venuePassword);
    let response = undefined;

    if (validUser) {
        response = {
            statusCode: 200,
            venues: await showList(event.venueName)
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