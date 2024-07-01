import { validate } from "../validation/validation.js";
import {
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import { ResponseError } from "../responseHandler/response-error.js";
import { userRepository } from "../repository/user-respository.js";
import { userRolesRepository } from "../repository/user-roles-respository.js";
import { roleRepository } from "../repository/roles-repository.js";
import { prismaClient } from "../application/database.js";
import { securityService } from "./security-service.js";
import UserResponse from "../entities/user/user-response.js";

class UserService {

    async register(request) {
        const { name, username, email, password, role } = validate(registerUserValidation, request);

        try {
            const newUser = await prismaClient.$transaction(async (prismaTransaction) => {

                await this.findUserByUsername(username)

                const hashPassword = await securityService.passwordHash(password);

                const dataUser = {
                    name,
                    username,
                    email,
                    password: hashPassword
                }

                const newUser = await userRepository.createUser(dataUser, prismaTransaction);

                const { id: roleId } = await roleRepository.findByRoleName(role, prismaTransaction);
                
                await userRolesRepository.addUserRole(newUser.id, roleId, prismaTransaction);

                return newUser;
            });

            return newUser;
        } catch (error) {
            if (error instanceof ResponseError) {
                throw error;
            } else {
                console.log(`Registration failed: ${error.message}`)
                throw new ResponseError(500, "Internal Server Error");
            }
        }
    }
    

    async update({ body, params }) {
        const { name, username: usernameRequest, email, password } = validate(updateUserValidation, body);

        const { id, username } = await this.findUserById(params.userId)

        if (username !== usernameRequest) {
            await this.findUserByUsername(usernameRequest)
        }

        let hashPassword;
        if (password) {
            hashPassword = await securityService.passwordHash(password);
        }
        
        const dataUserUpdate = {
            name,
            username: usernameRequest,
            email,
            password: hashPassword
        }
        const updatedUser = await userRepository.updateUserById(id, dataUserUpdate);
        return UserResponse.convert(updatedUser)
    }

    async getAll () {
        const users = await userRepository.getAllUser()
    
        return users.map(UserResponse.convert)
    }

    async getById ({ params }) {
        const user = await this.findUserById(params.userId)
    
        return UserResponse.convert(user)
    }

    async delete({ params }) {
        const { id } = await this.findUserById(params.userId)
        await userRepository.deleteById(id)
        return `user berhasil dihapus`
    }

    async findUserByUsername (username) {
        const countUser = await userRepository.countByUsername(username);

        if (countUser > 0) {
            throw new ResponseError(400, "Username already exists");
        }
    }

    async findUserById(id) {
        const user = await userRepository.findUserById(id)
        if (!user) {
            throw new ResponseError(404, "User not found");
        }
        return user
    }
    
}

export const userService = new UserService();