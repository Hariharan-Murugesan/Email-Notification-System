## Email Notification System

## Node Project
    Node version 18.16.0

##  Installation
    Make sure you have Node.js and npm installed.
    Clone this repository: git clone https://github.com/Hariharan-Murugesan/email-notification.git
    Navigate to the project directory: cd email-notification
    Install the dependencies `npm install`

## Usage
    Build the TypeScript code: npm run build.
    Start the application: `npm start`

## Development
    To start the development server with auto-reloading, follow these steps:
    Install Nodemon globally: `npm install -g nodemon`
    Run the development server: `npm run dev`

## Packages
   -- express                : Server 
   -- @sendgrid/mail         : To send Email and Webhook configuration
   -- bullmq                 : Queue based process
   -- ioredis                : Act like queue server
   -- mongoose               : NoSql Database
   -- socket.io              : Client side request emitter
   -- joi                    : Validating the request
   -- nodemon                : Runtime server
