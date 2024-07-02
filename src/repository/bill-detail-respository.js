class BillDetailRepository {
    async createBillDetail(data, prismaTransaction) {
        return prismaTransaction.billDetail.create({
            data
        });
    }
}

export const billDetailRepository = new BillDetailRepository();
