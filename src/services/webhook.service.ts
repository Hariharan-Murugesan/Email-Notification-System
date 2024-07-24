import { EmailModel } from '../models/email.model';
import { emailQueue } from './queue.service';
import { CONSTANT_MSG } from '../common/common.message';
import { io } from '../index';

export const statusUpdate = async (req: any) => {
  try {
    const request = req.length ? req[0] : {}
    if (request) {
      const messageId = request.sg_message_id.split('.')[0];
      const email = await EmailModel.findOne({ toEmail: request.email, status: { $ne: 'delivered' }, messageId }).sort({ createdAt: -1 });
      if (email) {
        if (request.event === 'bounce') {
          await EmailModel.updateOne({ _id: email._id }, { status: request.event });
          await emailQueue.add(CONSTANT_MSG.QUEUE.JOB, {
            id: email._id.toString(),
            to: email.toEmail,
            subject: email.subject,
            body: email.body,
            status: request.event
          });
          io.emit('emailStatus', { toEmail: request.email, status: request.event });
          return { status: CONSTANT_MSG.STATUS.SUCCESS, statusCode: CONSTANT_MSG.STATUS_CODE.SUCCESS, message: CONSTANT_MSG.MESSAGE.WEBHOOK_RECEIVED };
        } else if (request.event === 'delivered') {
          await EmailModel.updateOne({ _id: email._id }, { status: request.event });
          io.emit('emailStatus', { toEmail: request.email, status: request.event });
          return { status: CONSTANT_MSG.STATUS.SUCCESS, statusCode: CONSTANT_MSG.STATUS_CODE.SUCCESS, message: CONSTANT_MSG.MESSAGE.WEBHOOK_RECEIVED };
        }
      }
    }
    return { status: CONSTANT_MSG.STATUS.ERROR, statusCode: CONSTANT_MSG.STATUS_CODE.ERROR, message: CONSTANT_MSG.MESSAGE.WEBHOOK_INVALID };
  } catch (error: any) {
    return { status: CONSTANT_MSG.STATUS.ERROR, statusCode: CONSTANT_MSG.STATUS_CODE.ERROR, message: error.message };
  }
};
