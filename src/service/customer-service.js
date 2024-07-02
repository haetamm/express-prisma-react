import { validate } from "../validation/validation.js";
import { ResponseError } from "../entities/response-error.js";
import { customerValidation } from "../validation/customer-validation.js";
import CustomerResponse from "../entities/customer/customer-response.js";
import { customerRepository } from "../repository/customer-respository.js";

class CustomerService {

    async register({ body }) {
        const customerRequest = validate(customerValidation, body);
        try {
            const newCustomer = await customerRepository.createCustomer(customerRequest);
            return CustomerResponse.convert(newCustomer);
        } catch (error) {
            console.log(`Registration customer failed: ${error.message}`)
            throw new ResponseError(500, "Internal Server Error");
        }
    }
    

    async update({ body, params }) {
        const requestCustomer = validate(customerValidation, body);
        const { id } = await this.findCustomerById(params.customerId)
        const updatedCustomer = await customerRepository.updateCustomerById(id, requestCustomer);
        return CustomerResponse.convert(updatedCustomer)
    }

    async getAll () {
        const customers = await customerRepository.getAllCustomer()
        return customers.map(CustomerResponse.convert)
    }

    async getById ({ params }) {
        const customer = await this.findCustomerById(params.customerId)
        return CustomerResponse.convert(customer)
    }

    async delete({ params }) {
        const { id } = await this.findCustomerById(params.customerId)
        const { name } = await customerRepository.deleteById(id)
        return `customer ${name} berhasil dihapus`
    }

    async findCustomerById(id) {
        const customer = await customerRepository.findCustomerById(id)
        if (!customer) {
            throw new ResponseError(404, `\"customer\" not found`);
        }
        return customer
    }
    
}

export const customerService = new CustomerService();