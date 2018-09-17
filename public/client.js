
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="sensor-type"]').onchange=sensorTypeChangeEventHandler;
},false);

(function() {
    // load the options for the sensor type select
    fetch('/api/sensor-types').then((response) => {
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
    fetch(`/api/sensors?type=${sensorType}`).then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
    })
    
}