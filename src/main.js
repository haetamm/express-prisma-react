import dotenv from 'dotenv';
dotenv.config();
import setupStaticFiles from './application/staticFiles.js';

import Web from "./application/web.js";
import { logger } from "./application/logging.js";

const port = process.env.PORT || 3000;
const app = new Web();

setupStaticFiles(app.web);

app.listen(port, () => {
    logger.info(`App use port ${port}`);
});