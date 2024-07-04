import * as CustomErrors from "../errors/index.js"

const errorHandler = async (error, req, res, next) => {
  if (res.headersSent) {
    console.error(error);
    return next(error)
  }

  const isCustomError = Object.values(CustomErrors).includes(error.constructor);

  if (!isCustomError) {
    console.error(error);
    error = new CustomErrors.ServerError(error.message);
  }

  const status = errorStatus(error);
  const message = error.message || "Something went wrong";

  res.status(status).json({ message })
};

const errorStatus = (error) => {
  switch(error.constructor) {
    case CustomErrors.InvalidInputError: return 400;
    case CustomErrors.ForbiddenError: return 403;
    case CustomErrors.NotFoundError: return 404;
    case CustomErrors.ServerError: return 500;
    default: return 500;
  }
}

export default errorHandler;
