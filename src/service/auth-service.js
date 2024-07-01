import { validate } from "../validation/validation.js";
import {
    loginUserValidation,
} from "../validation/user-validation.js";
import { ResponseError } from "../responseHandler/response-error.js";
import { userRepository } from "../repository/user-respository.js";
import { securityService } from "./security-service.js";


class AuthService {

    async login (request) {
        const loginRequest = validate(loginUserValidation, request);
    
        const user = await userRepository.findUserByUsername(loginRequest.username);
        
        if (!user) {
            throw new ResponseError(401, "Username or password wrong");
        }

        const { id, username, password, roleUser } = user
        
        const isPasswordValid = await securityService.passwordCompare(loginRequest.password, password);

        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password wrong");
        }
    
        const token = await securityService.generateToken({ userId: id, role: roleUser[0].role.role.toLowerCase() });
        return userRepository.updateUserToken(username, token);
    }

    async logout(id) {
        const { id: userId } = await userRepository.findUserById(id)
        const { name } = await userRepository.deleteTokenUserById(userId);
        return `Logout berhasil ${name}`
    }
    
}

export const authService = new AuthService();