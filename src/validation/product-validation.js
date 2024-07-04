import Joi from "joi";

const registerProductValidation = Joi.object({
    name: Joi.string().trim().max(100).required(),
    price: Joi.number().min(1).required(),
    type: Joi.string().trim().max(10).required(),
});

const updateProductValidation = Joi.object({
    id: Joi.string().trim().required(),
    name: Joi.string().trim().max(100).required(),
    price: Joi.number().min(1).required(),
    type: Joi.string().trim().max(10).required(),
});

export {
    registerProductValidation,
    updateProductValidation
}