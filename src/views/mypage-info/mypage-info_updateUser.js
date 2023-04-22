async function updateUser(userInfo, updateData) {
  const url = `/api/user/udate`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
    submitErrorMessageDiv.innerHTML =
      '<p>서버와 통신 중 오류가 발생했습니다.</p>';
  }
}

export default updateUser;
