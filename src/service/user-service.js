import { validate } from "../validation/validation.js";
import {
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { ResponseError } from "../entities/response-error.js";
import { userRepository } from "../repository/user-respository.js";
import { userRolesRepository } from "../repository/user-roles-respository.js";
import { roleRepository } from "../repository/roles-repository.js";
import { prismaClient } from "../application/database.js";
import { securityService } from "./security-service.js";
import UserResponse from "../entities/user/user-response.js";

class UserService {
  async register({ body }) {
    const { name, username, email, password, role } = validate(
      registerUserValidation,
      body
    );
    try {
      const newUser = await prismaClient.$transaction(
        async (prismaTransaction) => {
          await this.findUserByUsername(username);
          const hashPassword = await securityService.passwordHash(password);

          const dataUser = {
            name,
            username,
            email,
            password: hashPassword,
          };

          const newUser = await userRepository.createUser(
            dataUser,
            prismaTransaction
          );

          const { id: roleId } = await roleRepository.findByRoleName(
            role,
            prismaTransaction
          );

          await userRolesRepository.addUserRole(
            newUser.id,
            roleId,
            prismaTransaction
          );
          return newUser;
        }
      );
      const user = await this.findUserById(newUser.id);
      return UserResponse.convert(user);
    } catch (error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        console.log(`Registration failed: ${error.message}`);
        throw new ResponseError(500, "Internal Server Error");
      }
    }
  }

  async update({ body }) {
    const {
      id: userId,
      name,
      username: usernameRequest,
      email,
      password,
    } = validate(updateUserValidation, body);
    const { id, username } = await this.findUserById(userId);
    if (username !== usernameRequest) {
      await this.findUserByUsername(usernameRequest);
    }

    let hashPassword;
    if (password) {
      hashPassword = await securityService.passwordHash(password);
    }

    const dataUserUpdate = {
      name,
      username: usernameRequest,
      email,
      password: hashPassword,
    };
    console.log(dataUserUpdate);
    const updatedUser = await userRepository.updateUserById(id, dataUserUpdate);
    return UserResponse.convert(updatedUser);
  }

  async getAll() {
    const users = await userRepository.getAllUser();
    return users.map(UserResponse.convert);
  }

  async getById({ params }) {
    const user = await this.findUserById(params.userId);
    return UserResponse.convert(user);
  }

  async delete({ params }) {
    const { id } = await this.findUserById(params.userId);
    const { name } = await userRepository.deleteById(id);
    return `user ${name} berhasil dihapus`;
  }

  async findUserByUsername(username) {
    const countUser = await userRepository.countByUsername(username);
    if (countUser > 0) {
      throw new ResponseError(400, `\"username\" already exists`);
    }
  }

  async findUserById(id) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new ResponseError(404, `\"user\" not found`);
    }
    return user;
  }

  async getCurrentUser({ user }) {
    console.log(user);
    const result = await this.findUserById(user.id);
    return UserResponse.convert(result);
  }
}

export const userService = new UserService();
