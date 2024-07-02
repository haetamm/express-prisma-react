import Joi from "joi";

const billValidation = Joi.object({
    customerId: Joi.string().required().messages({
        'any.required': 'Customer is required',
        'string.empty': 'Customer is required'
    }),
    billDetails: Joi.array().items(
        Joi.object({
            product: Joi.object({
                id: Joi.string().required().messages({
                    'any.required': 'Product is required',
                    'string.empty': 'Product is required'
                })
            }),
            qty: Joi.number().integer().min(1).required().messages({
                'number.base': 'Quantity must be a number',
                'number.integer': 'Quantity must be an integer',
                'number.min': 'Quantity must be at least 1',
                'any.required': 'Quantity is required'
            })
        })
    ).min(1).required().messages({
        'array.min': 'At least one product is required',
        'array.base': 'Bill details must be an array',
        'any.required': 'Bill details are required'
    })
});


export {
    billValidation,
}