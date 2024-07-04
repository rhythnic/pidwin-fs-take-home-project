import UserDto from "../../dto/user.dto.js";
import UserService from "../../services/user.service.js";

const getAuthenticatedUser = async (req, res, next) => {
  try {
    const user = await new UserService().getOrFail(req.userId);
    res.status(200).json(UserDto.fromModel(user));
  } catch (error) {
    next(error);
  }
};

export default getAuthenticatedUser;