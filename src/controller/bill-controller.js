import { ResponseSuccess } from "../entities/response-success.js";
import { billService } from "../service/bill-service.js";

class BillController {

    async register(req, res, next) {
        try {
            const result = await billService.register(req);
            const response = new ResponseSuccess(201, result);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async getAll(req, res, next) {
        try {
            const result = await billService.getAll();
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        try {
            const result = await billService.getById(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export default new BillController();