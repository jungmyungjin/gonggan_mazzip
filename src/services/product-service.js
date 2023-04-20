import { productModel } from "../db";

class ProductService {
  constructor() {
    this.productModel = productModel;
  }

  async getProductAll() {
    const allProductList = await this.productModel.read();
    return allProductList;
  }

  async getProductByCategory(category) {
    const filteredProductList = await this.productModel.read({
      category: category,
    });

    return filteredProductList;
  }
}

const productService = new ProductService(productModel);

export { productService };
