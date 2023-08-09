import Joi from "joi";

export const loginDto = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

