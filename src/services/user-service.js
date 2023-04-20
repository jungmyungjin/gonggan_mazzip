import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async addUser(userInfo) {
    const user = await this.userModel.findByEmail(userInfo.email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const newUserInfo = { ...userInfo, password: hashedPassword };
    const createdNewUser = await this.userModel.create(newUserInfo);
    return createdNewUser;
  }

  async getUserToken(loginUserInfo) {
    const { email, password } = loginUserInfo;
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error("로그인 정보가 맞지 않습니다. 다시 한 번 확인해 주세요.");
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("로그인 정보가 맞지 않습니다. 다시 한 번 확인해 주세요.");
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    return token;
  }

  async getUserData(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    return user;
  }

  async getUsersData() {
    const users = await this.userModel.findAll();
    return users;
  }

  async setUser({ userId, currentPassword }, toUpdate) {
    let user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 입력된 현재 비밀번호가 있다면
    if (currentPassword) {
      const correctPasswordHash = user.password;
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        correctPasswordHash
      );
      if (!isPasswordCorrect) {
        throw new Error(
          "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
        );
      }

      const { password } = toUpdate;
      if (password) {
        const newPasswordHash = await bcrypt.hash(password, 10);
        toUpdate.password = newPasswordHash;
      }

      user = await this.userModel.update({ userId, update: toUpdate });

      return user;
    } else {
      user = await this.userModel.update({
        userId,
        update: toUpdate,
      });

      return user;
    }
  }

  async deleteUser(userId) {
    const deletedUser = await this.userModel.delete(userId);
    if (!deletedUser) {
      throw new Error(`${userId} 사용자 탈퇴 처리에 실패하였습니다.`);
    }

    return { result: "succress" };
  }
}

const userService = new UserService(userModel);

export { userService };
