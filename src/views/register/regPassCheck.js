// 비밀번호 일치 여부 기능 구현

const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm_password');
const messageDiv = document.getElementById('errorMessage');

function checkPasswords() {
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  if (password === '' && confirm === '') {
    messageDiv.innerText = '';
  } else if (password === '' || confirm === '') {
    messageDiv.innerText = '비밀번호를 입력하세요.';
  } else if (password !== confirm) {
    messageDiv.innerText = '비밀번호가 일치하지 않습니다.';
  } else {
    messageDiv.innerText = '비밀번호가 일치합니다.';
  }
}

confirmInput.addEventListener('input', checkPasswords);
