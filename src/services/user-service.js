import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async addUser(userInfo) {
    const { email, name, password } = userInfo;
    console.log(email);

    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { email, name, password: hashedPassword };
    const createdNewUser = await this.userModel.create(newUserInfo);
    return createdNewUser;
  }

  async getUserToken(loginUserInfo) {
    const { email, password } = loginUserInfo;
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error("로그인 정보가 맞지 않습니다. 다시 한 번 확인해 주세요.");
    }

    const isPasswordCorrect = await bcrypt.hash(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("로그인 정보가 맞지 않습니다. 다시 한 번 확인해 주세요.");
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ email, role: user.role }, secretKey);
    return token;
  }
}

const userService = new UserService(userModel);

export { userService };
