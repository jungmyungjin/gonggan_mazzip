import getUserInfo from './mypage-info_getUserInfo';
import updateUser from './mypage-info_updateUser';
import deleteUser from './mypage-info-userDelete';

const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const newPasswordInput = document.getElementById('new_password');
const confirmNewPasswordInput = document.getElementById('confirm_new_password');
const phoneInput = document.getElementById('phone');
const address1Input = document.getElementById('address1');
const address2Input = document.getElementById('address2');
const errorMessageDiv = document.getElementById('errorMessage');
const submitErrorMessageDiv = document.getElementById('submit_errMessage');
const form = document.querySelector('form');
const userDeleteButton = document.getElementById('userDelete');

let userInfo;

// 페이지가 로드되면 유저 정보 받기
window.addEventListener('load', async () => {
  userInfo = await getUserInfo();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // 폼 제출 막기

  const currentPassword = passwordInput.value;
  const newPassword = newPasswordInput.value;
  const confirmNewPassword = confirmNewPasswordInput.value;
  const phone = phoneInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;

  let errorMessage = '';

  // 비밀번호 변경을 위한 값 입력 확인
  if (
    newPassword !== '' ||
    confirmNewPassword !== '' ||
    currentPassword !== ''
  ) {
    if (
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
      // 비밀번호를 서버에 업데이트합니다.
      await updateUser(userInfo, { password: newPassword });
      alert('비밀번호가 변경되었습니다.');
    }
  }
  // 휴대폰 번호와 주소 값이 변경되었는지 확인하고, 변경된 경우 서버에 업데이트
  const updateData = {};
  if (phone !== userInfo.phone) {
    updateData.phone = phone;
  }
  if (address1 !== userInfo.address1 || address2 !== userInfo.address2) {
    updateData.address = { address1, address2 };
  }

  // 유저 정보가 변경되었으면 서버에 업데이트
  if (Object.keys(updateData).length > 0) {
    await updateUser(userInfo, updateData);
    alert('유저 정보가 변경되었습니다.');
    userInfo = await getUserInfo(); // 변경된 정보를 다시 가져와서 변수에 저장
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
