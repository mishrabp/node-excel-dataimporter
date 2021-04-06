const config = require("config");
const sql = require('mssql')

const sqlServer = config.get('sqlServerName') + ":" + config.get('sqlPort')
const sqlLogin = config.get('sqlUserId') + ":" + "xxxxx" //(new Buffer(config.get('sqlPassword'), 'base64')).toString('ascii')
const sqlDB = config.get('sqlDBName')

const sqlConnection = 'mssql://' + sqlLogin + '@' + sqlServer + '/' + sqlDB
const pool = new sql.ConnectionPool(sqlConnection).connect();

sql.on('error', err => {
    // ... error handler
    console.log('This is Error handler');
})

module.exports = async (sSQL) => {
    return new Promise(async (resolved, rejected)=>{
        try{
            (await pool).request().query(sSQL)
            .then((result) =>{
                console.dir(result)
                resolved(result)
            })
            .catch((err)=>{
                rejected(err)
            })
        }catch (err){
            rejected(err)
        }
    })
};

/* module.exports = (sSQL) => {
    return new Promise(async (resolved, rejected)=>{
        var dbConn = sql.connect(sqlConnection);
        var transaction = new sql.Transaction(dbConn);
        transaction.begin()
        .then(() => {
            var request = new sql.Request(transaction);
            request.query(sSQL)
            .then(function 	() {
                transaction.commit()
                .then(function (resp) {
                    console.log(resp);
                    dbConn.close();
                    resolved(resp);
                })
                .catch(function (err) {
                    console.log("Error in Transaction Commit " + err);
                    dbConn.close();
                    rejected(err);
                });
			})
            .catch(function (err) {
                console.log("Error in Transaction Begin " + err);
                dbConn.close();
                rejected(err);
            })
        })
        .catch(function (err) {
            console.log(err);
            dbConn.close();
            rejected(err);
        })
    });
} */

/* 
module.exports = (sSQL) => {

    return new Promise(async (resolved, rejected)=>{
        try {
            // connect to your database
            let pool = await sql.connect(sqlConnection);
            // create Request object
            const request = pool.request();
            // query to the database and get the records
            await request.query(sSQL, (err, result) => {
                result2 = JSON.stringify(result)
                console.dir(result)
                resolved(result2)
            })
        } catch (err) {
            // ... error checks
            //console.log('This is an Error');
            //console.log(err);
            //console.dir(err);
            rejected(err)
        }
    
    })
} */

