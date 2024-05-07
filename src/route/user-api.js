import express from "express";
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

class UserRouter{

    constructor() {
        this.router = new express.Router();
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.get('/current', authMiddleware, userController.get);
        this.router.patch('/current', authMiddleware, userController.update);
        this.router.delete('/logout', authMiddleware, userController.logout);
    }

    getRouter() {
        return this.router;
    }

}

export const userRouter = new UserRouter().getRouter();