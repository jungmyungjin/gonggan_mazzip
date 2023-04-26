function preventAccess(type = 0) {
  const msg = type === 0 ? "부적절한 접근입니다." : "페이지가 만료되었습니다.";
  alert(msg);
  location.href = "/";
}

async function getOrder() {}

async function renderData() {}

async function checkAccessibility() {
  const params = new URL(document.location).searchParams;
  const orderId = params.get("orderId");
  //잘못된 url로 접근시 차단
  if (!orderId) preventAccess(0);

  //주문하지 않고 url 접근시 차단
  const orderData = JSON.parse(sessionStorage.getItem("ordered"));
  if (!orderData || orderData.orderId !== orderId) preventAccess(0);

  const hasSeenPage = orderData.hasSeenOrderCompletePage;
  //이미 봤던 페이지를 다시 보려고 하는 경우 차단
  if (hasSeenPage) preventAccess(1);

  await renderData();
}

await checkAccessibility();
