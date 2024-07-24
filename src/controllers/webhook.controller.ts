import { Request, Response } from 'express';
import { CONSTANT_MSG } from '../common/common.message';
import { statusUpdate } from '../services/webhook.service';

export const webhookController = async (req: Request, res: Response) => {
  try {
    const webhookReponse: any = await statusUpdate(req.body);
    return res.status(webhookReponse.statusCode).send(webhookReponse);
  } catch (error: any) {
    console.log("Error in sendEmailController API: ", error);
    const statusCode = error.details ? CONSTANT_MSG.STATUS_CODE.ERROR : CONSTANT_MSG.STATUS_CODE.INTERNAL_SERVER;
    return res.status(statusCode).send({ statusCode: statusCode, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
}