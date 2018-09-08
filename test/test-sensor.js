const oracledb = require('oracledb')
const dbconfig = require('../lib/db-config.js')
const details = require('../lib/get-sensor-details.js')
const types = require('../lib/get-sensor-types.js')
const ofType = require('../lib/get-sensors-of-type.js')
const byId = require('../lib/get-sensor-by-id.js')

async function startQuery () {
    try {
        await oracledb.createPool(dbconfig)

        // let result = await details.getSensorDetails('TZ000002')

        // console.log(result)

        // let sensorTypes = await types.getSensorTypes()

        // sensorTypes.rows.forEach(element => {
        //     console.log(element)
        // });

        let sensors = await ofType.getSensorOfType('TZ')

        parentSensorIds = sensors.map( sensor => {
            if(sensor.NH_SENSOR_ID !== null) {
                console.log(sensor.NH_SENSOR_ID)
                return sensor.NH_SENSOR_ID
            }
        });

        let parentSensor = await byId.getSensorById(parentSensorIds[0])
        console.log(parentSensor)

    }
    catch(error) {
        console.log(error)
    }
}

startQuery();