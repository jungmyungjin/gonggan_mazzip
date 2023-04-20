import { Router } from "express";
import { productService } from "../services/product-service";
import requestHandler from "../middlewares/async-handler";

const productRouter = Router();

productRouter.get(
  "/products",
  requestHandler(async (req, res, next) => {
    {
      let resultProductList = [];
      const { category } = req.query;
      if (category) {
        resultProductList = await productService.getProductByCategory(category);
      } else {
        resultProductList = await productService.getProductAll(category);
      }
      res.status(200).json(resultProductList);
    }
  })
);

export { productRouter };
