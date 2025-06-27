import Product from "../models/Product.js";

const url = 'https://api.spoonacular.com/food/ingredients';

const extractNutrient = (foodNutrients, nutrientName) => {
    const nutrient = foodNutrients.find(n =>
        n.name.toLowerCase() === nutrientName.toLowerCase()
    );

    return nutrient ? nutrient.amount : 0;
};
export const productService = {
    async getProduct(productName) {
        const existingProducts = await Product.find({ name: new RegExp(`^${productName}$`, 'i') });
        
        if (existingProducts.length !== 0) {
            const returnedProducts = await Product.find({ name: { $regex: productName, $options: 'i' } });
            return returnedProducts;
        }

        const product = await fetch(`${url}/search?query=${productName}&apiKey=${process.env.SPOONACULAR_API_KEY}`);
        const productData = await product.json();
        
        if (productData.results.length === 0) {
            return;
            //TODO return something for no ID exist
        }

        const productId = productData.results[0].id;
        const productInfo = await fetch(`${url}/${productId}/information?amount=100&unit=g&apiKey=${process.env.SPOONACULAR_API_KEY}`);
        const productInfoData = await productInfo.json();

        const productById = await Product.findOne({ spoonacularId: productInfoData.id });
        console.log(productById);
        

        if (!productById) {
            const newProductDb = await Product.create({
                name: productInfoData.name,
                calories: extractNutrient(productInfoData.nutrition.nutrients, 'Calories'),
                carbohydrates: extractNutrient(productInfoData.nutrition.nutrients, 'Carbohydrates'),
                proteins: extractNutrient(productInfoData.nutrition.nutrients, 'Protein'),
                fats: extractNutrient(productInfoData.nutrition.nutrients, 'Fat'),
                spoonacularId: productInfoData.id,
                source: 'offApi',
                lastUpdated: new Date()
            });

            return [newProductDb];
        }

        return [productById];

    },
    async getAllProducts() {
        const allProducts = await Product.find();

        return allProducts;
    }
}