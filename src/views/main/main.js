const productEl = document.querySelector(".product__container");

let page = 1;
const perPage = 8;
let isLoading = false;

const product = (product) => `
<article>
  <a 
    href="/products/detail?productId=${product._id}"
    class="product__img" 
  >
    <img src="${product.imageUrl}" />
  </a>
  <div class="product__detail">
    <h3 class="product__title">
      <a href="/products/detail?productId=${product._id}">
        ${product.productName}
      </a>
    </h3>
    <p class="product__price">${product.price.toLocaleString()}원</p>
  </div>
</article>
`;

//상품 목록 가져오기
async function getProducts(page = 1, perPage = 8) {
  const params = new URL(document.location).searchParams;
  const category = params.get("category");
  const api = category
    ? `/api/products?category=${category}&page=${page}&perPage=${perPage}`
    : `/api/products?page=${page}&perPage=${perPage}`;

  try {
    const response = await fetch(api);
    const data = await response.json();
    if (!response.ok) throw new Error(data.reason);
    return data;
  } catch (err) {
    return createErrMsg("🚧 " + err.message);
  }
}

//에러 메시지 출력
function createErrMsg(msg) {
  const errMsg = document.createElement("p");
  errMsg.innerText = msg;
  errMsg.classList.add("errMsg");
  productEl.append(errMsg);
}

//새로운 상품 목록 추가
async function loadMore() {
  isLoading = true;
  const products = await getProducts(++page, perPage);
  if (products && products.length > 0) {
    const template = products.map(product).join("");
    productEl.insertAdjacentHTML("beforeend", template);
    isLoading = false;
  }
}

//무한 스크롤 기능
async function infiniteScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
    await loadMore();
  }
}

//초기 데이터 렌더링
async function renderData() {
  isLoading = true;
  const products = await getProducts();
  if (!products || products.length === 0)
    return createErrMsg("상품이 존재하지 않습니다.");
  const template = products.map(product).join("");
  productEl.insertAdjacentHTML("beforeend", template);
  isLoading = false;
}

await renderData();
window.addEventListener("scroll", infiniteScroll);
