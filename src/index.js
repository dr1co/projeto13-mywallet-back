import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import transactionsRouter from './routes/transactionsRoutes.js';

const server = express();
const PORT = process.env.PORT;

server.use(cors());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type", "Accept");
    next();
});
server.use(express.json());

server.use(authRouter);
server.use(usersRouter);
server.use(transactionsRouter);

server.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}.`);
});