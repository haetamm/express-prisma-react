import { validate } from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import { ResponseError } from "../error/response-error.js";
import { userRepository } from "../repository/user-respository.js";
import { authService } from "./auth-service.js";

class UserService {

    async register(request) {
        const user = validate(registerUserValidation, request);
    
        const countUser = await userRepository.countByUsername(user.username);
    
        if (countUser === 1) {
            throw new ResponseError(400, "Username already exists");
        }
    
        user.password = await authService.passwordHash(user.password);
    
        return userRepository.createUser(user);
    }
    
    async login (request) {
        const loginRequest = validate(loginUserValidation, request);
    
        const user = await userRepository.findUserByUsername(loginRequest.username);
        
        if (!user) {
            throw new ResponseError(401, "Username or password wrong");
        }
        
        const isPasswordValid = await authService.passwordCompare(loginRequest.password, user.password);

        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password wrong");
        }
    
        const token = await authService.generateToken({ username: user.username, name: user.name });
        return userRepository.updateUserToken(user.username, token);
    }

    async update(request) {
        const user = validate(updateUserValidation, request);

        // const totalUserInDatabase = await userRepository.countByUsername(user.username);

        // if (totalUserInDatabase !== 1) {
        //     throw new ResponseError(404, "user is not found");
        // }

        const data = {};
        if (user.name) {
            data.name = user.name;
        }
        if (user.password) {
            data.password = await authService.passwordHash(user.password);
        }

        return await userRepository.updateUserByUsername(user.username, data)
    }
    
    async get (username) {
        username = validate(getUserValidation, username);
    
        const user = await userRepository.getUserByUsername(username);
    
        if (!user) {
            throw new ResponseError(404, "user is not found");
        }
    
        return user;
    }
    
    async logout(username) {
        username = validate(getUserValidation, username);

        const user = await userRepository.getUserByUsername(username);

        if (!user) {
            throw new ResponseError(404, "user is not found");
        }

        return await userRepository.deleteTokenUserByUsername(user.username);
    }
    
}

export const userService = new UserService();