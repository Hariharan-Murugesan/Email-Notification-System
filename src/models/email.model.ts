import { Schema, model } from 'mongoose';

interface Email {
  toEmail: string;
  subject: string;
  body: string;
  messageId: string;
  status: string;
}

const emailSchema = new Schema<Email>(
  {
    toEmail: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    messageId: { type: String },
    status: { type: String, default: 'pending' }
  },
  {
    timestamps: true
  });

export const EmailModel = model<Email>('Email', emailSchema, 'Email');
