import { Router } from "express";

import { productService } from "../services/productService.js";

const productController = Router();

productController.get('/', async (req, res) => {
    const query = req.query.search;

    if (!query) {

        const allProducts = await productService.getAllProducts();
        return res.status(200).json(allProducts);
    }

    try {
        const products = await productService.getProducts(query);

        return res.status(200).json(products);
    } catch (err) {
        console.log('Error in search products', err);

        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

productController.get('/:productId', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        return res.status(200).json(product);
    } catch (err) {
        console.log('Error in fetch product', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

productController.post('/add-product-to-daily/:productId', async (req, res) => {
    try {
        const user = req.user._id;
        const { quantity } = req.body;
        const { productId } = req.params.productId;

        const product = await productService.getProductById(productId);
        const dailyIntake = await productService.addProductToDaily(user.id, productId, quantity);

        return res.status(200).json(dailyIntake);
    } catch (err) {
        console.log('Error in add product to daily intake', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default productController;