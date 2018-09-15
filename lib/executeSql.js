const oracledb = require('oracledb')

function executeSql(sqlString, bindParam, executeOptions) {
    return new Promise(async function(resolve, reject) {
        let conn;

        try {
            conn = await oracledb.getConnection()

            console.log('Connected to database');

            let result = await conn.execute(
                sqlString
                , bindParam || []
                , executeOptions || {}
            );

            console.log('Select query executed');

            resolve({rows: result.rows});

        } catch (err) {
            console.log('Error occurred', err);
        
            reject(err);           
        } finally {
            if (conn) {
                try {
                  await conn.close();
         
                  console.log('Connection closed');
                } catch (err) {
                  console.log('Error closing connection', err);
                }
              }
        }            
    });
}

module.exports.executeSql = executeSql;
