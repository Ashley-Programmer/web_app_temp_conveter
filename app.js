function convertTemp() {
    const input_temp = parseFloat(document.getElementById('input-temperature').value);
    const from_unit = document.getElementById('from-unit').value;
    const to_unit = document.getElementById('to-unit').value;

    if (isNaN(input_temp) || input_temp === '') {
        document.getElementById('result').textContent = "Please enter a valid temperature number!";
        return;
    }

    let celsius;

    // convert input to celsius first
    switch(from_unit) {
        case 'celsius':
            celsius = input_temp;
            break;
        case 'fahrenheit':
            celsius = ((input_temp - 32) * 5/9);
            break;
        case 'kelvin':
            celsius = ((input_temp - 273.15));
            break;
    }

    // convert from celsius to target unit
    let result;

    switch(to_unit) {
        case 'celsius':
            result = celsius;
            break;
        case 'fahrenheit':
            result = ((celsius * 9/5) + 32);
            break;
        case 'kelvin':
            result = ((celsius + 273.15));
            break;
    }

    document.getElementById('result').textContent = 
    `${input_temp}° ${from_unit.charAt(0).toUpperCase()} = ${result.toFixed(2)}° 
    ${to_unit.charAt(0).toUpperCase()}`
}

function hideResult() {
    document.getElementById('result').style.display = 'none';
}
function clearForm() {
    document.getElementById('converter-form').reset();
    hideResult();
}

// Form submission handler
document.getElementById('converter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const temperature = document.getElementById('input_temperature').value;
    const fromScale = document.getElementById('from-unit').value;
    const toScale = document.getElementById('to-unit').value;

    try {
        // Validate inputs
        if (!fromScale || !toScale) {
            throw new Error('Please select both source and target temperature scales');
        }

        const validatedTemp = validateInput(temperature, fromScale);
        const convertedTemp = convertTemperature(validatedTemp, fromScale, toScale);

        showResult(validatedTemp, fromScale, convertedTemp, toScale);
    } catch (error) {
        showError(error.message);
    }
});