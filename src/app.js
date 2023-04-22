import cors from "cors";
import express from "express";
import { productRouter, userRouter, viewsRouter, orderRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("views")); //

app.use(viewsRouter);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.use(errorHandler);

export { app };
