import UnauthorizedError from "../errors/unauthorized-error.js";
import ServerError from "../errors/server-error.js";
import NotFoundError from "../errors/not-found-error.js";
import InvalidInputError from "../errors/invalid-input-error.js";

const errorHandler = async (error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  if (error.constructor === Error) {
    console.error(error);
    error = new ServerError(error.message);
  }

  const status = errorStatus(error);
  const message = error.message || "Something went wrong";

  res.status(status).json({ message })
};

const errorStatus = (error) => {
  switch(error.constructor) {
    case InvalidInputError: return 400;
    case UnauthorizedError: return 403;
    case NotFoundError: return 404;
    case ServerError: return 500;
    default: return 500;
  }
}

export default errorHandler;
