import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import ServerError from "../../errors/server-error.js";
import InvalidInputError from "../../errors/invalid-input-error.js";

const INITIAL_ACCOUNT_BALANCE = 100

const signup = async (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new InvalidInputError("User Already Exist");
    }

    if (password !== confirmPassword) {
      throw new InvalidInputError("Password Does Not Match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      accountBalance: INITIAL_ACCOUNT_BALANCE
    });
    const token = jwt.sign(
      { _id: user._id },
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