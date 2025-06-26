import Product from "../models/Product.js";

const url = 'https://api.spoonacular.com/food/ingredients';

const categoryMap = {
    "Dairy and Egg Products": "Dairy",
    "Fruits and Fruit Juices": "Fruits",
    "Vegetables and Vegetable Products": "Vegetables",
    "Cereal Grains and Pasta": "Grains",
    "Beef Products": "Meat",
    "Pork Products": "Meat",
    "Poultry Products": "Meat",
    "Finfish and Shellfish Products": "Seafood",
    "Legumes and Legume Products": "Legumes",
    "Nut and Seed Products": "Nuts & Seeds",
    "Sweets": "Sweets",
    "Snacks": "Snacks",
    "Beverages": "Beverages"
};

const extractNutrient = (foodNutrients, nutrientName, unit) => {
    const nutrient = foodNutrients.find(n =>
        n.nutrientName.toLowerCase().includes(nutrientName.toLowerCase()) && n.unitName.toLowerCase() === unit.toLowerCase()
    );

    return nutrient ? nutrient.value : 0;
}

export const productService = {
    async getProduct(productName) {
        // const existingProducts = await Product.find({ name: { $regex: productName, $options: 'i' } });
        const encodedQuery = encodeURIComponent(`${productName}`);

        // if (existingProducts.length === 0) {
        const product = await fetch(`${url}/search?query=${productName}&apiKey=${process.env.SPOONACULAR_API_KEY}`);
        const data = await product.json();
        const productId = data.results[0].id;

        const productInfo = await fetch(`${url}/${productId}/information?amount=100&unit=g&apiKey=${process.env.SPOONACULAR_API_KEY}`);
        const productInfoData = await productInfo.json();
        console.log(productInfoData);
        // const data = await result.json();

        // const foods = data.foods || [];

        // if (foods.length === 0) {
        //     return [];
        // }

        // const savedProducts = await Promise.all(
        //     foods.map(async product => {
        //         const { description, foodNutrients, foodCategory, fdcId } = product;

        //         const newProduct = await Product.create({
        //             name: description,
        //             fdcId,
        //             calories: extractNutrient(foodNutrients, 'Energy', 'kcal'),
        //             carbohydrates: extractNutrient(foodNutrients, 'Carbohydrate', 'g'),
        //             proteins: extractNutrient(foodNutrients, 'Protein', 'g'),
        //             fats: extractNutrient(foodNutrients, 'Fat', 'g'),
        //             category: categoryMap[foodCategory] || 'Other',
        //             source: 'usda',
        //             lastUpdated: new Date()
        //         });

        //         return newProduct;
        //     })
        // );
        // return savedProducts;
    }
    // return existingProducts;
}
// }