import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-midleware.js";
import {userRouter} from "../route/api.js";

export const web = express();
web.use(express.json());


web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Placeholder for React build directory
web.use(express.static(path.join(__dirname, '../../frontend/build')));

web.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});
