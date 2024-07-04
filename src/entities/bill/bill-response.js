import CustomerResponse from '../customer/customer-response.js';
import UserResponse from '../user/user-response.js';
import ProductResponse from '../product/product-response.js';

class BillResponse {
    static convert({ id, billDate, updatedAt, customer, user, billDetail }) {
        return {
            id,
            billDate,
            customer: CustomerResponse.convert(customer),
            user: UserResponse.convert(user),
            billDetails: billDetail.map(detail => ({
                id: detail.id,
                product: ProductResponse.convert(detail.product),
                qty: detail.qty,
                price: detail.price,
                createdAt: detail.createdAt,
                updatedAt: detail.updatedAt,
            })),
            updatedAt
        };
    }
}

export default BillResponse;
