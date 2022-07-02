import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGOURL);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATABASE);
});

export async function getTransactions(req, res) {
    const transactions = await db.collection("transactions").find().toArray();

    try {
        res.status(200).send(transactions);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function addTransaction(req, res) {
    const session = res.locals.session;
    const newTransaction = res.locals.transaction;

    await db.collection("transactions").insertOne({
        userId: session.userId,
        date: newTransaction.date,
        name: newTransaction.name,
        value: newTransaction.value,
        type: newTransaction.type
    });

    try {
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function editTransaction(req, res) {
    const session = res.locals.session;
    const id = req.params.transactionId;
    console.log(id);
    const newTransaction = res.locals.transaction;

    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });

    console.log(ObjectId(id), transaction);
    try {
        await db.collection("transactions").updateOne({ _id: new ObjectId(id) }, {
            $set: {
                userId: session.userId,
                date: newTransaction.date,
                name: newTransaction.name,
                value: newTransaction.value,
                type: newTransaction.type
            }
        });

        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function deleteTransaction(req, res) {
    const id = req.params.transactionId;

    await db.collection("transactions").deleteOne({ _id: new ObjectId(id)});

    try {
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}