const token = sessionStorage.getItem("token");

const orderItemTemplate = (orderItem) => {
  const {
    _id: orderItemId,
    productId: { _id: productId, imageUrl, company, productName, price },
    quantity,
  } = orderItem;
  return `
    <li class="order__item" data-item-id="${orderItemId}" data-product-id="${productId}">
      <div class="order__item__image">
        <a href="/products/detail/?productId=${productId}">
          <img src="${imageUrl}" />
        </a>
      </div>
      <ul class="order__item__detail">
        <li>
          <span class="company">${company}</span>
        </li>
        <li>
          <a href="/products/detail/?productId=${productId}" class="productName">
            ${productName}
          </a>
        </li>
        <li>
          <span class="price">${price.toLocaleString()}원</span>
          <span class="quantity">${quantity}개</span>
        </li>
        <li>
          총 결제 금액
          <span class="totalPrice">
          ${(price * quantity).toLocaleString()}원
          </span>
        </li>
      </ul>
    </li>
    `;
};

//접근 차단
function preventAccess(type = 0) {
  const msg = type === 0 ? "부적절한 접근입니다." : "페이지가 만료되었습니다.";
  alert(msg);
  location.href = "/";
}

//주문 내역 정보 가져오기 (API: orderItems)
async function getOrder(orderId) {
  try {
    const api = `/api/orderItems/list/order/${orderId}`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.reason);
    return data;
  } catch (err) {
    alert("주문 완료 내역을 불러오기에 실패하였습니다.");
    console.error(err.message);
  }
}

//주문 총액 렌더링
function renderTotal() {
  const orderItemListEl = document.querySelector(".order__item__list");
  const totalEl = document.querySelector(".order__total");
  const pricesEl = orderItemListEl.querySelectorAll(".totalPrice");
  const prices = [...pricesEl].map((el) =>
    Number(el.innerText.replace(/,/g, "").replace("원", ""))
  );
  const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
  const template = `총 지불 금액 <span>${totalPrice.toLocaleString()} 원</span>`;
  totalEl.innerHTML = template;
}

//주문 상품 목록 렌더링
function renderOrderItems(orderItems) {
  const orderItemListEl = document.querySelector(".order__item__list");
  const template = orderItems.map(orderItemTemplate).join("");
  orderItemListEl.insertAdjacentHTML("beforeend", template);
}

//주문 내역 렌더링
function renderOrder(orderItems) {
  const orderEl = document.querySelector("#order");
  const order = orderItems[0].orderId;
  const { receiver, requestMessage, createdAt } = order;
  const time = createdAt.split(".")[0].replace("T", " ");
  const orderTime = orderEl.querySelector(".orderTime");
  const receiverName = orderEl.querySelector(".receiverName");
  const receiverPhone = orderEl.querySelector(".receiverPhone");
  const postalCode = orderEl.querySelector(".postalCode");
  const address1 = orderEl.querySelector(".address1");
  const address2 = orderEl.querySelector(".address2");
  const request = orderEl.querySelector(".request");

  if (orderTime) orderTime.innerText = time;
  if (receiverName) receiverName.innerText = receiver.receiverName;
  if (receiverPhone) receiverPhone.innerText = receiver.receiverPhoneNumber;
  if (postalCode) postalCode.innerText = receiver.postalCode;
  if (address1) address1.innerText = receiver.address1;
  if (address2) address2.innerText = receiver.address2;
  if (request) request.innerText = requestMessage;
}

//전체 렌더링
async function renderData(orderId) {
  const orderItems = await getOrder(orderId);
  renderOrder(orderItems);
  renderOrderItems(orderItems);
  renderTotal();

  //페이지 만료
  const orderData = JSON.parse(sessionStorage.getItem("ordered"));
  const updateOrderData = { ...orderData, hasSeenOrderCompletePage: true };
  sessionStorage.setItem("ordered", JSON.stringify(updateOrderData));
}

//접근 자격 확인
async function checkAccessibility() {
  const params = new URL(document.location).searchParams;
  const orderId = params.get("orderId");
  //로그인하지 않은 경우 차단
  if (!token) return (location.href = "/login");

  //잘못된 url로 접근시 차단
  if (!orderId) return preventAccess(0);

  //주문하지 않고 url 접근시 차단
  const orderData = JSON.parse(sessionStorage.getItem("ordered"));
  if (!orderData || orderData.orderId !== orderId) return preventAccess(0);

  //이미 봤던 페이지를 다시 보려고 하는 경우 차단
  const hasSeenPage = orderData.hasSeenOrderCompletePage;
  if (hasSeenPage) return preventAccess(1);

  await renderData(orderId);
}

await checkAccessibility();
