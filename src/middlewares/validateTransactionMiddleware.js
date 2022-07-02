import joi from 'joi';

const transactionSchema = joi.object({
    date: joi.string().required(),
    name: joi.string().required(),
    value: joi.string().required(),
    type: joi.string().valid("entrance", "exit")
});

async function validateTransaction(req, res, next) {
    const newTransaction = req.body;

    const validation = transactionSchema.validate(newTransaction);

    if (validation.error) return res.sendStatus(422)

    res.locals.transaction = newTransaction;

    next();
}

export default validateTransaction;