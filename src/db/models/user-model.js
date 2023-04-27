import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";
import fs from "fs";
import path from "path";

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

  async findByType(type, value) {
    let users = "";
    if (type === "name") {
      users = await User.find({ name: new RegExp(value) }).sort({ name: 1 });
    } else if (type === "email") {
      users = await User.find({ email: new RegExp(value) }).sort({ email: 1 });
    }
    return users;
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

  async createDefaultData() {
    // 파일이 있는 디렉토리에서 Node.js 애플리케이션이 실행되는 디렉토리로 이동
    const rootPath = path.join(__dirname, "..");
    const filePath = path.join(rootPath, "sampleData", "sampleUser.json");

    // 파일 읽기
    const jsonString = fs.readFileSync(filePath, "utf-8");
    const useJsonObj = JSON.parse(jsonString);
    User.findOne().then((user) => {
      if (user) {
        console.log("👤 Test 사용자가 이미 존재합니다.");
        console.log("👤 Test 사용자 생성 작업을 건너 뜁니다.");
        return;
      }
      console.log("👤 Test 사용자가 존재하지 않습니다.");
      console.log("👤 Test 사용자 생성 작업 시작");
      User.create(useJsonObj)
        .then(() => {
          console.log("👤 Test 사용자가 추가되었습니다.");
        })
        .catch((err) => {
          console.log("👤 Test 사용자 추가가 실패하였습니다... ");
          console.log(err);
        })
        .finally(() => {
          console.log("👤 Test 사용자 데이터 작업 완료");
        });
    });
  }
}

const userModel = new UserModel();

export { userModel };
