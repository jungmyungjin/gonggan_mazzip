//1. 로그인 인증 (로그인 안 했을시 리다이렉트)
//2. user 정보 갖고 오기
//3. 장바구니 상품 목록 정보 갖고 오기
//4. 결제하기 클릭시 결제 정보 넘겨주기
const searchAddressBtn = document.querySelector("#searchAddressBtn");
const form = document.querySelector("form");

//주소찾기 (Daum 주소 API)
function searchAddress() {
  const postalCodeInput = document.querySelector("input[title=postalCode]");
  const address1Input = document.querySelector("input[title=address1]");
  const address2Input = document.querySelector("input[title=address2]");
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}

//유저 정보 가져오기
async function getUserInfo() {
  const token = sessionStorage.getItem("token");
  const api = "/api/users/info";
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userInfo = await response.json();
    if (response.status === 400 || response.status === 401) {
      alert(userInfo.reason);
      location.href = "/";
    }
    return userInfo;
  } catch (err) {
    console.error(err);
  }
}

//유저 정보 데이터바인딩
async function renderUserData() {
  const ordererName = document.querySelector("#ordererName");
  const ordererEmail = document.querySelector("#ordererEmail");
  const ordererPhone = document.querySelector("#ordererPhone");
  const userInfo = await getUserInfo();

  if (ordererName) ordererName.innerText = userInfo.name;
  if (ordererEmail) ordererEmail.innerText = userInfo.email;
  if (ordererPhone) ordererPhone.innerText = userInfo.phoneNumber;
}

//총액 계산
function calculateTotal(cartItems) {
  const totalPriceEl = document.querySelectorAll(".totalPrice");
  const sum = cartItems.reduce((acc, cur) => {
    acc += Number(cur.price) * Number(cur.quantity);
    return acc;
  }, 0);
  const total = sum.toLocaleString() + "원";
  totalPriceEl.forEach((el) => (el.innerText = total));
}

//주문 목록 데이터바인딩
function renderCartItems() {
  const productsEl = document.querySelector(".order__products");
  const cartItems = JSON.parse(localStorage.getItem("checkedItems"));
  calculateTotal(cartItems);
  const cartItem = (product) => `
    <li>
      <div class="product__image" id="productImg">
        <a href="/products/detail?productId=${product._id}">
          <img src="${product.imageUrl}" />
        </a>
      </div>
      <ul class="product__detail">
        <li>
          <span class="company">${product.company}</span>
        </li>
        <li>
          <a href="/products/detail?productId=${
            product._id
          }" class="productName">${product.productName}</a>
        </li>
        <li>
          <span class="productPrice">${product.price.toLocaleString()}원</span>
          <span class="quantity">${product.quantity}개</span>
        </li>
        <li>
          총 합계 금액
          <span class="productTotalPrice">${(
            product.price * product.quantity
          ).toLocaleString()}원</span>
        </li>
      </ul>
    </li>
  `;
  const template = cartItems.map(cartItem).join("");
  productsEl.insertAdjacentHTML("beforeend", template);
}

//주문 완료
function completeOrder(orderedItems) {
  //주문할 상품 목록 지우기
  localStorage.removeItem("checkedItems");

  //장바구니에서 주문한 상품 목록 지우기
  const oldCartItems = JSON.parse(localStorage.getItem("cartItems"));
  const orderedItemsIds = orderedItems.map((item) => item.productId);
  const newCartItems = [...oldCartItems].filter(
    (item) => !orderedItemsIds.includes(item.productId)
  );
  localStorage.setItem("cartItems", JSON.stringify(newCartItems));

  alert("주문이 완료되었습니다!");
  location.href = "/";
}

//주문 생성
async function createOrder() {
  const receiverEl = document.querySelector(".receiver__info");
  const receiverName = receiverEl.querySelector("#receiverName").value;
  const receiverPhoneNumber = receiverEl.querySelector("#receiverPhone").value;
  const postalCode = receiverEl.querySelector("input[title=postalCode]").value;
  const address1 = receiverEl.querySelector("input[title=address1]").value;
  const address2 = receiverEl.querySelector("input[title=address2]").value;
  const requestMessage = receiverEl.querySelector("#request").value;

  if (
    !receiverName ||
    !receiverPhoneNumber ||
    !postalCode ||
    !address1 ||
    !address2
  ) {
    return alert("배송 정보를 입력해주세요.");
  }

  const api = "/api/orders/create";
  const token = sessionStorage.getItem("token");
  const data = {
    receiver: {
      receiverName,
      receiverPhoneNumber,
      postalCode,
      address1,
      address2,
    },
    requestMessage,
  };

  try {
    const JSONdata = JSON.stringify(data);
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSONdata,
    });

    if (response.status !== 201) {
      alert(data.reason);
      location.href = "/";
    }

    const orderResult = await response.json();
    const orderItemsResult = await createOrderItems(orderResult._id);
    completeOrder(orderItemsResult);
  } catch (err) {
    //api 연결 실패시
    console.error(err.message);
    alert("주문에 실패하였습니다.");
  }
}

//주문 아이템 생성
async function createOrderItems(orderId) {
  const api = "/api/orderItems/create";
  const token = sessionStorage.getItem("token");
  const cartItems = JSON.parse(localStorage.getItem("checkedItems"));
  const data = cartItems.map((item) => {
    return {
      orderId,
      productId: item.productId,
      quantity: item.quantity,
    };
  });
  const JSONdata = JSON.stringify({ items: data });
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSONdata,
  });

  if (response.status !== 201) {
    alert(data.reason);
    location.href = "/";
  }

  const orderItemsResult = await response.json();
  return orderItemsResult;
}

async function handleSubmit(e) {
  e.preventDefault();
  await createOrder();
}

async function renderData() {
  await renderUserData();
  renderCartItems();
}

await renderData();

form.addEventListener("submit", handleSubmit);
searchAddressBtn.addEventListener("click", searchAddress);
