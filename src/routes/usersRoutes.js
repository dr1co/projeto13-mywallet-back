import express from 'express';
import { signIn } from '../controllers/usersControllers.js';
import validateUser from '../middlewares/validateUserMiddleware.js';

const usersRouter = express.Router();
usersRouter.post("/users", validateUser, signIn);

export default usersRouter;