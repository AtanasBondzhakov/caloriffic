import { model, Schema, Types } from "mongoose";

const bodyMetricsCalculationSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    bmi: Number,
    bfk: Number,
    lbm: Number,
    bmr: Number,
    dci: Number,
    dit: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BodyMetricsCalculation = model('BodyMetricsCalculation', bodyMetricsCalculationSchema);

export default BodyMetricsCalculation;