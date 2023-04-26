const token = sessionStorage.getItem("token");

function preventAccess(type = 0) {
  const msg = type === 0 ? "부적절한 접근입니다." : "페이지가 만료되었습니다.";
  alert(msg);
  location.href = "/";
}

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

async function renderData(orderId) {
  const order = await getOrder(orderId);
  console.log(order);
}

async function checkAccessibility() {
  const params = new URL(document.location).searchParams;
  const orderId = params.get("orderId");
  //로그인하지 않은 경우 차단
  if (!token) location.href = "/login";

  //잘못된 url로 접근시 차단
  if (!orderId) preventAccess(0);

  //주문하지 않고 url 접근시 차단
  const orderData = JSON.parse(sessionStorage.getItem("ordered"));
  if (!orderData || orderData.orderId !== orderId) preventAccess(0);

  const hasSeenPage = orderData.hasSeenOrderCompletePage;
  //이미 봤던 페이지를 다시 보려고 하는 경우 차단
  if (hasSeenPage) preventAccess(1);

  await renderData(orderId);
}

await checkAccessibility();
