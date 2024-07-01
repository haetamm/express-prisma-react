import { prismaClient } from "../application/database.js";

class UserRepository {

    async countByUsername(username) {
        return prismaClient.user.count({
            where: { username }
        });
    }

    async createUser(userData, prismaTransaction) {
        return prismaTransaction.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                username: true,
            }
        });
    }

    async getAllUser() {
        return prismaClient.user.findMany({
            where: {
                roleUser: {
                    none: {
                        role: {
                            role:'ADMIN'
                        }
                    }
                },
                deletedAt: null
            },
            include: {
                roleUser: {
                    include: {
                        role: true
                    }
                }
            }
        })
    }

    async updateUserById(id, data) {
        return prismaClient.user.update({
            where: { id },
            data: data,
            include: {
                roleUser: {
                    include: {
                        role: true
                    }
                }
            }
        })
    }

    async findUserById(id) {
        return prismaClient.user.findFirst({
            where: { id, deletedAt: null },
            include: {
                roleUser: {
                    include: {
                        role: true
                    }
                }
            }
        })
    }

    async deleteById(id) {
        return prismaClient.user.update({
            where: { id },
            data: { deletedAt: new Date() },
            select: {
                id: true,
                username: true,
                deletedAt: true
            }
        });
    }

    async findUserByUsername(username) {
        return prismaClient.user.findFirst({
            where: { username, deletedAt: null },
            include: {
                roleUser: {
                    include: {
                        role: true
                    }
                }
            }
        });
    }

    async findUserLogin(id, token) {
        return prismaClient.user.findUnique({
            where: {
                id,
                token
            },
            include: {
                roleUser: {
                    include: {
                        role: true
                    }
                }
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

    async deleteTokenUserById(id) {
        return prismaClient.user.update({
            where: { id },
            data: { token: null },
            select: {
                name: true,
            }
        })
    }
    
}

export const userRepository = new UserRepository();
