import { validate } from "../validation/validation.js";
import { ResponseError } from "../entities/response-error.js";
import { billRepository } from "../repository/bill-respository.js";
import { billValidation } from "../validation/bill-validation.js";
import { prismaClient } from "../application/database.js";
import { customerRepository } from "../repository/customer-respository.js";
import { productRepository } from "../repository/product-respository.js";
import { billDetailRepository } from "../repository/bill-detail-respository.js";
import BillResponse from "../entities/bill/bill-response.js";

class BillService {

    async register({ body, user }) {
        const billRequest = validate(billValidation, body);
        try {
            const newBill = await prismaClient.$transaction(async (prismaTransaction) => {
                const { customerId, billDetails } = billRequest;
                
                
                const customer = await customerRepository.findCustomerTransactionById(customerId, prismaTransaction);
                if (!customer) {
                    throw new ResponseError(404, `"\"customer\" not found`);
                }

                const productPriceMap = new Map();
                
                await Promise.all(billDetails.map(async ({ product }) => {
                    const productResult = await productRepository.findProductTransactionById(product.id, prismaTransaction);
                    if (!productResult) {
                        throw new ResponseError(404, `\"product\" not found`);
                    }
                    productPriceMap.set(product.id, productResult.price);
                }));

                const bill = await billRepository.createBill(user.id, customer.id, prismaTransaction);

                await Promise.all(billDetails.map(async (billDetail) => {
                    
                    const billDetailData = {
                        billId: bill.id,
                        productId: billDetail.product.id,
                        qty: billDetail.qty,
                        price: productPriceMap.get(billDetail.product.id)
                    }
                    await billDetailRepository.createBillDetail(billDetailData, prismaTransaction);
                }));

                return bill;
            })

            const billDetail = await this.findBillById(newBill.id);
            return BillResponse.convert(billDetail);
        } catch (error) {
            if (error instanceof ResponseError) {
                throw error;
            } else {
                console.log(`Registration failed: ${error.message}`)
                throw new ResponseError(500, "Internal Server Error");
            }
        }
    }

    async getAll () {
        const bills = await billRepository.getAllBill();
        return bills.map(BillResponse.convert);
    }

    async getById ({ params }) {
        const billDetail = await this.findBillById(params.billId);
        return BillResponse.convert(billDetail);
    }

    async findBillById(id) {
        const bill = await billRepository.findBillById(id);
        if (!bill) {
            throw new ResponseError(404, `\"bill\" not found`);
        }
        return bill;
    }
    
}

export const billService = new BillService();