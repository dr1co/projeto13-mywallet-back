import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGOURL)
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATABASE);
});

export async function signUp (req, res) {
    const newUser = res.locals.signUp
    const encripted = bcrypt.hashSync(newUser.password, 10);
    const token = uuid();
    await db.collection("users").insertOne({
        name: newUser.name,
        email: newUser.email,
        password: encripted,
    });

    try {
        const user = await db.collection("users").findOne({ name: newUser.name });
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        });

        res.status(201).send({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            token
        })
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function signIn (req, res) {
    const session = res.locals.session;

    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(session.userId)});

        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: session.token
        });
    } catch (error) {
        res.sendStatus(500);
    }
}