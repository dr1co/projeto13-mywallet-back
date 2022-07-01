import joi from 'joi';

const transactionSchema = joi.object({
    date: joi.string().required(),
    name: joi.string().required(),
    value: joi.number().required(),
    type: joi.string().valid("entrance", "exit")
});

async function validateTransaction(req, res, next) {
    const transaction = req.body;

    const validation = transactionSchema.validate(transaction);

    if (validation.error) {
        res.sendStatus(422)
    }

    next();
}

export default validateTransaction;