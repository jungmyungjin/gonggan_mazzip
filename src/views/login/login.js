const url = '/api/users/login';
const emailInput = document.querySelector('#email');
const psInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login_btn');
const signupBtn = document.querySelector('#signup_link_btn');
const errorMessage = document.querySelector('#error_message');

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
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: psInput.value,
      }),
    });
    const data = await response.json();
    if (data) {
      sessionStorage.setItem('token', data);
      window.location.href = '/';
    } else {
      throw new Error('로그인 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
    errorMessage.innerHTML = '로그인에 실패했습니다.';
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
