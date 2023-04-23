const url = '/api/users';

// 서버에서 유저 정보를 받아옴
async function getUserInfo() {
  try {
    const response = await fetch(url);
    const userInfo = await response.json();

    // 유저 정보를 입력 폼에 넣음
    emailInput.value = userInfo.email;
    nameInput.value = userInfo.name;
    phoneInput.value = userInfo.phone;
    address1Input.value = userInfo.address1;
    address2Input.value = userInfo.address2;
    passwordInput.value = '';
    newPasswordInput.value = '';
    confirmNewPasswordInput.value = '';
    return userInfo;
  } catch (error) {
    console.error(error);
    submitErrorMessageDiv.innerHTML =
      '<p>서버와 통신 중 오류가 발생했습니다.</p>';
  }
}

export default getUserInfo;
