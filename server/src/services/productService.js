import DailyIntake from "../models/DailyIntake.js";
import Product from "../models/Product.js";

const url = 'https://api.spoonacular.com/food/ingredients';

const extractNutrient = (foodNutrients, nutrientName) => {
    const nutrient = foodNutrients.find(n =>
        n.name.toLowerCase() === nutrientName.toLowerCase()
    );

    return nutrient ? nutrient.amount : 0;
};
export const productService = {
    async getProducts(productName) {
        const existingProduct = await Product.findOne({ name: new RegExp(`^${productName}$`, 'i') });

        if (existingProduct) {
            return [existingProduct];
        }

        const products = await fetch(`${url}/search?query=${productName}&number=30&apiKey=${process.env.SPOONACULAR_API_KEY}`);
        const productData = await products.json();

        if (productData.results.length === 0) {
            return [];
        }

        return productData.results;
    },
    async getAllProducts() {
        const allProducts = await Product.find();

        return allProducts;
    },
    async getProductById(productId) {
        const productById = await Product.findOne({ id: productId });

        if (!productById) {
            const product = await fetch(`${url}/${productId}/information?amount=100&unit=g&apiKey=${process.env.SPOONACULAR_API_KEY}`);
            const productData = await product.json();

            const newProductDb = await Product.create({
                name: productData.name,
                calories: extractNutrient(productData.nutrition.nutrients, 'Calories'),
                carbohydrates: extractNutrient(productData.nutrition.nutrients, 'Carbohydrates'),
                proteins: extractNutrient(productData.nutrition.nutrients, 'Protein'),
                fats: extractNutrient(productData.nutrition.nutrients, 'Fat'),
                id: productData.id,
                source: 'spoonApi',
                lastUpdated: new Date()
            });

            return newProductDb;
        }

        return productById;
    },
    async addProductToDaily(userId, productId, quantity) {
        const product = await Product.findOne({ id: productId });

        if (!product) {
            throw new Error('Product not found in database');
        }

        const factor = quantity / 100;

        const productEntry = {
            productId: product._id,
            name: product.name,
            quantity,
            calories: Math.round(product.calories * factor),
            proteins: Math.round(product.proteins * factor),
            carbohydrates: Math.round(product.carbohydrates * factor),
            fats: Math.round(product.fats * factor),
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = String(today.getDate()).padStart(2, '0') + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            today.getFullYear();

        const expireAt = new Date(today);
        expireAt.setDate(expireAt.getDate() + 7);

        const dailyIntake = await DailyIntake.findOneAndUpdate(
            { owner: userId, date: todayString },
            {
                $push: { products: productEntry },
                $setOnInsert: { expireAt }
            },
            { new: true, upsert: true }
        );

        return dailyIntake;
    }
}