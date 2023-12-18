const isEmpty = require('./is-empty');
const { UNIT_OF_MEASURE } = require('../../config/enum');
const { temperatureConversionModule, volumeConversionModule } = require('../utils/conversion');

module.exports = {
    validateProblemModel: (problem) => {

        const {
            inputNumericalValue,
            inputUnitOfMeasure,
            targetUnitOfMeasure,
            studentResponse
        } = problem;

        let errors = {};

        if (isEmpty(inputNumericalValue)) {
            errors.inputNumericalValue = 'Input numeric value is required';
        }
        if (isEmpty(inputUnitOfMeasure)) {
            errors.inputUnitOfMeasure = 'Input unit of measure is required';
        }
        if (isEmpty(targetUnitOfMeasure)) {
            errors.targetUnitOfMeasure = 'Target unit of measure is required';
        }
        if (isEmpty(studentResponse)) {
            errors.studentResponse = 'Student response is required';
        }

        // Invalid Logic Implementation
        if (
            (UNIT_OF_MEASURE.TEMPERATURE.includes(inputUnitOfMeasure) &&
                UNIT_OF_MEASURE.VOLUME.includes(targetUnitOfMeasure)) ||
            (UNIT_OF_MEASURE.TEMPERATURE.includes(targetUnitOfMeasure) &&
                UNIT_OF_MEASURE.VOLUME.includes(inputUnitOfMeasure))
        ) {
            errors.inputUnitOfMeasure = 'Does not match with target unit of measure';
            errors.targetUnitOfMeasure = 'Does not match with input unit of measure';
        }

        if (isEmpty(errors)) {
            let correctResponse;
            if (UNIT_OF_MEASURE.TEMPERATURE.includes(inputUnitOfMeasure)) {     // Case of Temperature
                const convert = temperatureConversionModule[inputUnitOfMeasure][targetUnitOfMeasure];
                correctResponse = convert(Number(inputNumericalValue));
            } else {                                                            // Case of Volume
                correctResponse = Number(inputNumericalValue) *
                    volumeConversionModule[inputUnitOfMeasure] /
                    volumeConversionModule[targetUnitOfMeasure];
            }
            if (Number(studentResponse) !== Number(correctResponse.toFixed(3))) {
                errors.studentResponse = `Correct value is ${correctResponse.toFixed(3)}`;
            }
        }

        return {
            isValid: isEmpty(errors),
            errors
        }
    }
}