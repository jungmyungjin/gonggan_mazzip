import { productModel } from "../db";

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

  async getProductAll({ page = 1, perPage = 10 }) {
    // 현재 페이지와 페이지당 제한 항목 수
    const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;

    // 데이터베이스의 문서 수
    const totalItems = await this.productModel.model.estimatedDocumentCount();

    // 페이지네이션을 적용한 데이터베이스 쿼리를 실행합니다.
    const productPage = await this.productModel.model
      .find()
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();
    return productPage;
  }

  async getProductByCategory({ category, page = 1, perPage = 10 }) {
    const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;

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

  //productIds = [{productId: <productId>, quantity: <quantity>}, {productId: <productId>, quantity: <quantity>}, ...]
  async increaseProductStock(productIds) {
    const productObj = {};
    for (const product of testArg) {
      if (!product.productId || !parseInt(product.quantity)) {
        continue;
      }
      productObj[product.productId] = parseInt(product.quantity);
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
        update: { $inc: { stock: productObj[product._id] } },
      },
    }));

    await this.productModel.model.bulkWrite(bulkUpdateOps);
  }

  async decreaseProductStock(productId, quantity) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    product.stock -= parseInt(quantity);
    await product.save();
  }
}

const productService = new ProductService(productModel);

export { productService };
