const cartBtn = document.querySelector('#cartBtn');

cartBtn.addEventListener('click', () => {
  const productEl = document.querySelector('.product__container');
  const productName = productEl.querySelector('#productName').innerText;
  const productImage = productEl.querySelector('#productImage img').src;
  const company = productEl.querySelector('#company').innerText;
  const price = parseInt(
    productEl.querySelector('#price').innerText.replace(',', '')
  );
  const quantityEl = document.querySelector('.product__quantity .quantity');
  const quantity = parseInt(quantityEl.innerText);
  const params = new URL(document.location).searchParams;
  const productId = params.get('productId');

  const cartItem = {
    productId,
    productName,
    company,
    price,
    quantity,
    imageUrl: productImage,
  };

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingCartItem = cartItems.find(
    (item) => item.productName === productName
  );

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    cartItems.push(cartItem);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  alert('장바구니에 상품이 추가되었습니다.');
});
