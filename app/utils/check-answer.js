const { UNIT_OF_MEASURE, OUTPUT_TYPE } = require('../../config/enum');

const checkNumericValue = (inputNumericalValue, studentResponse, sampleResponse) => {
    let output;
    if (isNaN(inputNumericalValue)) {
        output = OUTPUT_TYPE.INVALID;
    } else if (isNaN(studentResponse)) {
        output = OUTPUT_TYPE.INCORRECT;
    } else {
        output = Number(sampleResponse) === Number(studentResponse) ?
            OUTPUT_TYPE.CORRECT : OUTPUT_TYPE.INCORRECT;
    }
    return output;
}

exports.checkAnswer = (problem, answer) => {
    return answer.map((record, index) => {
        const {
            inputNumericalValue,
            inputUnitOfMeasure,
            targetUnitOfMeasure,
            studentResponse
        } = record;
        let output = OUTPUT_TYPE.INVALID;
        if (UNIT_OF_MEASURE.TEMPERATURE.includes(inputUnitOfMeasure.toUpperCase())) {
            if (UNIT_OF_MEASURE.TEMPERATURE.includes(targetUnitOfMeasure.toUpperCase())) {
                output = checkNumericValue(inputNumericalValue, studentResponse, problem[index].studentResponse);
            }
        }
        else if (UNIT_OF_MEASURE.VOLUME.includes(inputUnitOfMeasure.toUpperCase())) {
            if (UNIT_OF_MEASURE.VOLUME.includes(targetUnitOfMeasure.toUpperCase())) {
                output = checkNumericValue(inputNumericalValue, studentResponse, problem[index].studentResponse);
            }
        }
        return { ...record, output };
    })
}