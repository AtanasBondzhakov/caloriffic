import { Router } from "express";

import { productService } from "../services/productService.js";

const productController = Router();

productController.get('/:productName', async (req, res) => {
    const query = req.params.productName;

    if (!query) {
        return res.status(400).json({ success: false, message: "Missing product name parameter." });
    }

    const products = await productService.getProduct(query);

    return products

});

export default productController;