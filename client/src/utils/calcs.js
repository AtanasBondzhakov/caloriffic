export const totalsCalc = (products) => {
    const totals = products.reduce((acc, product) => {
        acc.quantity += product.quantity;
        acc.calories += product.calories;
        acc.carbohydrates += product.carbohydrates;
        acc.proteins += product.proteins;
        acc.fats += product.fats;

        return acc;
    }, { quantity: 0, calories: 0, carbohydrates: 0, proteins: 0, fats: 0 }); 

    return totals;
};