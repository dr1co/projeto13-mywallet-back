import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required()
});

async function validateUser(req, res, next) {
    const request = req.body

    const validation = userSchema.validate(request);

    if (validation.error) return res.sendStatus(401);
    
    res.locals.request = request;

    next();
}

export default validateUser;