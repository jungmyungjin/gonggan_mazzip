const T_Tbutton = document.querySelector('#T_TSorry');
const logoutBtn = document.querySelector('#logoutBtn');

const checkAdminRole = async () => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    alert('권한이 없습니다. 메인 페이지로 이동합니다.');
    window.location.href = '/';
    return;
  }

  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert('권한 확인 중 오류가 발생했습니다. 메인 페이지로 이동합니다.');
      window.location.href = '/';
      return;
    }

    const userData = await response.json();

    if (userData.role !== 'admin') {
      alert('권한이 없습니다. 메인 페이지로 이동합니다.');
      window.location.href = '/';
    }
  } catch (error) {
    alert('권한 확인 중 오류가 발생했습니다. 메인 페이지로 이동합니다.');
    window.location.href = '/';
  }
};

// 페이지가 로드될 때 권한 확인
checkAdminRole();

T_Tbutton.addEventListener('click', () => {
  alert('시간 관계상 못만들었습니다. ㅠ_ㅠ');
});

logoutBtn.addEventListener('click', () => {
  if (window.confirm('로그아웃 하시겠습니까?')) {
    sessionStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    location.href = '/';
  }
});
