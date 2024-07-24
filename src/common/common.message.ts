export const CONSTANT_MSG = {
    STATUS_CODE: {
        SUCCESS: 200,
        ERROR: 400,
        UNAUTH: 401,
        INTERNAL_SERVER: 500,
    },
    STATUS: {
        SUCCESS: 'success',
        ERROR: 'error'
    },
    MESSAGE: {
        EMAIL_SEND: 'Email send successfully',
        WEBHOOK_RECEIVED: 'Webhook received',
        WEBHOOK_INVALID: 'Invalid request'
    },
    QUEUE: {
        JOB: 'newJob',
        QUEUE_JOB: 'email-queue'
    },
    ERROR_MSG: {
        BAD_REQUEST: 'BAD REQUEST',
        UNAUTHORIZED_ERROR: 'UNAUTHORIZED ERROR',
        UNAUTHORIZED_NO_PERMISSION_ERROR: 'Login to access this feature'
    }
}