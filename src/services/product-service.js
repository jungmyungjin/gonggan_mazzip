import { productModel } from "../db";

class ProductService {
  constructor() {
    this.productModel = productModel.model;
  }

  async getProductInfo(productId) {
    const productInfo = await this.productModel.fineOne({
      _id: productId,
    });
    return productInfo;
  }

  async getProductAll({ page = 1, perPage = 10 }) {
    // 현재 페이지와 페이지당 제한 항목 수
    const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;

    // 데이터베이스의 문서 수
    const totalItems = await this.productModel.estimatedDocumentCount();

    // 페이지네이션을 적용한 데이터베이스 쿼리를 실행합니다.
    const productPage = await this.productModel
      .find()
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();
    return productPage;
  }

  async getProductByCategory({ category, page = 1, perPage = 10 }) {
    const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;

    const filteredProductList = await this.productModel
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
      productId: { $in: productIds },
    });
    return filteredProductList;
  }
}

const productService = new ProductService(productModel);

export { productService };
