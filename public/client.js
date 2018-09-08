

(function() {
    // load the options for the sensor type select
    fetch('/api/sensor-types').then((response) => {
        return response.json()
    }).then((json) => {
            console.log(json)
            json.rows.forEach(element => {
                let newOption = document.createElement("option")
                newOption.setAttribute("value", `${element[0]}   ${element[1]}`)
                newOption.innerHTML = newOption.value
                let selectElement = document.getElementById("sensorTypeSelect")
                selectElement.appendChild(newOption)
            });         
        })
})();