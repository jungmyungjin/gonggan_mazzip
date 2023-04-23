import updateUser from '/mypage-info/mypage-info_updateUser.js';
import deleteUser from '/mypage-info/mypage-info-userDelete.js';

const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const newPasswordInput = document.getElementById('new_password');
const confirmNewPasswordInput = document.getElementById('confirm_new_password');
const phoneInput = document.getElementById('phone');
const postalCode = document.getElementById('postalCode');
const address1Input = document.getElementById('address1');
const address2Input = document.getElementById('address2');
const errorMessageDiv = document.getElementById('errorMessage');
const submitErrorMessageDiv = document.getElementById('submit_errMessage');
const form = document.querySelector('form');
const userDeleteButton = document.getElementById('userDelete');
const searchAddressBtn = document.querySelector('#searchAddressButton');

let userInfo;

// 페이지가 로드되면 유저 정보 받기
window.addEventListener('load', async () => {
  // 토큰 여부를 확인해서 로그인 상태를 확인
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  if (!isLoggedIn) {
    alert('로그인 후 이용해주세요.');
    window.location.href = '/'; // 메인 페이지로 이동
    return;
  }

  // 로그인 상태인 경우
  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    const data = await response.json();

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
    alert('회원정보를 가져오는 중 오류가 발생했습니다.');
    window.location.href = '/';
  }
});

// 폼 제출 이벤트
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // 폼 제출 막기

  const currentPassword = passwordInput.value;
  const newPassword = newPasswordInput.value;
  const confirmNewPassword = confirmNewPasswordInput.value;
  const phone = phoneInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;

  let errorMessage = '';

  // 변경된 정보를 저장할 객체
  const updateData = {};

  // 비밀번호 변경을 위한 값 입력 확인
  if (
    newPassword !== '' ||
    confirmNewPassword !== '' ||
    currentPassword !== ''
  ) {
    // 원래 비밀번호 확인
    const passwordCheckResponse = await fetch('/api/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({ password: currentPassword }),
      credentials: 'include',
    });

    if (!passwordCheckResponse.ok) {
      errorMessage = '현재 비밀번호가 일치하지 않습니다.';
    } else if (
      newPassword === '' ||
      confirmNewPassword === '' ||
      currentPassword === ''
    ) {
      errorMessage =
        '비밀번호를 변경하기 위해서는 모든 비밀번호 값을 입력해야 합니다.';
    } else if (newPassword !== confirmNewPassword) {
      errorMessage =
        '변경 비밀번호와 변경 비밀번호 확인 값이 일치하지 않습니다.';
    } else {
      // 변경된 비밀번호를 updateData 객체에 추가
      updateData.currentPassword = currentPassword;
      updateData.password = newPassword;
    }
  }

  // 휴대폰 번호와 주소 값이 변경되었는지 확인하고, 변경된 경우 updateData 객체에 추가
  if (phone !== userInfo.phone) {
    updateData.phone = phone;
  }
  if (address1 !== userInfo.address1 || address2 !== userInfo.address2) {
    updateData.address = { address1, address2 };
  }

  // 유저 정보가 변경되었으면 서버에 업데이트
  if (Object.keys(updateData).length > 0) {
    try {
      await updateUser(userInfo, updateData);
      alert('유저 정보가 변경되었습니다.');
      window.location.reload();
    } catch (error) {
      errorMessage = error.message;
    }
  }

  if (errorMessage !== '') {
    errorMessageDiv.innerHTML = `<p>${errorMessage}</p>`;
  } else {
    errorMessageDiv.innerHTML = '';
  }

  submitErrorMessageDiv.innerHTML = '';
});

// userDeleteButton 클릭 시 deleteUser 함수 실행
userDeleteButton.addEventListener('click', async () => {
  const confirmDelete = confirm('정말 회원 탈퇴를 하시겠습니까?');

  if (confirmDelete) {
    await deleteUser(userInfo); // 서버에서 유저 정보 삭제
    alert('회원 탈퇴가 완료되었습니다.');
    window.location.href = '/'; // 메인 페이지로 이동
  }
});

// 주소찾기 버튼 구현 함수
function searchAddress() {
  const postalCodeInput = document.getElementById('postalCode');
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}

// 주소찾기 버튼에 click 이벤트 리스너 등록
searchAddressBtn.addEventListener('click', function () {
  searchAddress();
});
