import { validate } from "../validation/validation.js";
import { ResponseError } from "../responseHandler/response-error.js";
import { productValidation } from "../validation/product-validation.js";
import { productRepository } from "../repository/product-respository.js";
import ProductResponse from "../entities/product/product-response.js";

class ProductService {

    async register(request) {
        const productRequest = validate(productValidation, request);
        try {
            const newProduct = await productRepository.createProduct(productRequest);
            return ProductResponse.convert(newProduct);
        } catch (error) {
            console.log(`Registration product failed: ${error.message}`)
            throw new ResponseError(500, "Internal Server Error");
        }
    }
    
    async update({ body, params }) {
        const requestProduct = validate(productValidation, body);
        const { id } = await this.findProductById(params.productId)
        const updatedProduct = await productRepository.updateProductById(id, requestProduct);
        return ProductResponse.convert(updatedProduct)
    }

    async getAll () {
        const products = await productRepository.getAllProduct()
    
        return products.map(ProductResponse.convert)
    }

    async getById ({ params }) {
        const product = await this.findProductById(params.productId)
    
        return ProductResponse.convert(product)
    }

    async delete({ params }) {
        const { id } = await this.findProductById(params.productId)
        await productRepository.deleteById(id)
        return `product berhasil dihapus`
    }

    async findProductById(id) {
        const product = await productRepository.findProductById(id)
        if (!product) {
            throw new ResponseError(404, "Product not found");
        }
        return product
    }
    
}

export const productService = new ProductService();