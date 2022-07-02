import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGOURL);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATABASE);
});

export async function signIn(req, res) {
    const request = res.locals.request;

    const user = await db.collection("users").findOne({ name: request.name });

    if(!user) return res.sendStatus(404);

    try {
        if (user && bcrypt.compareSync(request.password, user.password)) {
            const newToken = uuid()
            await db.collection("sessions").deleteOne({ token: request.token });
            await db.collection("sessions").insertOne({
                userId: user._id,
                token: newToken
            });
    
            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: newToken
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}