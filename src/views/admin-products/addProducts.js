const addProductForm = document.querySelector('#addProductForm');
const backBtn = document.querySelector('#backBtn');
const logoutBtn = document.querySelector('#logoutBtn');

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

backBtn.addEventListener('click', () => {
  location.href = '/admin';
});

logoutBtn.addEventListener('click', () => {
  if (window.confirm('로그아웃 하시겠습니까?')) {
    sessionStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    location.href = '/';
  }
});
