
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="sensor-type"]').onchange=sensorTypeChangeEventHandler;
},false);

(function() {
    console.time("fetch_types")
    // load the options for the sensor type select
    fetch('/api/sensor-types').then((response) => {
        console.timeEnd("fetch_types")
        return response.json()
    }).then((json) => {
            let selectElement = document.getElementById("sensor-type")
            json.rows.forEach(sensorType => {
                let newOption = document.createElement("option")
                newOption.setAttribute("value", `${sensorType[0]}   ${sensorType[1]}`)
                newOption.innerHTML = newOption.value
                selectElement.appendChild(newOption)
            })        
        })
})();

function sensorTypeChangeEventHandler(event) {

    // get the selected sensor type option
    let e = document.getElementById("sensor-type")
    let selectedOption = e.options[e.selectedIndex].value      
    let sensorType = selectedOption.substring(0,2)

    // load the sensors for the selected sensor type
    console.time("fetch_sensors")
    fetch(`/api/sensors?type=${sensorType}`).then((response) => {
        console.timeEnd("fetch_sensors")
        if(response.status === 200) return response.json()
        else {
            throw new Error(`Error fetching sensors of type ${selectedOption}.`)
        }
    }).then((json) => {
        let sensorListElement = document.getElementById("sensor-list")
        // check for empty response
        if(json.length === 0) {
            sensorListElement.innerHTML = `No sensors of type ${sensorType}.`
        }
        else {
            // remove all the existing list content
            sensorListElement.innerHTML = ""
            json.forEach(sensor => {
                let sensorDetails = document.createElement("details")
                let sensorSummary = document.createElement("summary")
                sensorSummary.innerHTML = `${sensor.BARCODE} - ${sensor.SENSOR_PART_NAME}`
                sensorDetails.appendChild(sensorSummary)
                let table = document.createElement("table")
                table.innerHTML = `
                <tr>
                    <th scope="row">Sensor Type:</th>
                    <td>${sensor.EQUIP_DESC}</td>
                </tr>
                <tr>
                    <th scope="row">Sensor Part Def:</th>
                    <td>${sensor.SENSOR_PART_NAME}</td>
                </tr>
                <tr>
                    <th scope="row">OEM serial number:</th>
                    <td>${sensor.OEM_SERIAL_NO}</td>
                </tr> 
                <tr>
                    <th scope="row">Sensor Bar Code:</th>
                    <td>${sensor.BARCODE}</td>
                </tr>  
                <tr>
                    <th scope="row">Project Name:</th>
                    <td>${sensor.PROJECT}</td>
                </tr>            
                <tr>
                    <th scope="row">Calibration Due Date:</th>
                    <td>${sensor.CAL_DUE_DATE}</td>
                </tr> 
                <tr>
                    <th scope="row">Last Revision Date:</th>
                    <td>${sensor.REVISION_DT}</td>
                </tr>
                <tr>
                    <th scope="row">In-use:</th>
                    <td>${sensor.OBSOLETE_FLAG ? "No" : "Yes"}</td>
                </tr>`
                sensorDetails.appendChild(table)
                sensorListElement.appendChild(sensorDetails)        
            })
        }
    })
    .catch(error => {
        alert(error)
    })   
}