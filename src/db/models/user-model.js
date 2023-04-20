import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";
const sampleData = require("../sampleData/sampleUser.json");

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
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

  async update({ email, update }) {
    const updateUser = await User.findOneAndUpdate(email, update, {
      new: true,
    });
    return updateUser;
  }

  async delete(email) {
    const deleteUserResult = await User.deleteOne({ email });
    return deleteUserResult;
  }
}

const userModel = new UserModel();

export { userModel };
