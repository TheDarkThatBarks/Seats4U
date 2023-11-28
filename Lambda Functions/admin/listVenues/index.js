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

    let validate = (adminPassword) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueID=?", [venueID], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows && rows.length == 1 && rows[0].password == adminPassword) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let venueList = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues", [], (error, rows) => {
                if (error)
                    return reject(error);
                return resolve(rows);
            });
        });
    };

    const result = await venueList();
    const validUser = await validate(event.adminPassword);

    if (validUser) {

    }
    const response = {
        statusCode: 200,
        venues: result
    };
    
    pool.end();

    return response;
};