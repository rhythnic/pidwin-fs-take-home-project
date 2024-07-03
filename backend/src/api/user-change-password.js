import bcrypt from "bcryptjs";
import User from "../models/user.js";
import ServerError from "../errors/server-error.js";
import NotFoundError from "../errors/not-found-error.js";
import InvalidInputError from "../errors/invalid-input-error.js";

const changePassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      next(new NotFoundError("User Does Not Exist"));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      next(new InvalidInputError("Invalid Password"));
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatePassword = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatePassword);
  } catch (error) {
    console.error(error);
    next(new ServerError());
  }
};

export default changePassword;