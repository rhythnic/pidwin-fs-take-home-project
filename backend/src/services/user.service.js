import User from "../models/user.js";

export default class UserService {
  constructor(userModel) {
      this.model = userModel || User;
  }

  async getOrFail(userId) {
    const user = await this.model.findById(userId);
    if (!user) {
      throw new NotFoundError("User Does Not Exist");
    }
    return user;
  }

  async update(user) {
    await user.save();
    return user;
  }
}