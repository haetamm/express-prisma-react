import { ResponseSuccess } from "../entities/response-success.js";
import { authService } from "../service/auth-service.js";

class AuthController {

    async login(req, res, next) {
        try {
            const result = await authService.login(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async logout (req, res, next) {
        try {
            const result = await authService.logout(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

}

export default new AuthController();