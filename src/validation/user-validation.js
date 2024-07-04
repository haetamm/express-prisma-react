import Joi from "joi";

const registerUserValidation = Joi.object({
    name: Joi.string().trim().max(100).required(),
    username: Joi.string().trim().alphanum().min(4).max(10).required(),
    email: Joi.string().trim().email().max(30).required(),
    password: Joi.string().trim().min(6).max(100).required(),
    role: Joi.string().trim().valid("ADMIN", "EMPLOYEE").required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const updateUserValidation = Joi.object({
    id: Joi.string().trim().required(),
    name: Joi.string().trim().max(100).required(),
    username: Joi.string().trim().alphanum().min(4).max(100).required(),
    email: Joi.string().trim().email().max(30).required(),
    password: Joi.string().trim().min(8).max(100).optional().allow(''),
    role: Joi.string().trim().valid("ADMIN", "EMPLOYEE").required(),
});

export {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation
}