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

    let seatList = (showID) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Seats WHERE showID=?", [showID], (error, rows) => {
                if (error)
                    return reject(error);
                return resolve(rows);
            });
        });
    };

    let response = undefined;

    response = {
        statusCode: 200,
        seats: await seatList(event.showID)
    };

    pool.end();
    return response;
};