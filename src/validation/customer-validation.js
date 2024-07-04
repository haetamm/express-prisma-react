import Joi from "joi";

const registerCustomerValidation = Joi.object({
    name: Joi.string().trim().max(100).required(),
    phoneNumber: Joi.string().trim().max(20).required(),
    address: Joi.string().trim().max(225).required(),
});

const updateCustomerValidation = Joi.object({
    id: Joi.string().trim().required(),
    name: Joi.string().trim().max(100).required(),
    phoneNumber: Joi.string().trim().max(20).required(),
    address: Joi.string().trim().max(225).required(),
});

export {
    registerCustomerValidation,
    updateCustomerValidation
}