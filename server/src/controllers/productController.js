import { Router } from "express";

import { productService } from "../services/productService.js";

const productController = Router();

productController.get('/', async (req, res) => {
    const query = req.query.search;

    if (!query) {
        return res.status(400).json({ success: false, message: "Missing product name parameter." });
    }

    try {
        const products = await productService.getProduct(query);

        return res.status(200).json(products);
    } catch (err) {
        console.log('Error in search products', err);

        return res.status(500).json({ success: false, message: 'Server Error' });
    }


});

export default productController;