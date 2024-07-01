import express from "express";
import { errorMiddleware } from "../middleware/error-midleware.js";
import { authRouter } from "../route/auth-api.js";
import { userRouter } from "../route/user-api.js";
import { productRoute } from "../route/product-api.js";
import { customerRoute } from "../route/customer-api.js";

class Web {

    constructor() {
        this.web = express();
        this.web.use(express.json());
        this.web.use(express.urlencoded({ extended: true }));
        this.setupRoutes();
    }

    setupRoutes() {
        this.web.use('/api/v1/auth', authRouter);
        this.web.use('/api/v1', userRouter);
        this.web.use('/api/v1', productRoute);
        this.web.use('/api/v1', customerRoute);
        this.web.use(errorMiddleware);
    }

    listen(port, callback) {
        return this.web.listen(port, callback);
    }

    close(server, callback) {
        server.close(callback);
    }

}

export default Web;

