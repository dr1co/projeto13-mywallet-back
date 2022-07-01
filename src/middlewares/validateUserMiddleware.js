import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required
});

async function validateUser(req, res, next) {
    const user = req.body

    const validation = userSchema.validate(user);

    if (validation.error) {
        return res.sendStatus(401);
    }

    next();
}

export default validateUser;