const url = '/api/users/login';
const emailInput = document.querySelector('#email');
const psInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login_btn');
const signupBtn = document.querySelector('#signup_link_btn');
const errMessage = document.querySelector('#error_message');

// 로그인 상태 확인 및 처리
const checkLoginStatus = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    alert('이미 로그인 상태시네요^^');
    window.location.href = '/';
  }
};

// 페이지가 로드될 때 로그인 상태 확인
checkLoginStatus();

//로그인 버튼 기능 구현
const loginFunc = async (e) => {
  e.preventDefault();

  // 이메일 형식 확인
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput.value)) {
    errMessage.innerHTML = '이메일 주소 형식이 맞지 않습니다.';
    return;
  }

  // 비밀번호 형식 확인
  if (psInput.value.length < 4 || psInput.value.length > 16) {
    errMessage.innerHTML = '비밀번호는 4자리 이상 16자리 이하이어야 합니다.';
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: psInput.value,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        errMessage.innerHTML = '이메일이나 비밀번호가 일치하지 않습니다.';
      } else {
        errMessage.innerHTML = '로그인 실패했습니다.';
      }
      return;
    }

    const data = await response.json();
    sessionStorage.setItem('token', data);

    // 로그인한 유저 정보를 가져와 role이 admin인지 확인
    const userResponse = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });

    const userData = await userResponse.json();

    if (userData.role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  } catch (error) {
    errMessage.innerHTML = '로그인 과정에서 문제가 발생했습니다.';
  }
};

// 로그인 버튼
loginBtn.addEventListener('click', async (e) => {
  await loginFunc(e);
});

//회원가입 클릭시 회원가입페이지 이동
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/register';
});
