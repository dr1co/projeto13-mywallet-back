import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
});

async function validateSignUp(req, res, next) {
    const signUp = req.body;
    const validation = signUpSchema.validate(signUp);

    if (validation.error) return res.sendStatus(422);
    
    res.locals.signUp = signUp;

    next();
}

export default validateSignUp;