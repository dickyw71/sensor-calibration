const oracledb = require('oracledb')
const dbconfig = require('../lib/db-config.js')
const details = require('../lib/get-sensor-details.js')
const types = require('../lib/get-sensor-types.js')
const ofType = require('../lib/get-sensors-of-type.js')
const byId = require('../lib/get-sensor-by-id.js')
const exeSql = require('../lib/executeSql.js')

async function startQuery () {
    try {
        await oracledb.createPool(dbconfig)

        let sensorDetails = await exeSql.executeSql(
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
                WHERE bar_code =  :sensorBarcode`
            , ['TZ000002']
            , { maxRows : 1
                , fetchInfo : {
                    "CAL_DUE_DATE": { type: oracledb.STRING }
                    , "REVISION_DT": { type: oracledb.STRING }
                }
                , outFormat : oracledb.OBJECT
            })

        console.log(sensorDetails.rows)

        let sensors = await exeSql.executeSql(
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
            WHERE spd.sensor_type_cd =  :sensorType`
            , ['TZ']
            , { maxRows : 0
                , fetchInfo : {
                    "CAL_DUE_DATE": { type: oracledb.STRING }
                    , "REVISION_DT": { type: oracledb.STRING }
                }
                , outFormat : oracledb.OBJECT
            })

        parentSensorIds = sensors.rows.map( sensor => {
            if(sensor.NH_SENSOR_ID !== null) {
                console.log(sensor.NH_SENSOR_ID)
                return sensor.NH_SENSOR_ID
            }
        });

        let parentSensor = await byId.getSensorById(parentSensorIds[0])
        console.log(parentSensor)

        let sensorTypes = await exeSql.executeSql(
                `SELECT sensor_type_cd
                    , sensor_type_sdesc 
                 FROM ref_sensor_type`)

        sensorTypes.rows.forEach(element => {
            console.log(element)
        });


    }
    catch(error) {
        console.log(error)
    }
}

startQuery();