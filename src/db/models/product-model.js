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
        console.log("🌿 몽고디비 더미데이터가 이미 존재합니다");
        console.log("🌿 몽고디비 더미데이터 생성 작업을 건너 뜁니다.");
        return;
      }
      console.log("🌿 몽고디비 더미데이터가 존재하지 않습니다.");
      console.log("🌿 몽고디비 더미데이터 생성 작업 시작");
      this.model
        .create(sampleProduct)
        .then(() => {
          console.log("🌿 몽고디비에 더미데이터가 채워졌습니다.");
        })
        .catch((err) => {
          console.log("🌿 몽고디비에 더미데이터 채우기에 실패하였습니다... ");
          console.log(err);
        })
        .finally(() => {
          console.log("🌿 몽고디비 createDummyData 작업 완료");
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

  // TODO: 관리자 페이지 추가 후 사용 예정
  async create(query) {
    const createdNewUser = await this.model.create(query);
    return createdNewUser;
  }

  async update({ filter, update }) {
    const updateProduct = await this.model.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updateProduct;
  }

  async delete(filter) {
    const deleteProduct = await this.model.deleteOne({ filter });
    return deleteProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
