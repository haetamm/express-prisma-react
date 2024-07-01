class CustomerResponse {
    static convert({ id, name, phoneNumber, address, createdAt, updatedAt }) {
        return {
            id,
            name,
            phoneNumber,
            address,
            createdAt,
            updatedAt,
        };
    }
}

export default CustomerResponse;