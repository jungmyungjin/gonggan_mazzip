import { v4 as uuidv4 } from "uuid";

const orders = [
  {
    orderId: uuidv4(),
    userId: "64421089a6b3f4e560742116",
    receiver: {
      receiverName: "김성수",
      receiverPhoneNumber: "010-1234-5678",
      postalCode: "04799",
      address1: "서울특별시 성동구 성수동2가 280",
      address2: "2층 엘리스 Lab",
    },
    requestMessage: "문 앞에 놓고 가주세요.",
    orderStatus: "결제 완료",
  },
  {
    orderId: uuidv4(),
    userId: "6442108aa6b3f4e560742119",
    receiver: {
      receiverName: "안리수",
      receiverPhoneNumber: "010-9876-5432",
      postalCode: "48059",
      address1: "부산광역시 해운대구 우동 1475",
      address2: "센텀벤처타운",
    },
    requestMessage: "소화기 앞에 놓고 가주세요.",
    orderStatus: "상품 준비 중",
  },
];

export default { orders };
