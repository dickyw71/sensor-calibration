const oracledb = require('oracledb')
const dbconfig = require('../lib/db-config.js')
const details = require('../lib/get-sensor-details.js')
const types = require('../lib/get-sensor-types.js')

async function startQuery () {
    try {
        await oracledb.createPool(dbconfig)

        let result = await details.getSensorDetails('TZ000002')

        console.log(result)

        let sensorTypes = await types.getSensorTypes()

        sensorTypes.rows.forEach(element => {
            console.log(element)
        });
    }
    catch(error) {
        console.log(error)
    }
}

startQuery();