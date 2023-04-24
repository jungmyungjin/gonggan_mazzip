const postalCodeInput = document.querySelector('#postalCode');
const searchAddressBtn = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const errMessage = document.querySelector('#error_message');
const phoneNumber = document.getElementById('phone');

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

// 주소찾기 버튼 구현 함수
function searchAddress() {
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
