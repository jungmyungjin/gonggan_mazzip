const editProductForm = document.querySelector('#editProductForm');

// 선택된 상품 정보를 폼에 입력
function fillFormWithSelectedProduct(product) {
  editProductForm.setAttribute('data-id', product.productId);
  editProductForm.productName.value = product.productName;
  editProductForm.company.value = product.company;
  editProductForm.price.value = product.price;
  editProductForm.stock.value = product.stock;
  editProductForm.imageUrl.value = product.imageUrl;
  editProductForm.category.value = product.category;
  editProductForm.description.value = product.description;
}

// 선택된 상품 정보 가져오기
async function fetchSelectedProduct(productId) {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();

    const selectedProduct = data
      .map((product) => ({
        productId: product._id,
        productName: product.productName,
        company: product.company,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        category: product.category,
        description: product.description,
      }))
      .find((product) => product.productId === productId); // 수정된 코드

    return selectedProduct;
  } catch (error) {}
}

// 수정 버튼 클릭 시, 선택된 상품 정보를 폼에 입력
productTable.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.innerText === '수정') {
    const selectedRow = event.target.parentNode.parentNode;
    const selectedProductId = selectedRow
      .querySelector('.delBtn')
      .getAttribute('data-id');

    const selectedProduct = await fetchSelectedProduct(selectedProductId);
    editProductForm.setAttribute('data-id', selectedProductId);
    fillFormWithSelectedProduct(selectedProduct);
  }
});

// 상품 정보 수정 요청
editProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const editedProduct = {
    productId: event.target.getAttribute('data-id'),
    productName: editProductForm.productName.value,
    company: editProductForm.company.value,
    price: editProductForm.price.value,
    stock: editProductForm.stock.value,
    imageUrl: editProductForm.imageUrl.value,
    category: editProductForm.category.value,
    description: editProductForm.description.value,
  };

  const products = [editedProduct];
  console.log(products);
  try {
    const response = await fetch('/api/products', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({ products }),
    });

    if (response.ok) {
      // 수정이 성공적으로 완료된 경우, 페이지 새로고침
      location.reload();
    }
  } catch (error) {}
});
