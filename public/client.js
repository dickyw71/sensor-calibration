
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

    // load the sensors for the selected sensor type
    
}