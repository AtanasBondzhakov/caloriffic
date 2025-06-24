import Product from "../models/Product.js";

const url = 'https://api.nal.usda.gov/fdc/v1/foods';

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

const extractNutrient = (foodNutrients, nutrientName) => {
    const nutrient = foodNutrients.find(n =>
        n.nutrientName.toLowerCase().includes(nutrientName.toLowerCase())
    );

    return nutrient ? nutrient.value : 0;
}

export const productService = {
    async getProduct(productName) {
        const existingProducts = await Product.find({ name: { $regex: productName, $options: 'i' } });

        console.log(existingProducts.length);


        if (existingProducts.length === 0) {
            const result = await fetch(`${url}/search?query=${productName}&api_key=${process.env.USDA_API_KEY}`);
            const data = await result.json();

            const foods = data.foods || [];

            if (foods.length === 0) {
                return [];
            }

            const savedProducts = await Promise.all(
                foods.map(async product => {
                    const { description, foodNutrients, foodCategory, fdcId } = product;

                    const newProduct = await Product.create({
                        name: description,
                        fdcId,
                        calories: extractNutrient(foodNutrients, 'Energy'),
                        carbohydrates: extractNutrient(foodNutrients, 'Carbohydrate'),
                        proteins: extractNutrient(foodNutrients, 'Protein'),
                        fats: extractNutrient(foodNutrients, 'Fat'),
                        category: categoryMap[foodCategory] || 'Other',
                        source: 'usda',
                        lastUpdated: new Date()
                    });

                    return newProduct;
                })
            );
            return savedProducts;
        }
        return existingProducts;
    }
}