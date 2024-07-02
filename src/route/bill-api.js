import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import billController from "../controller/bill-controller.js";

class BillRoute{

    constructor() {
        this.router = new express.Router();
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post('/bills', authMiddleware, billController.register);
        this.router.get('/bills', authMiddleware, billController.getAll);
        this.router.get('/bills/:billId', authMiddleware, billController.getById);
    }

    getRouter() {
        return this.router;
    }

}

export const billRoute = new BillRoute().getRouter();