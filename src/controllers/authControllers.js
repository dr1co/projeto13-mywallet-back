import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGOURL);
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATABASE);
});

export async function signUp (req, res) {
    const newUser = res.locals.signUp;
    const encripted = bcrypt.hashSync(newUser.password, 10);

    try {
        await db.collection("users").insertOne({
            name: newUser.name,
            email: newUser.email,
            password: encripted,
        });
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function authIn (req, res) {
    const session = res.locals.session;

    const user = await db.collection("users").findOne({ _id: new ObjectId(session.userId) });

    if (!user) return res.sendStatus(404);

    try {
        const newToken = uuid();
        await db.collection("sessions").deleteOne({ token: session.token });
        await db.collection("sessions").insertOne({
            userId: session.userId,
            token: newToken
        });

        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: newToken
        });
    } catch (error) {
        res.sendStatus(500);
    }
}