import mongoose from "mongoose";
import { ProductSchema } from "../schemas/product-schema";
const sampleProduct = require("../sampleData/sampleProduct");

class ProductModel {
  constructor() {
    this.model = mongoose.model("Product", ProductSchema);
  }

  async fineOne() {
    const product = await this.model.findOne({});
    return product;
  }

  async createDummyData() {
    this.fineOne().then((product) => {
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
          console.err("🌿 몽고디비에 더미데이터 채우기에 실패하였습니다... ");
        })
        .finally(() => {
          console.log("🌿 몽고디비 createDummyData 작업 완료");
        });
    });
  }

  // TODO: api CURD 관련 모델 추가
}

const productModel = new ProductModel();

export { productModel };
