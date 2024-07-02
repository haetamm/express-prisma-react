import { ResponseJson } from "../entities/response-json.js";

export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        const response = new ResponseJson(401, "Unauthorized - Not authenticated");
        return res.status(401).json(response).end();
    }

    if (req.user.roleUser[0].role.role !== 'ADMIN') {
        const response = new ResponseJson(403, "Access denied!!");
        return res.status(403).json(response).end();
    }

    next();
};
