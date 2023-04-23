import { searchAddress } from '/mypage-info/mypage-info_daumAPI.js';
import { getUserInfo } from '/mypage-info/mypage-info_getUserInfo.js';

const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const currentPassword = document.getElementById('currentPassword');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const phoneInput = document.getElementById('phone');
const postalCode = document.getElementById('postalCode');
const address1Input = document.getElementById('address1');
const address2Input = document.getElementById('address2');
const errorMessageDiv = document.getElementById('errorMessage');
const submitErrorMessageDiv = document.getElementById('submit_errMessage');
const form = document.querySelector('form');
const userDeleteButton = document.getElementById('userDelete');
const searchAddressBtn = document.querySelector('#searchAddressButton');

// 페이지가 로드되면 유저 정보 받기
window.addEventListener('load', async () => {
  let userInfo;
  // 토큰 여부를 확인해서 로그인 상태를 확인
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  if (!isLoggedIn) {
    alert('로그인 후 이용해주세요.');
    window.location.href = '/'; // 메인 페이지로 이동
    return;
  }

  // 로그인 상태인 경우
  try {
    const data = await getUserInfo();

    // 각각의 input 창에 데이터 출력
    emailInput.value = data.email || '';
    nameInput.value = data.name || '';
    phoneInput.value = data.phoneNumber || '';
    postalCode.value = data.address.postalCode || '';
    address1Input.value = data.address.address1 || '';
    address2Input.value = data.address.address2 || '';

    userInfo = data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    window.location.href = '/';
  }
});

// 회원 정보 수정 폼 제출 이벤트 리스너 등록
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 입력 값 검증
  if (!currentPassword.value) {
    alert('회원 정보를 수정하려면 현재 비밀번호를 입력해주세요.');
    return;
  }

  if (password.value && password.value !== confirmPassword.value) {
    errorMessageDiv.textContent =
      '변경 비밀번호와 확인 값이 일치하지 않습니다.';
    return;
  }

  // 서버에 입력값 전송
  const updateData = {
    phoneNumber: phoneInput.value,
    address: {
      postalCode: postalCode.value,
      address1: address1Input.value,
      address2: address2Input.value,
    },
    currentPassword: currentPassword.value,
    password: password.value,
  };

  try {
    const response = await fetch('/api/users/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      alert('비밀번호가 일치하지 않습니다! 다시 확인 해주세요!!');
    } else {
      const updatedUserInfo = await response.json();

      alert('회원 정보가 수정되었습니다.');
      window.location.reload();
    }
  } catch (error) {
    submitErrorMessageDiv.textContent = error.message;
  }
});

userDeleteButton.addEventListener('click', async () => {
  try {
    // API 호출하여 회원 정보 삭제
    const response = await fetch('/api/users/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    const data = await response.json();

    // 세션 스토리지에 저장되어 있는 로그인 토큰 삭제
    sessionStorage.removeItem('token');
    alert('회원 탈퇴가 성공적으로 이루어졌습니다.');

    // 메인 페이지로 이동
    window.location.href = '/';
  } catch (error) {
    // 에러 메시지 출력
    throw new Error('회원 정보 삭제 중 오류가 발생했습니다.');
  }
});

// 주소찾기 버튼에 click 이벤트 리스너 등록
searchAddressBtn.addEventListener('click', function () {
  searchAddress();
});
