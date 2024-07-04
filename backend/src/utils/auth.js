import jwt from "jsonwebtoken";
import ForbiddenError from "../errors/forbidden-error.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    let err;

    if (!req.userId) {
      err = new ForbiddenError();
    }

    next(err);
  } catch (error) { }
};

export default auth;
