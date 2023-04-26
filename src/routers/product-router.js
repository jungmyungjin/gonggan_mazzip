import { Router } from "express";
import { productService } from "../services/product-service";
import requestHandler from "../middlewares/async-handler";
import {
  validateProductListRequest,
  validateProductSchemaAllTypes,
  validateProductSchemaTypes,
} from "../middlewares";

const productRouter = Router();

productRouter.get(
  "/",
  validateProductListRequest,
  requestHandler(async (req, res, next) => {
    {
      let resultProductList = [];
      const { category, page, perPage } = req.query;
      resultProductList = await productService.getProductList({
        category,
        page,
        perPage,
      });
      res.status(201).json(resultProductList);
    }
  })
);

productRouter.get(
  "/:productId",
  requestHandler(async (req, res, next) => {
    {
      let resultProductDetail = {};
      const productId = req.params.productId;
      if (productId) {
        resultProductDetail = await productService.getProductInfo(productId);
      }
      res.status(201).json(resultProductDetail);
    }
  })
);

// POST /products/productIds
// Request body: {productId:['<id1>', '<id2>', '<id3>', ...]}
productRouter.post(
  "/productIds",
  requestHandler(async (req, res, next) => {
    {
      let resultProductList = [];
      const productIds = req.body.productIds;
      if (productIds) {
        resultProductList = await productService.getProductByProductIds(
          productIds
        );
      }
      res.status(201).json(resultProductList);
    }
  })
);

// 상품 추가
productRouter.post(
  "/",
  validateProductSchemaAllTypes,
  requestHandler(async (req, res, next) => {
    {
      const newProducts = req.body.products;
      const resultProducts = await productService.createProducts(newProducts);

      console.log(resultProducts);
      res.status(201).json(resultProducts);
    }
  })
);

// TODO : 상품 삭제
// productRouter.delete(
//   "/delete",
//   requestHandler(async (req, res, next) => {
//     {
//       res.status(201).json(resultProductList);
//     }
//   })
// );

// TODO : 상품 수정
productRouter.patch(
  "/",
  validateProductSchemaTypes,
  requestHandler(async (req, res, next) => {
    {
      const setProducts = req.body.products;
      const resultProducts = await productService.setProducts(setProducts);
      res.status(201).json(resultProducts);
    }
  })
);

export { productRouter };
