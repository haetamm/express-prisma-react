class ProductResponse {
    static convert({ id, name, price, type, createdAt, updatedAt }) {
        return {
            id,
            name,
            price,
            type,
            createdAt,
            updatedAt,
        };
    }
}

export default ProductResponse;