const oracledb = require('oracledb')

function getSensorTypes() {
    return new Promise(async function(resolve, reject) {
        let conn;

        try {
            conn = await oracledb.getConnection()

            console.log('Connected to database');

            let result = await conn.execute(
                `SELECT sensor_type_cd
                    , sensor_type_mdesc
                    , sensor_type_sdesc
                FROM ref_sensor_type rst`
                , []
                , { maxRows : 1000
                    , outFormat : oracledb.ARRAY
                }
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

module.exports.getSensorTypes = getSensorTypes;
