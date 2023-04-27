// delProducts.js
const productTable = document.querySelector('#productTable');

productTable.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delBtn')) {
    const productId = event.target.dataset.id;

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        event.target.parentElement.parentElement.remove();
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData.reason}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
});
