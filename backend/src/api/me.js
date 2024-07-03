import User from "../models/user.js";
import ServerError from "../errors/server-error.js";
import NotFoundError from "../errors/not-found-error.js";

const getAuthenticatedUser = async (req, res, next) => {
  try {
    const authenticatedUser = await User.findById(req.userId);

    if (!authenticatedUser) {
      next(new NotFoundError("User Does Not Exist"));
      return;
    }

    res.status(200).json(new UserDto(authenticatedUser));
  } catch (error) {
    console.error(error);
    next(new ServerError());
  }
};

export default getAuthenticatedUser;