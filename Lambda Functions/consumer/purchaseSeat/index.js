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

    let purchased = await purchaseSeat(event.showID);
    const response = {
        statusCode: (purchased ? 200 : 400),
        success: purchased
    };

    return response;
};