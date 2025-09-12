import { model, Schema, Types } from "mongoose";

const productEntrySchema = new Schema({
    productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    calories: {
        type: Number,
        required: true,
    },
    carbohydrates: {
        type: Number,
    },
    proteins: {
        type: Number,
    },
    fats: {
        type: Number,
    }
});

const dailyIntakeSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    products: [productEntrySchema],
    expireAt: {
        type: Date,
        required: true
    }
},
    { timestamps: true }
);

dailyIntakeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const DailyIntake = model('DailyIntake', dailyIntakeSchema);

export default DailyIntake;