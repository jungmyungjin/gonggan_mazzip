import { productModel } from "../db";

class ProductService {
  constructor() {
    this.productModel = productModel;
  }

  async getProductAll(productInfo) {
    console.log("getProductALL");
    const allProductList = await this.productModel.read();
    return allProductList;
  }
}

const productService = new ProductService(productModel);

export { productService };
