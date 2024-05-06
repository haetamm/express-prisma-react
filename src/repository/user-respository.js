import { prismaClient } from "../application/database.js";

class UserRepository {

    async countByUsername(username) {
        return prismaClient.user.count({
            where: { username }
        });
    }

    async createUser(userData) {
        return prismaClient.user.create({
            data: userData,
            select: {
                username: true,
                name: true
            }
        });
    }

    async findUserByUsername(username) {
        return prismaClient.user.findUnique({
            where: { username },
            select: {
                username: true,
                password: true,
            }
        });
    }

    async getUserByUsername(username) {
        return prismaClient.user.findUnique({
            where: { username },
            select: {
                username: true,
                name: true
            }
        });
    }

    async updateUserToken(username, token) {
        return prismaClient.user.update({
            where: { username },
            data: { token },
            select: {
                token: true
            }
        });
    }

    async deleteTokenUserByUsername(username) {
        return prismaClient.user.update({
            where: {
                username: username
            },
            data: {
                token: null
            },
            select: {
                username: true
            }
        })
    }

    async updateUserByUsername(username, data) {
        return prismaClient.user.update({
            where: {
                username: username
            },
            data: data,
            select: {
                username: true,
                name: true
            }
        })
    }
    
}

export const userRepository = new UserRepository();
