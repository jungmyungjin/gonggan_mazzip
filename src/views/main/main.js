const productEl = document.querySelector(".product__container");

async function getProducts() {
  const params = new URL(document.location).searchParams;
  const category = params.get("category");
  const api = category ? `/api/products?category=${category}` : "/api/products";
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.reason);
    return createErrMsg("🚧 상품을 불러오는데 실패하였습니다.");
  }
}

function createErrMsg(msg) {
  const errMsg = document.createElement("p");
  errMsg.innerText = msg;
  errMsg.classList.add("errMsg");
  productEl.append(errMsg);
}

async function renderData() {
  const products = await getProducts();
  if (products.length === 0)
    return createErrMsg("🚧 해당 카테고리의 상품이 존재하지 않습니다.");

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
        <p class="product__price">${product.price}원</p>
      </div>
    </article>
  `;
  const template = products.map(product).join("");
  productEl.insertAdjacentHTML("beforeend", template);
}

await renderData();
