// Main.js
var convertTemperatureToCelsiusButton = document.getElementById("convertTemperatureToCelsiusButton");
var convertTemperatureToFarenheitButton = document.getElementById("convertTemperatureToFarenheitButton");

var degreeInput = document.getElementById("degreeInputField");
var conversionResult = document.getElementById("conversionResult");


// Convert to Celsius button
convertTemperatureToCelsiusButton.addEventListener("click", function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                updateConversionResult(degreeInput.value, "farenheit", request.responseText)
            } else {
                conversionFailed();
            }
        }
    }
    request.open('Get', '/api/convert/?degree=' + degreeInput.value+'&from=farenheit');
    request.send();
})

// Convert to Celsius button
convertTemperatureToFarenheitButton.addEventListener("click", function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                updateConversionResult(degreeInput.value, "celsius", request.responseText)
            } else {
                conversionFailed();
            }
        }
    }
    request.open('Get', '/api/convert/?degree=' + degreeInput.value + '&from=celsius');
    request.send();
})

// Update the div with the result
function updateConversionResult(degreeInput, from, convertedValue) {
    var convertedTo = "Celsius";
    if (from == "celsius") {
        convertedTo = "Farenheit";
    }
    conversionResult.innerHTML = degreeInput + " " + from.capitalize() + " is "+ convertedValue + " " + convertedTo;
}

// Update the div with an error message
function conversionFailed() {
    conversionResult.innerHTML = "Conversion failed!";
}

// Extend String class with capitalize
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
