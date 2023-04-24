// 비밀번호 일치 여부 기능 구현

const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm_password');
const messageDiv = document.querySelector('#pwerror');

function checkPasswords() {
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  if (password === '' && confirm === '') {
    messageDiv.innerText = '';
  } else if (password === '' || confirm === '') {
    messageDiv.innerText = '비밀번호를 입력하세요.';
  } else if (password.length < 4 || password.length > 16) {
    messageDiv.innerText = '비밀번호는 4자리 이상 16자리 이하이어야 합니다.';
  } else if (password !== confirm) {
    messageDiv.innerText = '비밀번호가 일치하지 않습니다.';
  } else {
    messageDiv.innerText = '비밀번호가 일치합니다.';
  }
}

confirmInput.addEventListener('input', checkPasswords);
