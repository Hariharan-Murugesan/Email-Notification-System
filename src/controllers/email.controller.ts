import { Request, Response } from 'express';
import { sendEmail } from '../services/email.service';
import validation from "../validators/validator";
import { CONSTANT_MSG } from '../common/common.message';

export const sendEmailController = async (req: Request, res: Response) => {
  try {
    await validation.sendEmailValidator.validateAsync(req.body);
    const emailReponse: any = await sendEmail(req.body);
    return res.status(emailReponse.statusCode).send(emailReponse);
  } catch (error: any) {
    console.log("Error in sendEmailController API: ", error.message);
    const statusCode = error.details ? CONSTANT_MSG.STATUS_CODE.ERROR : CONSTANT_MSG.STATUS_CODE.INTERNAL_SERVER;
    return res.status(statusCode).send({ statusCode: statusCode, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
}