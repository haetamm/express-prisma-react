import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";

class UserRouter{

    constructor() {
        this.router = new express.Router();
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post('/users', authMiddleware, adminMiddleware, userController.register)
        this.router.get('/users', authMiddleware, adminMiddleware, userController.getAll);
        this.router.get('/users/:userId', authMiddleware, adminMiddleware, userController.getById);
        this.router.put('/users', authMiddleware, adminMiddleware, userController.update);
        this.router.delete('/users/:userId', authMiddleware, adminMiddleware, userController.delete);
    }

    getRouter() {
        return this.router;
    }

}

export const userRouter = new UserRouter().getRouter();