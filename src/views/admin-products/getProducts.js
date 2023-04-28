const productTable = document.querySelector('#productTable');

const checkAdminRole = async () => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    alert('권한이 없습니다. 메인 페이지로 이동합니다.');
    window.location.href = '/';
    return;
  }

  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert('권한 확인 중 오류가 발생했습니다. 메인 페이지로 이동합니다.');
      window.location.href = '/';
      return;
    }

    const userData = await response.json();

    if (userData.role !== 'admin') {
      alert('권한이 없습니다. 메인 페이지로 이동합니다.');
      window.location.href = '/';
    }
  } catch (error) {
    alert('권한 확인 중 오류가 발생했습니다. 메인 페이지로 이동합니다.');
    window.location.href = '/';
  }
};

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();

    // _id 대신 productId를 사용
    const products = data.map((product) => ({
      productId: product._id,
      productName: product.productName,
      company: product.company,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      category: product.category,
      description: product.description,
    }));

    return products;
  } catch (error) {}
}

async function displayProducts() {
  const data = await fetchProducts();

  data.forEach((product) => {
    const newRow = productTable.insertRow(-1);

    const productNameCell = newRow.insertCell(0);
    productNameCell.innerText = product.productName;

    const companyCell = newRow.insertCell(1);
    companyCell.innerText = product.company;

    const priceCell = newRow.insertCell(2);
    priceCell.innerText = product.price.toLocaleString();

    const stockCell = newRow.insertCell(3);
    stockCell.innerText = product.stock;

    const imageUrlCell = newRow.insertCell(4);
    imageUrlCell.innerText = product.imageUrl;

    const categoryCell = newRow.insertCell(5);
    categoryCell.innerText = product.category;

    const descriptionCell = newRow.insertCell(6);
    descriptionCell.innerText = product.description;

    const editCell = newRow.insertCell(7);
    const editBtn = document.createElement('button');
    editBtn.innerText = '수정';
    editCell.appendChild(editBtn);

    const delCell = newRow.insertCell(8);
    const delBtn = document.createElement('button');
    delBtn.innerText = '삭제';
    delBtn.classList.add('delBtn');
    delBtn.setAttribute('data-id', product.productId);
    delCell.appendChild(delBtn);
  });
}
// 페이지가 로드될 때 권한 확인
checkAdminRole();

displayProducts();
