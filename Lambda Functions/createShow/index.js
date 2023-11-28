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

    /*let alreadyExists = (name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE name=?", [name], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows && rows.length >= 1) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };*/

    let response = undefined;
    //const nameTaken = await alreadyExists(event.venueName);

    //if (!nameTaken) {
        let createVenue = (venueID, name, startingPrice, month, day, year, hour, minute) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Shows(venueID,name,startingPrice,month,day,year,hour,minute) VALUES(?,?,?,?,?,?,?,?);",
                    [venueID, name, startingPrice, month, day, year, hour, minute], (error, rows) => {
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

        let showID = await createVenue(event.venueID,
                                       event.showName,
                                       event.startingPrice,
                                       event.date.month,
                                       event.date.day,
                                       event.date.year,
                                       event.time.hour,
                                       event.time.minute);
        response = {
            statusCode: 200,
            showID: showID,
            //token: token
        };
    /*} else {
        response = {
            statusCode: 400,
            error: "Venue with that name already exists"
        };
    }*/

    return response;
};