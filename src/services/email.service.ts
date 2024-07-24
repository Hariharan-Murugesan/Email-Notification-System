import { EmailModel } from '../models/email.model';
import { CONSTANT_MSG } from '../common/common.message';
import { emailQueue } from './queue.service';

export const sendEmail = async (emailData: { toEmail: string; subject: string; body: string; }) => {
  try {
    const email = await EmailModel.create({ ...emailData });
    await emailQueue.add(CONSTANT_MSG.QUEUE.JOB, {
      id: email._id.toString(),
      toEmail: emailData.toEmail,
      subject: emailData.subject,
      body: emailData.body,
      status: 'pending'
    });
    return { status: CONSTANT_MSG.STATUS.SUCCESS, statusCode: CONSTANT_MSG.STATUS_CODE.SUCCESS, message: CONSTANT_MSG.MESSAGE.EMAIL_SEND };
  } catch (error: any) {
    return { status: CONSTANT_MSG.STATUS.ERROR, statusCode: CONSTANT_MSG.STATUS_CODE.ERROR, message: error.message };
  }
};
