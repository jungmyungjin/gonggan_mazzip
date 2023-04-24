import { Quantity } from "/utils.js";
const productEl = document.querySelector(".product__container");
const productNameEl = productEl.querySelector("#productName");
const productImageEl = productEl.querySelector("#productImage");
const companyEl = productEl.querySelector("#company");
const descriptionEl = productEl.querySelector("#description");
const priceEl = productEl.querySelector("#price");
const quantityEl = productEl.querySelector("#quantity");
const categoryEl = productEl.querySelector("#category");
const totalPriceEl = productEl.querySelector("#totalPrice");

const minusBtn = productEl.querySelector("#minusBtn");
const plusBtn = productEl.querySelector("#plusBtn");
const buyBtn = productEl.querySelector("#buyBtn");

const CATEGORY = {
  furniture: "가구",
  fabric: "패브릭",
  electronic: "가전",
  cooking: "주방용품",
  lightings: "조명",
};

//상품 정보 불러오기
async function getProduct() {
  const params = new URL(document.location).searchParams;
  const productId = params.get("productId");
  const api = `/api/products/${productId}`;
  try {
    const response = await fetch(api);
    const data = await response.json();

    //존재하는 상품이 없을시
    if (response.status === 400) {
      alert(data.reason);
      location.href = "/";
    }

    return data;
  } catch (err) {
    //api 연결 실패시
    console.error(err.message);
    alert("상품 불러오기에 실패하였습니다.");
    location.href = "/";
  }
}

async function renderData() {
  const product = await getProduct();
  if (productNameEl) productNameEl.innerText = product.productName;
  if (productImageEl) {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    productImageEl.append(img);
  }
  if (companyEl) companyEl.innerText = product.company;
  if (descriptionEl) descriptionEl.innerText = product.description;
  if (priceEl) priceEl.innerText = product.price.toLocaleString();
  if (categoryEl) {
    categoryEl.innerText = CATEGORY[product.category];
    categoryEl.href = `/?category=${product.category}`;
  }
  if (totalPriceEl) totalPriceEl.innerText = priceEl.innerText;

  addEventListeners();
}

function addEventListeners() {
  //수량 변경
  const quantity = new Quantity({
    quantityEl,
    priceEl,
    totalPriceEl,
  });
  minusBtn.addEventListener("click", () => quantity.change(-1));
  plusBtn.addEventListener("click", () => quantity.change(1));
  buyBtn.addEventListener("click", moveToOrder);
}

//결제 페이지로 이동
async function moveToOrder() {
  const product = await getProduct();
  const data = [
    {
      productId: product._id,
      quantity: Number(quantityEl.innerText),
      ...product,
    },
  ];
  delete data._id;

  //구매할 상품 정보 업데이트
  localStorage.setItem("checkedItems", JSON.stringify(data));
  location.href = "/order";
}

await renderData();
