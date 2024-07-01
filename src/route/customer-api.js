import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import customerController from "../controller/customer-controller.js";

class CustomerRoute{

    constructor() {
        this.router = new express.Router();
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post('/customers', authMiddleware, customerController.register);
        this.router.get('/customers', authMiddleware, customerController.getAll);
        this.router.get('/customers/:customerId', authMiddleware, customerController.getById);
        this.router.put('/customers/:customerId', authMiddleware, customerController.update);
        this.router.delete('/customers/:customerId', authMiddleware, customerController.delete);
    }

    getRouter() {
        return this.router;
    }

}

export const customerRoute = new CustomerRoute().getRouter();