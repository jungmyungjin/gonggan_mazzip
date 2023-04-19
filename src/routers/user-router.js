import { Router } from "express";
import { loginRequired } from "../middlewares";

import { userService } from "../services";

const userRouter = Router();
const requestHandler = require("../middlewares/async-handler");

userRouter.get(
  "/user",
  loginRequired,
  requestHandler(async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  })
);

export { userRouter };
