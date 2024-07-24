import joi from 'joi';

const sendEmailValidator = joi.object({
    toEmail: joi.string().email().required(),
    subject: joi.string().required(),
    body: joi.string().required()
});

export default {
    sendEmailValidator
}