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
        let getVenue = (venueName) => {
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM Venues WHERE name=?", [venueName], (error, rows) => {
                    if (error)
                        return reject(error);
                    if (rows && rows.length == 1) {
                        return resolve(rows[0]);
                    } else {
                        return resolve(false);
                    }
                });
            });
        };
        
        let venue = await getVenue(event.venueName);
        let totalSeats = (venue.sideLeftRows * venue.sideLeftColumns) + (venue.centerRows * venue.centerColumns) + (venue.sideRightRows * venue.sideRightColumns);

        let createShow = (venueName, name, startingPrice, month, day, year, hour, minute, time) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Shows(venueName,name,startingPrice,month,day,year,hour,minute,time,active,locked,lockedUntil,seatsTotal,seatsSold) VALUES(?,?,?,?,?,?,?,?,?,0,0,NULL,?,0);",
                    [venueName, name, startingPrice, month, day, year, hour, minute, time, totalSeats], (error, rows) => {
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

        const addPadding = (num) => {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        };

        let str = addPadding(event.year) + '-';
        str += addPadding(event.month) + '-';
        str += addPadding(event.day) + 'T';
        str += addPadding(event.hour) + ':';
        str += addPadding(event.minute) + ':00';
        let date = new Date(str);

        let showID = await createShow(event.venueName,
                                      event.showName,
                                      event.startingPrice,
                                      event.month,
                                      event.day,
                                      event.year,
                                      event.hour,
                                      event.minute,
                                      date.getTime());

        const createSeat = (showID, section, row, column) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Seats(showID,section,r,c,sold) VALUES(?,?,?,?,0);",
                    [showID, section, row, column], (error, rows) => {
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
        
        for (let r = 1; r <= venue.sideLeftRows; r++) {
            for (let c = 1; c <= venue.sideLeftColumns; c++)
                await createSeat(showID, "sideLeft", r, c);
        }
        for (let r = 1; r <= venue.centerRows; r++) {
            for (let c = 1; c <= venue.centerColumns; c++)
                await createSeat(showID, "center", r, c);
        }
        for (let r = 1; r <= venue.sideRightRows; r++) {
            for (let c = 1; c <= venue.sideRightColumns; c++)
                await createSeat(showID, "sideRight", r, c);
        }
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

    pool.end();
    return response;
};