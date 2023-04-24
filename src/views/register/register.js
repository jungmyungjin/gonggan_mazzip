const postalCodeInput = document.querySelector('#postalCode');
const searchAddressBtn = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const submitError = document.querySelector('#submit_errMessage');
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

function autoHyphen(element) {
  // 입력된 값을 받아옵니다.
  let value = element.value.replace(/-/g, '');

  // 입력된 값이 최대 입력 값 이상인 경우, 초과 부분을 잘라냅니다.
  const maxLength = 13;
  if (value.length > maxLength) {
    value = value.slice(0, maxLength);
  }

  // 정규식으로 하이픈을 붙여줍니다.
  let newValue = '';
  const pattern = /^(\d{1,3})?([-\s])?(\d{1,4})?([-\s])?(\d{1,4})?/;
  const matches = value.match(pattern);
  if (matches) {
    const groups = matches.slice(1).filter((match) => match);
    if (groups[0] && groups[0].length === 3) {
      groups[0] += '-';
    }
    if (groups[2] && groups[2].length === 4) {
      groups[2] += '-';
    }
    newValue = groups.join('');
  }

  // 입력 필드에 값을 설정합니다.
  element.value = newValue;
}
autoHyphen(phoneNumber);

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
