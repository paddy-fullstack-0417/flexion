import mongoose from "mongoose";
import { OUTPUT_TYPE } from "../config/enum";

class ProblemModel {
    constructor({
        _id = new mongoose.Types.ObjectId(),
        inputNumericalValue,
        inputUnitOfMeasure,
        targetUnitOfMeasure,
        studentResponse,
        output = OUTPUT_TYPE.PENDING
    }) {
        this._id = _id;
        this.inputNumericalValue = inputNumericalValue;
        this.inputUnitOfMeasure = inputUnitOfMeasure;
        this.targetUnitOfMeasure = targetUnitOfMeasure;
        this.studentResponse = studentResponse;
        this.output = output;
    }
}

export default ProblemModel;