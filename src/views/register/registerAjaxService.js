const url = '/api/users/register';
const errMessage = document.getElementById('submit_errMessage');

// 회원가입 기능 구현
function registerUser() {
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const phoneNumber = document.getElementById('phone').value;
  const postalCode = document.getElementById('postalCode').value;
  const address1 = document.getElementById('address1').value;
  const address2 = document.getElementById('address2').value;

  // 필수 입력 항목이 모두 입력되었는지 확인
  if (
    email === '' ||
    name === '' ||
    password === '' ||
    confirm_password === ''
  ) {
    errMessage.innerHTML = '필수 입력 항목을 모두 입력해주세요.';
    return;
  }

  // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
  if (checkPasswords() === false) {
    errMessage.innerHTML = '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.';
    return;
  }

  // 회원가입 정보를 JSON 형태로 변환
  const user = {
    email: email,
    name: name,
    password: password,
    phoneNumber: phoneNumber,
    address: {
      postalCode: postalCode,
      address1: address1,
      address2: address2,
    },
  };

  // Ajax 요청
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      alert('회원 가입에 성공하셨습니다! 환영합니다!');
      window.location.href = '/';
    })
    .catch((error) => {
      // 회원가입 실패 시 처리
      console.error(error);
    });
}

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  errMessage.innerHTML = ''; // 에러 메시지 초기화
  registerUser();
});
