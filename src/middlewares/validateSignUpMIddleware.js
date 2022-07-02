import joi from 'joi';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGOURL);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATABASE);
})

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
});

async function validateSignUp(req, res, next) {
    const signUp = req.body;
    const validation = signUpSchema.validate(signUp);

    if (validation.error) return res.sendStatus(422);

    const user = await db.collection("users").findOne({ email: signUp.email });
    
    if (user) return res.sendStatus(401);
    
    res.locals.signUp = signUp;

    next();
}

export default validateSignUp;