const oracledb = require('oracledb')

function getSensorById(sensorId) {
    return new Promise(async function(resolve, reject) {
        let conn;

        try {
            conn = await oracledb.getConnection()

            console.log('Connected to database');

            let result = await conn.execute(
                `SELECT s.bar_code as Barcode
                    , s.oem_serial_no
                    , s.project_cd as Project
                    , s.cal_due_date
                    , s.revision_dt
                    , s.nh_sensor_id
                    , spd.sensor_part_name
                    , spd.sensor_type_cd
                    , s.obsolete_flag as In_use
                    , spd.equip_desc
                FROM sensor s
                JOIN sensor_part_definition spd
                    ON(s.sensor_part_id = spd.sensor_part_id)
                WHERE sensor_id =  :sensorId`
                , [sensorId]
                , { maxRows : 1
                    , fetchInfo : {
                        "CAL_DUE_DATE": { type: oracledb.STRING }
                        , "REVISION_DT": { type: oracledb.STRING }
                    }
                    , outFormat : oracledb.OBJECT
                }
            );

            console.log('Select query executed');

            resolve(result.rows[0]);

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

module.exports.getSensorById = getSensorById;
