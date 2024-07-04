import { assert } from 'superstruct'
import { InvalidInputError } from '../errors/index.js';

const validate = (schema) => (req, res, next) => {
    try {
        assert(req.body, schema);
        next();
    } catch (error) {
        next(new InvalidInputError(error.message))
    }
}

export default validate;