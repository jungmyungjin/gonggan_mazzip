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
          <p class="orderTime">${time}</p>
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
            <span class="postalCode">(${receiver.postalCode})</span>
            <span class="address1">${receiver.address1}</span>
            <span class="address2">${receiver.address2}</span>
          </div>
        </li>
        <li>
          <span>배송 요청 사항</span>
          <p class="request">${requestMessage}</p>
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

//주문 내역 불러오기 (API: order)
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

//주문 상품 불러오기 (API: orderItem)
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

//상품 주문 취소 (API: orderItem)
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
      alert("주문 취소에 실패하였습니다.");
      // console.error(err.message);
    }
  }
}

//배송 정보 수정 (API: order)
async function completeChangeOrder(e) {
  e.preventDefault();
  const order = e.currentTarget.closest("article.order");
  const getValue = (className) => order.querySelector(`.${className}`).value;
  const data = {
    orderId: order.dataset.id,
    receiver: {
      receiverName: getValue("receiverName"),
      receiverPhoneNumber: getValue("receiverPhone"),
      postalCode: getValue("postalCode").replace("(", "").replace(")", ""),
      address1: getValue("address1"),
      address2: getValue("address2"),
    },
    requestMessage: getValue("request"),
    orderStatus: order.querySelector(".orderStatus").innerText,
  };

  try {
    const JSONdata = JSON.stringify(data);
    const api = "/api/orders/update";
    const response = await fetch(api, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSONdata,
    });
    const changeData = await response.json();
    if (!response.ok) throw new Error(changeData.reason);
    alert("배송 정보 수정이 완료되었습니다.");
    renderChangeOrder(order, "text");
  } catch (err) {
    alert("배송 정보 수정에 실패하였습니다.");
    //console.error(err.message);
  }
}

//배송 정보 수정 버튼 클릭시 작동
function changeOrder(e) {
  e.preventDefault();
  const order = e.currentTarget.closest("article.order");
  const orderStatus = order.querySelector(".orderStatus").innerText;
  const isChangeAllowed = orderStatus === "결제 완료";
  if (!isChangeAllowed)
    return alert("현재 주문 단계에선 배송 정보를 수정할 수 없습니다.");
  renderChangeOrder(order, "input");
}

//이벤트 핸들러 등록(취소 버튼 및 수정 버튼)
function addEventListeners() {
  const changeBtns = document.querySelectorAll(".changeBtn");
  const cancelBtns = document.querySelectorAll(".cancelBtn");
  cancelBtns.forEach((btn) => btn.addEventListener("click", cancelOrderItem));
  changeBtns.forEach((btn) => btn.addEventListener("click", changeOrder));
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

//주문 정보 수정 및 수정 완료시 렌더링
function renderChangeOrder(order, type) {
  const changeBtn = order.querySelector("button.changeBtn");
  const orderInfo = order.querySelector(".order__info");
  const changes = [
    "receiverName",
    "receiverPhone",
    "postalCode",
    "address1",
    "address2",
    "request",
  ];

  //배송 정보 수정할 수 있게 input으로 변경
  if (type === "input") {
    //버튼 동작 변경
    changeBtn.innerText = "수정 사항 저장";
    changeBtn.removeEventListener("click", changeOrder);
    changeBtn.addEventListener("click", completeChangeOrder);

    //텍스트를 input으로 변경
    changes.forEach((className) => {
      const elements = orderInfo.getElementsByClassName(className);
      Array.from(elements).forEach((element) => {
        const value = element.innerText;
        const input = document.createElement("input");
        input.type = "text";
        input.classList = element.classList;
        input.value = value;
        element.replaceWith(input);

        if (className === "postalCode" || className === "address1") {
          input.readOnly = true;
        }
      });
    });

    //주소찾기 버튼 추가
    const button = document.createElement("button");
    const postalCodeEl = orderInfo.querySelector(".postalCode");
    button.textContent = "주소찾기";
    button.classList.add("addressBtn");
    postalCodeEl.parentNode.insertBefore(button, postalCodeEl.nextSibling);
  }

  //배송 정보 수정 완료 후 텍스트로 변경
  if (type === "text") {
    //버튼 동작 변경
    changeBtn.innerText = "배송 정보 수정";
    changeBtn.removeEventListener("click", completeChangeOrder);
    changeBtn.addEventListener("click", changeOrder);

    //주소 찾기 버튼 제거
    const addressBtn = orderInfo.querySelector(".addressBtn");
    addressBtn.remove();

    const getTagName = (className) => {
      switch (className) {
        case "postalCode":
        case "address1":
        case "address2":
          return "span";
        default:
          return "p";
      }
    };
    //input을 텍스트로 변경
    changes.forEach((className) => {
      const inputs = orderInfo.getElementsByClassName(className);
      Array.from(inputs).forEach((input) => {
        const element = document.createElement(getTagName(className));
        element.classList = input.classList;
        element.innerText = input.value;
        input.replaceWith(element);
      });
    });
  }
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

function renderEmpty() {
  const orderListEl = document.querySelector("#orderList");
  const emptyTemplate = `
    <article class="order empty">
      주문 내역이 없습니다.
    </article>
  `;
  orderListEl.insertAdjacentHTML("beforeend", emptyTemplate);
}

async function renderData() {
  const orders = await getOrders();
  if (orders.length === 0) {
    renderEmpty();
  } else {
    renderOrders(orders);
    await orders.forEach(renderOrderItems);
  }
}

await renderData();
