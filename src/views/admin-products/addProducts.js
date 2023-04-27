const addProductForm = document.querySelector('#addProductForm');

addProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(addProductForm);
  const data = Object.fromEntries(formData);

  const products = [{ ...data }];
  const requestBody = { products };
  console.log(requestBody);
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  alert('상품이 추가되었습니다.');
  addProductForm.reset();
  location.reload();
});
