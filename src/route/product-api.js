import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/product-controller.js";

class ProductRoute{

    constructor() {
        this.router = new express.Router();
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post('/products', authMiddleware, productController.register)
        this.router.get('/products', authMiddleware, productController.getAll);
        this.router.get('/products/:productId', authMiddleware, productController.getById);
        this.router.put('/products/:productId', authMiddleware, productController.update);
        this.router.delete('/products/:productId', authMiddleware, productController.delete);
    }

    getRouter() {
        return this.router;
    }

}

export const productRoute = new ProductRoute().getRouter();