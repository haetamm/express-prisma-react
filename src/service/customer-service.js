import { validate } from "../validation/validation.js";
import { ResponseError } from "../entities/response-error.js";
import { registerCustomerValidation, updateCustomerValidation } from "../validation/customer-validation.js";
import CustomerResponse from "../entities/customer/customer-response.js";
import { customerRepository } from "../repository/customer-respository.js";

class CustomerService {

    async register({ body }) {
        const customerRequest = validate(registerCustomerValidation, body);
        try {
            const newCustomer = await customerRepository.createCustomer(customerRequest);
            return CustomerResponse.convert(newCustomer);
        } catch (error) {
            console.log(`Registration customer failed: ${error.message}`)
            throw new ResponseError(500, "Internal Server Error");
        }
    }
    

    async update({ body }) {
        const requestCustomer = validate(updateCustomerValidation, body);
        const { id } = await this.findCustomerById(requestCustomer.id)
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