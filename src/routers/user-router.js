import { Router } from "express";
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();
const requestHandler = require("../middlewares/async-handler");
const sampleUser = require("../db/sampleData/sampleUser.json");

userRouter.post(
  "/register",
  requestHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const newUser = await userService.addUser({ name, email, password });
    res.status(201).json(newUser);
  })
);

userRouter.post(
  "/login",
  requestHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const loginResult = await userService.getUserToken({ email, password });
    console.log("loginResult:", loginResult);
    res.status(201).json(loginResult);
  })
);

export { userRouter };
