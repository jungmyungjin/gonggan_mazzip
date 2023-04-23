import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { new: true };
    const updateUser = await User.findOneAndUpdate(filter, update, option);

    return updateUser;
  }

  async delete(userId) {
    const deleteUserResult = await User.findByIdAndDelete(userId);
    return deleteUserResult;
  }
}

const userModel = new UserModel();

export { userModel };
