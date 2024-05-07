import express from "express";
import userController from "../controller/user-controller.js";

class PublicRouter {

    constructor() {
        this.router = new express.Router();
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post('/', userController.register);
        this.router.post('/login', userController.login);
    }

    getRouter() {
        return this.router;
    }
    
}

export const publicRouter = new PublicRouter().getRouter();