import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least 2 characters long']
    },
    calories: {
        type: Number,
        required: [true, 'Calories are required'],
        min: [0, 'Calories cannot be less than 0']
    },
    carbohydrates: {
        type: Number,
        required: [true, 'Carbohydrates are required'],
        min: [0, 'Carbohydrates cannot be less than 0']
    },
    proteins: {
        type: Number,
        required: [true, 'Proteins are required'],
        min: [0, 'Proteins cannot be less than 0']
    },
    fats: {
        type: Number,
        required: [true, 'Fats are required'],
        min: [0, 'Fats cannot be less than 0']
    },
    spoonacularId: {
        type: Number,
        unique: true
    },
    source: {
        type: String,
        enum: ['offApi', 'admin'],
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Product = model('Product', productSchema);

export default Product;