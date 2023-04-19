const emailInput = document.querySelector('#email');
const psInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login_btn');
const signupBtn = document.querySelector('#signup_link_btn');
const errorMessage = document.querySelector('#error_message');

//로그인 버튼 기능 구현
const loginFunc = (e) => {
  e.preventDefault();
  fetch('서버API주소', {
    method: 'POST', //입력된 로그인 정보 전송
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: psInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        //로그인 완료시
        Cookies.set('token', data.data.token); // 로그인 정보 쿠키에 저장
        window.location.href = '../main/main.index';
      } else {
        throw new Error('로그인 실패했습니다.'); //로그인실패 에러 생성
      }
    })
    .catch((error) => {
      //에러시 메세지
      console.error(error);
      errorMessage.innerHTML = '로그인에 실패했습니다.';
    });
};

// 로그인 버튼
loginBtn.addEventListener('click', (e) => {
  loginFunc(e);
});

//회원가입 클릭시 회원가입페이지 이동
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '';
  console.log('click');
});
