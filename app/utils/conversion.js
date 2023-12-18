module.exports = {
    temperatureConversionModule: {
        KELVIN: {
            KELVIN: (t) => t,
            CELSIUS: (t) => t - 273.15,
            FAHRENHEIT: (t) => (t - 273.15) * 9 / 5 + 32,
            RANKINE: (t) => t * 9 / 5
        },
        CELSIUS: {
            KELVIN: (t) => t + 273.15,
            CELSIUS: (t) => t,
            FAHRENHEIT: (t) => t * 9 / 5 + 32,
            RANKINE: (t) => t * 9 / 5 + 491.67
        },
        FAHRENHEIT: {
            KELVIN: (t) => (t - 32) * 5 / 9 + 273.15,
            CELSIUS: (t) => (t - 32) * 5 / 9,
            FAHRENHEIT: (t) => t,
            RANKINE: (t) => t + 459.67
        },
        RANKINE: {
            KELVIN: (t) => t * 5 / 9,
            CELSIUS: (t) => (t - 491.67) * 5 / 9,
            FAHRENHEIT: (t) => t - 459.67,
            RANKINE: (t) => t
        }
    },
    volumeConversionModule: {
        LITERS: 1,
        TABLESPOONS: 0.014787,
        CUBIC_INCHES: 0.0163871,
        CUPS: 0.236588,
        CUBIC_FEET: 28.3168,
        GALLONS: 3.78541
    }
}