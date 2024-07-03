import UnauthorizedError from "../errors/unauthorized-error";
import ServerError from "../errors/server-error";
import NotFoundError from "../errors/not-found-error";
import InvalidInputError from "../errors/invalid-input-error";

const errorHandler = async (error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
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
