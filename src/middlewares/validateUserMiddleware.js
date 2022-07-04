import joi from 'joi';

const userSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
});

async function validateUser(req, res, next) {
    const request = req.body

    const validation = userSchema.validate(request);

    if (validation.error) return res.sendStatus(422);
    
    res.locals.request = request;

    next();
}

export default validateUser;