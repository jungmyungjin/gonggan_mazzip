import cors from "cors";
import express from "express";
import { userRouter, viewsRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("views")); //

app.use(viewsRouter);

app.use("/api", userRouter);

app.use(errorHandler);

export { app };
