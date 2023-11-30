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
        let createShow = (venueName, name, startingPrice, month, day, year, hour, minute) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Shows(venueName,name,startingPrice,month,day,year,hour,minute,active,locked) VALUES(?,?,?,?,?,?,?,?,?,?);",
                    [venueName, name, startingPrice, month, day, year, hour, minute, 0, 0], (error, rows) => {
                    if (error)
                        return reject(error);
                    if (rows && rows.affectedRows == 1) {
                        console.log(rows.insertId);
                        return resolve(rows.insertId);
                    } else {
                        return resolve(false);
                    }
                });
            });
        };

        let showID = await createShow(event.venueName,
                                      event.showName,
                                      event.startingPrice,
                                      event.date.month,
                                      event.date.day,
                                      event.date.year,
                                      event.time.hour,
                                      event.time.minute);
        response = {
            statusCode: 200,
            showID: showID
        };
    } else {
        response = {
            statusCode: 400,
            error: "Invalid Venue Manager credentials"
        };
    }

    return response;
};