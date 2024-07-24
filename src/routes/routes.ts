import { Router } from 'express';
import { sendEmailController } from '../controllers/email.controller';
import { webhookController } from '../controllers/webhook.controller';

const router = Router();

router.post('/api/sendEmail', sendEmailController);
router.post('/api/webhook', webhookController);

export default router;
