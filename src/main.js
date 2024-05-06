import dotenv from 'dotenv';
dotenv.config();

import { web } from "./application/web.js";
import { logger } from "./application/logging.js";



const port = 3000;
web.listen(port, () => {
    logger.info(`App use port ${port}`);
});