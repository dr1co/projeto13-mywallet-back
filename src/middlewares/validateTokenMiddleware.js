import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGOURL);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATABASE);
});

async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(404);

    res.locals.session = session;
    next();
}

export default validateToken;