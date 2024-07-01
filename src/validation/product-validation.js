import Joi from "joi";

const productValidation = Joi.object({
    name: Joi.string().trim().max(100).required(),
    price: Joi.number().min(1).required(),
    type: Joi.string().trim().max(10).required(),
});


export {
    productValidation,
}