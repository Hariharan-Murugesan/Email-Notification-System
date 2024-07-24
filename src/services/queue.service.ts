import { Queue, Worker } from 'bullmq';
import sgMail from '@sendgrid/mail';
import { ObjectId } from 'mongodb';
import { EmailModel } from '../models/email.model';
import { redisURLForBullMQ } from '../common/redis';
import { CONSTANT_MSG } from '../common/common.message';

const FROM_EMAIL = process.env.EMAIL_ID || '';
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY || '';
sgMail.setApiKey(SEND_GRID_API_KEY);

const emailQueue = new Queue(CONSTANT_MSG.QUEUE.QUEUE_JOB, {
  connection: redisURLForBullMQ(),
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: 1000
  }
});

const emailWorker = new Worker(CONSTANT_MSG.QUEUE.QUEUE_JOB, async job => {
  const { id, toEmail, subject, body } = job.data;
  try {
    const response = await sgMail.send({
      to: toEmail,
      from: FROM_EMAIL,
      subject,
      text: body,
      html: `<p>${body}</p>`,
    });
    const messageId = response.length ? response[0].headers["x-message-id"] : '';
    if (messageId !== '') {
      await EmailModel.updateOne({ _id: new ObjectId(id) }, { messageId });
    }
    return true;
  } catch (error) {
    if (!job?.data?.retry || job?.data?.retry < 3) {
      await emailQueue.add(CONSTANT_MSG.QUEUE.JOB, {
        ...job.data, status: 'pending', retry: (job?.data?.retry || 0) + 1
      });
      return true;
    }
    console.error(`Failed to send email to ${toEmail}:`, error);
    return true;
  }
}, {
  connection: redisURLForBullMQ()
});

export { emailQueue, emailWorker };
