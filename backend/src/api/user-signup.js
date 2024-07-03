import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ServerError from "../errors/server-error.js";
import InvalidInputError from "../errors/invalid-input-error.js";
import UserDto from "../dto/user.dto.js";

const INITIAL_ACCOUNT_BALANCE = 100

const signup = async (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(new InvalidInputError("User Already Exist"));
      return;
    }

    if (password !== confirmPassword) {
      next(new InvalidInputError("Password Does Not Match"));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      accountBalance: INITIAL_ACCOUNT_BALANCE
    });
    const token = jwt.sign(
      UserDto.fromModel(result),
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(new ServerError());
  }
};

export default signup;