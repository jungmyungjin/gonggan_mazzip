import { ProductSchema } from "../db/schemas/product-schema";

function validateProductListRequest(req, res, next) {
  const { category, page, perPage } = req.query;
  if (category) {
    const allowedCategories = ProductSchema.path("category").enumValues;
    if (!allowedCategories.includes(category)) {
      throw new Error("존재하지 않는 카테고리 입니다.");
    }
  }
  if ((page, perPage)) {
    if (isNaN(parseInt(page)) || isNaN(parseInt(perPage))) {
      throw new Error("페이지 및 페이지 크기는 숫자 여야 합니다.");
    }
  }
  next();
}

function validateCreateProducts(req, res, next) {
  const newProducts = req.body.createProducts;
  console.log("createProducts==================");

  console.log(req.body);
  console.log("createProducts==================");

  if (!Array.isArray(newProducts)) {
    throw new Error("createProducts는 Array 형식이여야 합니다." + newProducts);
  }
  for (let product of newProducts) {
    if (
      !product.productName ||
      !product.company ||
      !product.price ||
      !product.stock ||
      !product.imageUrl ||
      !product.category ||
      !product.description
    ) {
      throw new Error("상품에 입력하지 않은 내용이 있습니다. " + product);
    }
  }
  next();
}

module.exports = { validateProductListRequest, validateCreateProducts };
