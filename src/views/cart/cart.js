const productList = document.querySelector('.product-list');

// 데이터 가져와서 HTML에 뿌려주기
fetch('dummy.json')
  .then((response) => response.json())
  .then((data) => {
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
          const item = data[index];
          total += item.price * item.quantity;
        }
      });

      totalEl.textContent = `${total.toLocaleString()}원`;
      orderEl.textContent = `${total.toLocaleString()}원`;
    }

    const productHtml = data
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
            <div class="product-price">${item.price.toLocaleString()}</div>
            <div class="product-quantity">
              <button type="button" class="minusBtn">-</button>
              <span class="quantity">${item.quantity}</span>
              <button type="button" class="plusBtn">+</button>
            </div>
            <div class="product-total-price">${(
              item.price * item.quantity
            ).toLocaleString()}</div>
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

    // 생성한 HTML 코드를 productList에 삽입
    productList.innerHTML += productHtml;

    document.querySelectorAll('.product-item').forEach((item, index) => {
      const minusBtn = item.querySelector('.minusBtn');
      const plusBtn = item.querySelector('.plusBtn');
      const quantityEl = item.querySelector('.quantity');
      const priceEl = item.querySelector('.product-price');
      const totalPriceEl = item.querySelector('.product-total-price');

      const changeQuantity = (num) => {
        const currentQuantity = Number(quantityEl.innerText);
        const currentPrice = parseInt(priceEl.innerText.replaceAll(',', ''));

        if (currentQuantity + num > 0) {
          const newQuantity = currentQuantity + num;
          quantityEl.innerText = newQuantity;

          const newTotalPrice = newQuantity * currentPrice;
          totalPriceEl.innerText = newTotalPrice.toLocaleString();

          data[index].quantity = newQuantity;
          data[index].totalPrice = newTotalPrice;
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
    calculateTotal();
  });
