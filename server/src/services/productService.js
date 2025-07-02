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
    }
}