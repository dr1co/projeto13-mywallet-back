import express from 'express';
import { getTransactions, getTransactionById, addTransaction, editTransaction, deleteTransaction } from '../controllers/transactionsControllers.js';
import validateTransaction from '../middlewares/validateTransactionMiddleware.js';
import validateToken from '../middlewares/validateTokenMiddleware.js';

const transactionsRouter = express.Router();
transactionsRouter.get("/transactions", validateToken, getTransactions);
transactionsRouter.post("/transactions", validateToken, validateTransaction, addTransaction);
transactionsRouter.get("/transactions/:transactionId", validateToken, getTransactionById);
transactionsRouter.put("/transactions/:transactionId", validateToken, validateTransaction, editTransaction);
transactionsRouter.delete("/transactions/:transactionId", validateToken, deleteTransaction);

export default transactionsRouter;