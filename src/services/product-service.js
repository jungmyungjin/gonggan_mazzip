import { productModel } from "../db";
import { parsePaginationParameters } from "./utils";

class ProductService {
  constructor() {
    this.productModel = productModel;
  }

  async getProductInfo(productId) {
    const productInfo = await this.productModel.findById(productId);

    if (!productInfo) {
      throw new Error(
        "해당 상품이 존재하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    return productInfo;
  }

  async getProductList({ page = 1, perPage = 10, category = undefined }) {
    let resultProductList = [];
    if (category) {
      resultProductList = await this.getProductByCategory({
        category,
        page,
        perPage,
      });
    } else {
      resultProductList = await this.getProductAll({
        page,
        perPage,
      });
    }
    return resultProductList;
  }

  async getProductAll({ page = 1, perPage = 10 }) {
    const { currentPage, itemsPerPage } = parsePaginationParameters({
      page,
      perPage,
    });

    // 데이터베이스의 문서 수 (페이지네이션 정보 리턴 시 추가)
    // const totalItems = await this.productModel.model.estimatedDocumentCount();

    const productPage = await this.productModel.model
      .find()
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    // 전체 페이지 수 계산 (페이지네이션 정보 리턴 시 추가)
    // const totalPages = Math.ceil(totalItems / itemsPerPage);

    return productPage;
  }

  async getProductByCategory({ category, page = 1, perPage = 10 }) {
    // 현재 페이지와 페이지당 제한 항목 수
    const { currentPage, itemsPerPage } = parsePaginationParameters({
      page,
      perPage,
    });

    const filteredProductList = await this.productModel.model
      .find({
        category: category,
      })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    return filteredProductList;
  }

  async getProductByProductIds(productIds) {
    const filteredProductList = await this.productModel.read({
      _id: { $in: productIds },
    });
    return filteredProductList;
  }

  async increaseProductStock(productId, quantity) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    product.stock += parseInt(quantity);
    await product.save();
  }

  //productIds = [{productId: <productId>, quantity: <quantity>}, {productId: <productId>, quantity: <quantity>}, ...]
  async decreaseProductsStock(productIds) {
    const productObj = {};
    for (const product of productIds) {
      productObj[product.productId] = parseInt(product.quantity);
      if (!product.productId || !parseInt(product.quantity)) {
        continue;
      }
    }

    const productList = await this.productModel.read({
      _id: { $in: Object.keys(productObj) },
    });

    if (!productList?.length) {
      throw new Error("Product not found");
    }

    const bulkUpdateOps = productList.map((product) => ({
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -productObj[product._id] } },
      },
    }));

    await this.productModel.model.bulkWrite(bulkUpdateOps);
  }
}

const productService = new ProductService(productModel);

export { productService };
