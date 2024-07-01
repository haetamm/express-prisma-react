import Joi from "joi";

const customerValidation = Joi.object({
    name: Joi.string().trim().max(100).required(),
    phoneNumber: Joi.string().trim().max(20).required(),
    address: Joi.string().trim().max(225).required(),
});


export {
    customerValidation,
}