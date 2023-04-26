const token = sessionStorage.getItem("token");

const orderTemplate = (order) => {
  const { _id: orderId, receiver, requestMessage, createdAt } = order;
  const time = createdAt.split(".")[0].replace("T", " ");

  return `
    <article class="order" data-id="${orderId}">
      <p class="order__change">
        <button type="button" class="changeBtn">
          배송 정보 수정
        </button>
      </p>
      <h3>배송 정보</h3>
      <ul class="order__info">
        <li>
          <span>주문 일시</span>
          <p class="receiverName">${time}</p>
        </li>
        <li>
          <span>받는 사람</span>
          <p class="receiverName">${receiver.receiverName}</p>
        </li>
        <li>
          <span>전화번호</span>
          <p class="receiverPhone">${receiver.receiverPhoneNumber}</p>
        </li>
        <li>
          <span>주소</span>
          <div class="receiverAddress">
            <span>(${receiver.postalCode})</span>
            <span>${receiver.address1}</span>
            <span>${receiver.address2}</span>
          </div>
        </li>
        <li>
          <span>배송 요청 사항</span>
          <p class="receiverPhone">${requestMessage}</p>
        </li>
        <li>
          <span>주문 현황</span>
          <p class="orderStatus">결제 완료</p>
        </li>
      </ul>
      <ul class="order__item__list">
      </ul>
      <ul class="order__item__total">
      </ul>
    </article>
  `;
};

const orderItemTemplate = (orderItem, orderStatus) => {
  const {
    _id: orderItemId,
    productId: { _id: productId, imageUrl, company, productName, price },
    itemStatus,
    quantity,
  } = orderItem;
  const isCancelAllowed =
    orderStatus === "결제 완료" && itemStatus !== "취소 완료";
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
        <li>
          주문 상태
          <span class="status">${itemStatus}</span>
        </li>
      </ul>
      <div class="order__item__cancel">
        <button 
          class="cancelBtn${!isCancelAllowed ? " disabled" : ""}"
          ${!isCancelAllowed ? "disabled" : ""}
        >
          주문 취소
        </button>
      </div>
    </li>
    `;
};

const totalTemplate = (totalPrice) => `
  <div class="order__total">
    총 지불 금액
    <span>${totalPrice.toLocaleString()} 원</span>
  </div>
`;

//주문 내역 불러오기
async function getOrders() {
  const api = "/api/orders/list/user";
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const orderData = await response.json();
    if (!response.ok) throw new Error(orderData.reason);
    return orderData;
  } catch (err) {
    alert(err.message);
    location.href = "/";
    // console.error(err.message);
  }
}

//주문 상품 불러오기
async function getOrderItems(orderId) {
  const api = `/api/orderItems/list/order/${orderId}`;
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const orderItemsData = await response.json();
    if (!response.ok) throw new Error(orderData.reason);
    return orderItemsData;
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

//주문 내역 렌더링
function renderOrders(orders) {
  const template = orders.map(orderTemplate).join("");
  const orderListEl = document.querySelector("#orderList");
  orderListEl.insertAdjacentHTML("beforeend", template);
}

//주문 상품 렌더링
async function renderOrderItems(order) {
  const orderItems = await getOrderItems(order._id);
  const template = orderItems
    .map((item) => orderItemTemplate(item, order.orderStatus))
    .join("");
  const orderEl = document.querySelector(`.order[data-id="${order._id}"]`);
  const orderItemListEl = orderEl.querySelector(".order__item__list");
  orderItemListEl.insertAdjacentHTML("beforeend", template);

  addEventListeners();
  renderTotal(order._id);
}

//주문 취소
async function cancelOrderItem(e) {
  e.preventDefault();
  if (window.confirm("해당 상품의 주문을 취소하시겠습니까?")) {
    const orderItem = e.currentTarget.closest(".order__item");
    const quantity = +orderItem
      .querySelector(".quantity")
      .innerText.replace("개", "");
    const orderItemId = orderItem.dataset.itemId;
    const productId = orderItem.dataset.productId;
    const data = {
      orderItemId,
      productId,
      quantity,
      itemStatus: "취소 완료",
    };

    try {
      const JSONdata = JSON.stringify(data);
      const api = "/api/orderItems/update";
      const response = await fetch(api, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSONdata,
      });
      const cancelData = await response.json();
      if (!response.ok) throw new Error(cancelData.reason);
      if (cancelData.itemStatus === "취소 완료") {
        alert("상품 주문이 취소되었습니다.");
        location.href = "/myorder";
      }
    } catch (err) {
      alert("주문 취소에 실패하였습니다. 다시 한번 시도해주세요.");
      //console.error(err.message);
    }
  }
}

//이벤트 핸들러 등록(취소 버튼)
function addEventListeners() {
  const cancelBtns = document.querySelectorAll(".cancelBtn");
  cancelBtns.forEach((btn) => btn.addEventListener("click", cancelOrderItem));
}

//총 지불 금액 렌더링
function renderTotal(orderId) {
  const orderEl = document.querySelector(`.order[data-id="${orderId}"]`);
  const pricesEl = orderEl.querySelectorAll(".totalPrice");
  const prices = [...pricesEl].map((el) =>
    Number(el.innerText.replace(/,/g, "").replace("원", ""))
  );
  const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
  orderEl.insertAdjacentHTML("beforeend", totalTemplate(totalPrice));
}

async function renderData() {
  const orders = await getOrders();
  if (orders.length === 0) {
    alert("주문내역이 없습니다.");
  } else {
    renderOrders(orders);
    await orders.forEach(renderOrderItems);
  }
}

await renderData();
