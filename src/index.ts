import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import "dotenv/config";
import http from 'http';
import Server from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import emailRoutes from './routes/routes';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(express.json());
app.use(cors());
app.use(emailRoutes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.DB_CONNECTION || '';
const DATABASE = process.env.DATABASE || '';


// First API
app.get('/', (req, res) => {
    res.status(200).send('Hello Developer');
});

const server = http.createServer(app);
export const io = new Server.Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }, path: "/api/ws"
});

io.on('connection', (socket) => {
    console.log('New client connected');
});

server.listen(PORT, () => {
    mongoose.connect(DB_CONNECTION, { dbName: DATABASE } as ConnectOptions)
        .then(() => {
            console.log('Connected to MongoDB!');
        }).catch(err => {
            console.log("Connection Failed", err.message);
        });
});

export default app;
