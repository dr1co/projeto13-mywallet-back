import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const server = express();
const PORT = process.env.PORT;

server.use([cors(), express.json()]);

server.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}
Hello, World!`);
});