import mongoose from "mongoose";
import { ProductSchema } from "../schemas/product-schema";
const sampleProduct = require("../sampleData/sampleProduct");

class ProductModel {
  constructor() {
    this.model = mongoose.model("Product", ProductSchema);
  }

  async findById(productId) {
    const product = await this.model.findOne({ _id: productId });
    return product;
  }

  async createDummyData() {
    this.model.findOne().then((product) => {
      if (product) {
        console.log("🌿 몽고디비 상품 데이터가 이미 존재합니다");
        console.log("🌿 몽고디비 상품 데이터 생성 작업을 건너 뜁니다.");
        return;
      }
      console.log("🌿 몽고디비 상품 데이터가 존재하지 않습니다.");
      console.log("🌿 몽고디비 상품 데이터 생성 작업 시작");
      this.model
        .create(sampleProduct)
        .then(() => {
          console.log("🌿 몽고디비에 상품 데이터가 채워졌습니다.");
        })
        .catch((err) => {
          console.log("🌿 몽고디비에 상품 데이터 채우기가 실패하였습니다... ");
          console.log(err);
        })
        .finally(() => {
          console.log("🌿 몽고디비 데이터 작업 완료");
        });
    });
  }

  // async read(query) {

  async read(query) {
    let resultProducts = [];
    if (query) {
      return (resultProducts = await this.model.find(query));
    }

    resultProducts = await this.model.find({});
    return resultProducts;
  }

  // 관리자가 상품을 추가할 때
  async create(query) {
    const createdNewUser = await this.model.create(query);
    return createdNewUser;
  }

  // 관리자가 상품 정보를 수정할 때 (한개)
  async findByIdAndUpdate({ id, filter, update }) {
    const updateProduct = await this.model.findByIdAndUpdate(
      id,
      filter,
      update,
      {
        new: true,
      }
    );
    return updateProduct;
  }

  // 관리자가 상품을 여러개 수정할 때
  async updateMany({ filter, update }) {
    const updateProduct = await this.model.updateMany(filter, update, {
      new: true,
    });
    return updateProduct;
  }

  // 관리자가 상품을 삭제할 때
  async deleteOne(filter) {
    const deleteProduct = await this.model.deleteOne(filter);
    return deleteProduct;
  }

  // 관리자가 상품을 여러개 삭제할때
  async deleteMany(filter) {
    const deleteProduct = await this.model.deleteMany(filter);
    return deleteProduct;
  }

  /* bulkWrite
	  여러 개의 문서를 한 번의 요청으로 생성, 업데이트, 삭제, 대체 등의 작업을 수행할 수 있다.
	  이 메서드를 사용하면 데이터베이스와의 통신을 최소화하여 성능을 향상시킬 수 있다.
	*/
  async bulkWrite(operations = [], options = {}) {
    const bulkWrite = await this.model.bulkWrite(operations, options);
    return bulkWrite;
  }
}

const productModel = new ProductModel();

export { productModel };
