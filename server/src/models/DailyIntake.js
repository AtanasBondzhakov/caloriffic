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
        type: Date,
        required: true,
    },
    products: [productEntrySchema],
    expireAt: { type: Date }
},
    { timestamps: true }
);

dailyIntakeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

dailyIntakeSchema.pre("save", function (next) {
    if (!this.expireAt) {
        const createdAt = this.createdAt || new Date();

        const expireDate = new Date(createdAt);
        expireDate.setDate(expireDate.getDate() + 7);

        expireDate.setHours(0, 0, 0, 0);

        this.expireAt = expireDate;
    }
    next();
});

const DailyIntake = model('DailyIntake', dailyIntakeSchema);

export default DailyIntake;