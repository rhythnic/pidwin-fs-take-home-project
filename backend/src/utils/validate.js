import { assert } from 'superstruct'
import InvalidInputError from '../errors/invalid-input-error.js';

const validate = (schema) => (req, res, next) => {
    try {
        assert(req.body, schema);
    } catch (error) {
        next(new InvalidInputError(error.message))
    }
}

export default validate;