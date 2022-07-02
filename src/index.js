import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import transactionsRouter from './routes/transactionsRoutes.js';

const server = express();
const PORT = process.env.PORT;

server.use([cors(), express.json()]);

server.use(authRouter);
server.use(usersRouter);
server.use(transactionsRouter);

server.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}.`);
});