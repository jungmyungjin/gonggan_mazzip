import { Router } from "express";
import { productService } from "../services/product-service";
import requestHandler from "../middlewares/async-handler";

const productRouter = Router();

productRouter.get(
  "/products",
  requestHandler(async (req, res, next) => {
    {
      const allProducts = await productService.getProductAll();
      res.status(200).json(allProducts);
    }
  })
);

export { productRouter };
