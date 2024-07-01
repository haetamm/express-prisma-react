import { prismaClient } from "../application/database.js";

class CustomerRepository {
    
    async createCustomer(data) {
        return prismaClient.customer.create({
            data
        });
    }

    async getAllCustomer() {
        return prismaClient.customer.findMany({
            where: { deletedAt: null }
        })
    }

    async updateCustomerById(id, data) {
        return prismaClient.customer.update({
            where: { id },
            data: data,
        })
    }

    async findCustomerById(id) {
        return prismaClient.customer.findFirst({
            where: { id, deletedAt: null },
        })
    }

    async deleteById(id) {
        return prismaClient.customer.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    
}

export const customerRepository = new CustomerRepository();
