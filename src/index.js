import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

const server = express();
const PORT = process.env.PORT;

server.use([cors(), express.json()]);

server.use(authRouter);

server.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}.`);
});