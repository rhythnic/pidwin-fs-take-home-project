import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ServerError from "../errors/server-error.js";
import NotFoundError from "../errors/not-found-error.js";
import InvalidInputError from "../errors/invalid-input-error.js";
import UserDto from "../dto/user.dto.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new NotFoundError("User Does Not Exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw new InvalidInputError("Invalid Password");
    }

    const token = jwt.sign(
      UserDto.fromModel(existingUser),
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(new ServerError());
  }
};

export default login;