import { Router } from "express";
import { loginRequired, adminOnly } from "../middlewares";
import { userService } from "../services";
import asyncHandler from "../middlewares/async-handler";

const userRouter = Router();
const sampleUser = require("../db/sampleData/sampleUser.json");

userRouter.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { name, email, password, phoneNumber, address } = req.body;
    const newUser = await userService.addUser({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(201).json(newUser);
  })
);

userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // 혹시 DB에 user정보가 하나도 없다면 dummy user 데이터 입력 <- 테스트코드라 추후 지울 예정
    const users = await userService.getUsersData();
    if (!users || users.length < 1) {
      let userId = [];
      for (let i = 0; i < sampleUser.length; i++) {
        userId = await userService.addUser(sampleUser[i]);
      }
    }

    const loginResult = await userService.getUserToken({ email, password });
    res.status(201).json(loginResult);
  })
);

userRouter.get(
  "/info",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const user = await userService.getUserData(userId);
    res.status(201).json(user);
  })
);

userRouter.patch(
  "/update",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const { phoneNumber, address, currentPassword, password, role } = req.body;
    const toUpdate = {
      ...(phoneNumber && { phoneNumber }),
      ...(address && { address }),
      ...(password && { password }),
      ...(role && { role }),
    };

    const updateUserInfo = await userService.setUser(
      { userId, currentPassword },
      toUpdate
    );

    res.status(201).json(updateUserInfo);
  })
);

userRouter.delete(
  "/delete",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const deletedResult = await userService.deleteUser(userId);
    res.status(201).json(deletedResult);
  })
);

// 관리자가 모든 유저의 정보 조회 - 유저 이름, 이메일 별로 조회
userRouter.get(
  "/searchUser/:type",
  adminOnly,
  asyncHandler(async (req, res, next) => {
    const { type } = req.params;
    const { value } = req.query;

    const users = await userService.getUsers(type, value);
    res.status(201).json(users);
  })
);

export { userRouter };
