import { Router } from "express";
import { loginRequired } from "../middlewares";
import { userService } from "../services";
import asyncHandler from "../middlewares/async-handler";

const userRouter = Router();
const requestHandler = require("../middlewares/async-handler");
const sampleUser = require("../db/sampleData/sampleUser.json");

userRouter.post(
  "/register",
  requestHandler(async (req, res, next) => {
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
  requestHandler(async (req, res, next) => {
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
  "/user",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const user = await userService.getUserData(userId);
    res.status(201).json(user);
  })
);

userRouter.patch(
  "/userUpdate",
  loginRequired,
  requestHandler(async (req, res, next) => {
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
  "/userDelete",
  loginRequired,
  requestHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const deletedResult = await userService.deleteUser(userId);
    res.status(201).json(deletedResult);
  })
);

export { userRouter };
