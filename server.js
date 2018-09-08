// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

const sensorTypes = require('./lib/get-sensor-types.js')
const oracledb = require('oracledb')
const dbconfig = require('./lib/db-config.js')

async function createDbConnectionPool() {
    try {
        await oracledb.createPool(dbconfig)
        console.log("Default DB connection pool created")
    }
    catch(error) {
        console.log(error)
    }
}

createDbConnectionPool()

async function getSensorTypes() { 
    return new Promise(async function(resolve, reject) {
        try {
            let types = await sensorTypes.getSensorTypes()
            console.log(JSON.stringify(types))
            
            resolve(JSON.stringify(types))
        }
        catch(error) {
            console.log(error)
            reject(error)
        }
    })
}

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/sensor-types", function (request, response) { 
    getSensorTypes()
        .then((results, error) => {
            if(error) {
                response.writeHead(500, {'Content-Type': 'application/json'});    
            }
            else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(results)
            }
        })
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});