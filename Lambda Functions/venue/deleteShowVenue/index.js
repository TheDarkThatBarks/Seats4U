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

    let deleteShow = (showID) => {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM Shows WHERE showID=? AND active=0", [showID], (error, rows) => {
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

    let response = undefined;
    const validUser = await validate(event.venueName, event.venuePassword);

    if (validUser) {
        try {
            const result = await deleteShow(event.showID);
            response = {
                statusCode: 200,
                success: JSON.stringify(result)
            }
        } catch (err) {
            response = {
                statusCode: 400,
                error: err
            }
        } finally {
            pool.end();   // disconnect from database to avoid "too many connections" problem that can occur
        }
    } else {
        response = {
            statusCode: 400,
            error: "Invalid Venue Manager credentials"
        };
    }

    pool.end();
    return response;
};