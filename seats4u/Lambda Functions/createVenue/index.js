const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {

    // get credentials from the db_access layer (loaded separately via AWS console)
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let validateExists = (name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE name=?", [name], (error, rows) => {
                if (error)
                    return reject(error);
                console.log(rows);
                if (rows && rows.length == 1) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let response = undefined;
    const canCreate = await validateExists(event.name);

    if (!canCreate) {
        let createVenue = (name, value) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Venues(name,value) VALUES(?,?);", [name, value], (error, rows) => {
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

        let addResult = await createVenue(event.name, event.value);
        response = {
            statusCode: 200,
            success: addResult
        };
    } else {
        response = {
            statusCode: 400,
            success: false
        };
    }

    return response;
};