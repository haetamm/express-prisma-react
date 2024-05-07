import express from "express";
import {errorMiddleware} from "../middleware/error-midleware.js";
import {publicRouter} from "../route/public-api.js";
import {userRouter} from "../route/user-api.js";

class Web {

    constructor() {
        this.web = express();
        this.web.use(express.json());
        this.web.use(express.urlencoded({ extended: true }));
        this.setupRoutes();
    }

    setupRoutes() {
        this.web.use('/api/users', publicRouter);
        this.web.use('/api/users', userRouter);
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

