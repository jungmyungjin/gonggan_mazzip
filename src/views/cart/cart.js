const productList = document.querySelector('.product-list');
const main = document.querySelector('main');
const purchaseButton = document.querySelector('#purchaseButton');

// 로컬 스토리지에서 데이터 가져오기
const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

// 상품 총액 계산
function calculateTotal() {
  const checkboxes = document.querySelectorAll(
    '.product-item input[type="checkbox"]'
  );
  const totalEl = document.querySelector('#productsTotal');
  const orderEl = document.querySelector('#orderTotal');

  let total = 0;

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const item = cartItems[index];
      total += item.price * item.quantity;
    }
  });

  totalEl.textContent = `${total.toLocaleString()} 원`;
  orderEl.textContent = `${total.toLocaleString()} 원`;
}

const productHtml = cartItems
  .map((item) => {
    return `
        <li class="product-item">
          <div class="product-checkbox">
            <input type="checkbox" name="" id="" checked />
          </div>
          <div class="product-image" style="background-image: url(${
            item.imageUrl
          });"></div>
          <div class="product-detail">
            <div class="product-company">${item.company}</div>
            <div class="product-name">${item.productName}</div>
            <div class="product-price">${item.price.toLocaleString()} 원</div>
            <div class="product-quantity">
              <button type="button" class="minusBtn">-</button>
              <span class="quantity">${item.quantity}</span>
              <button type="button" class="plusBtn">+</button>
            </div>
            <div class="product-total-price">${(
              item.price * item.quantity
            ).toLocaleString()} 원</div>
          </div>
          <span class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
              <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
            </svg>
          </span>
        </li>
      `;
  })
  .join('');

function showEmptyCartMessage() {
  main.innerHTML = `
      <div class="empty-cart">
        <p>장바구니에 담긴 상품이 없습니다.</p>
        <button class="button is-info" id="goShoppingButton">쇼핑하러 가기</button>
      </div>
    `;

  const goShoppingButton = document.querySelector('#goShoppingButton');
  goShoppingButton.addEventListener('click', () => {
    window.location.href = '/'; // 메인 페이지로 이동
  });
}

if (cartItems.length === 0) {
  // 장바구니가 비어 있는 경우
  showEmptyCartMessage();
} else {
  // 생성한 HTML 코드를 productList에 삽입
  productList.innerHTML += productHtml;

  document.querySelectorAll('.product-item').forEach((item, index) => {
    const minusBtn = item.querySelector('.minusBtn');
    const plusBtn = item.querySelector('.plusBtn');
    const quantityEl = item.querySelector('.quantity');
    const priceEl = item.querySelector('.product-price');
    const totalPriceEl = item.querySelector('.product-total-price');

    // minusBtn, plusBtn 버튼 기능
    const changeQuantity = (num) => {
      const currentQuantity = Number(quantityEl.innerText);
      const currentPrice = parseInt(priceEl.innerText.replaceAll(',', ''));

      if (currentQuantity + num > 0) {
        const newQuantity = currentQuantity + num;
        quantityEl.innerText = newQuantity;

        const newTotalPrice = newQuantity * currentPrice;
        totalPriceEl.innerText = newTotalPrice.toLocaleString() + ' 원';

        cartItems[index].quantity = newQuantity;
        cartItems[index].totalPrice = newTotalPrice;

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // - + 눌렀을 때 로컬스토리지 수량 업데이트
      }
    };

    minusBtn.addEventListener('click', () => {
      changeQuantity(-1);
      calculateTotal();
    });
    plusBtn.addEventListener('click', () => {
      changeQuantity(1);
      calculateTotal();
    });

    // 모두 선택 체크박스 기능 연동
    const productList = document.querySelector('.product-list');
    productList.addEventListener('change', (event) => {
      if (event.target.id === 'allSelectCheckbox') {
        const checkboxes = document.querySelectorAll(
          '.product-checkbox input[type="checkbox"]'
        );
        checkboxes.forEach((checkbox) => {
          checkbox.checked = event.target.checked;
        });
      } else {
        const allCheckbox = document.querySelector('#allSelectCheckbox');
        const checkboxes = document.querySelectorAll(
          '.product-checkbox input[type="checkbox"]'
        );
        const isCheckedAll = [...checkboxes].every(
          (checkbox) => checkbox.checked
        );
        allCheckbox.checked = isCheckedAll;
      }
      calculateTotal();
    });
  });
  // 삭제 버튼 이벤트 추가
  document.querySelectorAll('.product-item').forEach((item, index) => {
    const closeButton = item.querySelector('.close-button');

    closeButton.addEventListener('click', () => {
      const confirmed = confirm('상품을 장바구니에서 삭제 하시겠어요?');
      if (confirmed) {
        // 상품 삭제
        productList.removeChild(item);
        cartItems.splice(index, 1);

        // 로컬 스토리지 업데이트
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // 총액 계산
        calculateTotal();

        // 로컬 스토리지가 비었을 경우 showEmptyCartMessage 함수 실행
        if (cartItems.length === 0) {
          showEmptyCartMessage();
        }
      }
    });
  });
}

calculateTotal();

purchaseButton.addEventListener('click', () => {
  const checkedItems = cartItems.filter((item, index) => {
    const checkbox = document.querySelectorAll(
      '.product-item input[type="checkbox"]'
    )[index];
    return checkbox.checked;
  });

  // 로컬 스토리지에 체크된 상품들만 저장
  localStorage.setItem('checkedItems', JSON.stringify(checkedItems));

  // 페이지 이동
  window.location.href = '/order';
});
