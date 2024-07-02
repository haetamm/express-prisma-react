import { validate } from "../validation/validation.js";
import { loginUserValidation } from "../validation/user-validation.js";
import { ResponseError } from "../entities/response-error.js";
import { userRepository } from "../repository/user-respository.js";
import { securityService } from "./security-service.js";


class AuthService {

    async login ({ body }) {
        const loginRequest = validate(loginUserValidation, body);
        const user = await userRepository.findUserByUsername(loginRequest.username);
        if (!user) {
            throw new ResponseError(400, `\"username\" or \"password\" wrong`);
        }

        const { id, username, password, roleUser } = user
        const isPasswordValid = await securityService.passwordCompare(loginRequest.password, password);
        if (!isPasswordValid) {
            throw new ResponseError(400, `\"username\" or \"password\" wrong`);
        }
    
        const token = await securityService.generateToken({ userId: id, role: roleUser[0].role.role });
        return userRepository.updateUserToken(username, token);
    }

    async logout({ user }) {
        const { name } = await userRepository.deleteTokenUserById(user.id);
        return `Logout berhasil ${name}`
    }
    
}

export const authService = new AuthService();