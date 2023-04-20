import { Quantity } from "../utils.js";
const productEl = document.querySelector(".product__container");
const productNameEl = productEl.querySelector("#productName");
const companyEl = productEl.querySelector("#company");
const descriptionEl = productEl.querySelector("#description");
const priceEl = productEl.querySelector("#price");
const quantityEl = productEl.querySelector("#quantity");
const categoryEl = productEl.querySelector("#category");
const totalPriceEl = productEl.querySelector("#totalPrice");

const minusBtn = productEl.querySelector("#minusBtn");
const plusBtn = productEl.querySelector("#plusBtn");

async function renderData() {
  const product = await getProduct();
  productNameEl.innerText = product.productName;
  companyEl.innerText = product.company;
  descriptionEl.innerText = product.description;
  priceEl.innerText = product.price.toLocaleString();
  categoryEl.innerText = product.category;
  totalPriceEl.innerText = priceEl.innerText;
}

async function getProduct() {
  const api = null;
  if (api) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //mock data
  return {
    productName: "비스포크 냉장고 코타 슬림 아이스메이커",
    price: 1459000,
    company: "삼성전자",
    category: "가전",
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis
    atque ea ullam sequi maxime qui. Accusamus blanditiis tempora ad
    deleniti.`,
  };
}

await renderData();

const quantity = new Quantity({
  quantityEl,
  priceEl,
  totalPriceEl,
});
minusBtn.addEventListener("click", () => quantity.change(-1));
plusBtn.addEventListener("click", () => quantity.change(1));
