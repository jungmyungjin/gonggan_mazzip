import { Quantity } from '../utils.js';
const productList = document.querySelector('.product-list');

const dummyData =
  '[{"productName": "상품1", "company": "회사1", "price": "10000", "quantity": "1", "totalPrice": "10000"},{"productName": "상품2", "company": "회사2", "price": "20000", "quantity": "2", "totalPrice": "40000"}]';
const cartItems = JSON.parse(dummyData);

// 각 상품에 대한 HTML 코드를 생성합니다.
const productHtml = cartItems
  .map((item) => {
    return `
      <li class="product-item">
        <div class="product-checkbox">
          <input type="checkbox" name="" id="" />
        </div>
        <div class="product-image"></div>
        <div class="product-detail">
          <div class="product-company">${item.company}</div>
          <div class="product-name">${item.productName}</div>
          <div class="product-price">${item.price}</div>
          <div class="product-quantity">
            <button type="button" class="minusBtn">-</button>
            <span class="quantity">${item.quantity}</span>
            <button type="button" class="plusBtn">+</button>
          </div>
          <div class="product-total-price"></div>
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

// 생성한 HTML 코드를 productList에 삽입합니다.
productList.innerHTML += productHtml;

// productList.addEventListener('click', (event) => {
//   const target = event.target;
//   if (target.classList.contains('minusBtn') || target.classList.contains('plusBtn')) {
//     const quantityEl = target.parentNode.querySelector('.quantity');
//     let quantity = Number(quantityEl.textContent);
//     if (target.classList.contains('minusBtn')) {
//       if (quantity > 1) {
//         quantity--;
//       }
//     } else if (target.classList.contains('plusBtn')) {
//       quantity++;
//     }
//     quantityEl.textContent = quantity;
//   }
// });

const minusBtn = document.querySelector('.minusBtn');
const plusBtn = document.querySelector('.plusBtn');
const quantityEl = document.querySelector('.quantity');
const priceEl = document.querySelector('.product-price');
const totalPriceEl = document.querySelector('.product-total-price');

const quantity = new Quantity({
  quantityEl,
  priceEl,
  totalPriceEl,
});
minusBtn.addEventListener('click', () => quantity.change(-1));
plusBtn.addEventListener('click', () => quantity.change(1));
