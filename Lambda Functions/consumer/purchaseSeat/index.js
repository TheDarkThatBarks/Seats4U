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

    const updateShow = (showID) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE Shows SET seatsSold=seatsSold+1 WHERE showID=?;", [showID], (error, rows) => {
                if (error)
                    return reject(error);
                if (rows && rows.affectedRows == 1) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })
        })
    }

    const purchaseSeat = (seatID) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE Seats SET sold=1 WHERE seatID=?;", [seatID], (error, rows) => {
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

    const updated = await updateShow(event.showID);
    const purchased = await purchaseSeat(event.seatID);
    const response = {
        statusCode: (updated && purchased ? 200 : 400),
        success: updated && purchased
    };

    return response;
};