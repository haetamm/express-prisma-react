import { prismaClient } from "../application/database.js";

class BillRepository {
    async createBill(userId, customerId, prismaTransaction) {
        return prismaTransaction.bill.create({
            data: {
                userId: userId,
                customerId: customerId,
            }
        });
    }

    async getAllBill() {
        return prismaClient.bill.findMany({
            include: {
                customer: true,
                user: {
                    include: {
                        roleUser: {
                            include: {
                                role: true
                            }
                        }
                    }
                },
                billDetail: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }


    async findBillById(id) {
        return prismaClient.bill.findFirst({
            where: { id: id },
            include: {
                customer: true,
                user: {
                    include: {
                        roleUser: {
                            include: {
                                role: true
                            }
                        }
                    }
                },
                billDetail: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }
}

export const billRepository = new BillRepository();
