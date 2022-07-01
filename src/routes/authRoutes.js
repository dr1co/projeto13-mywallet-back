import express from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';
import validateSignUp from '../middlewares/validateSignUpMIddleware.js';
import validateToken from '../middlewares/validateTokenMiddleware.js';

const authRouter = express.Router();
authRouter.post("/auth/signup",validateSignUp, signUp);
authRouter.post("/auth", validateToken, signIn);

export default authRouter;