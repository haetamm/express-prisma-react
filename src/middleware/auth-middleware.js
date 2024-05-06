import { prismaClient } from "../application/database.js";
import { authService } from "../service/auth-service.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader  = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({
            errors: "Unauthorized -  No token provided"
        }).end();
    } else {
        const token = authHeader.split(' ')[1]; // Mengasumsikan format 'Bearer token_here'
        if (!token) {
            res.status(401).json({
                errors: "Unauthorized - Malformed token"
            }).end();
            return;
        }

        try {
            const decoded = await authService.decodeToken(token, process.env.JWT_SECRET_KEY);
            const user = await prismaClient.user.findUnique({
                where: {
                    username: decoded.user.username
                }
            });

            if (!user) {
                res.status(401).json({
                    errors: "Unauthorized - User not found"
                }).end();
            } else {
                req.user = user; 
                next();
            }
        } catch (err) {
            res.status(401).json({
                errors: "Unauthorized - Invalid token"
            }).end();
        }
    }
}