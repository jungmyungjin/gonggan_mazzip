let isDropdownOpen = false;
let isLoggedIn = false;

//로그아웃
function logout(e) {
  e.preventDefault();

  if (window.confirm("로그아웃 하시겠습니까?")) {
    sessionStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    location.href = "/";
  }
}

//로그인 인증
async function checkLogin() {
  const token = sessionStorage.getItem("token");

  //토큰 검증
  if (token) {
    const api = "/api/users/info";
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfo = await response.json();
      if (userInfo) isLoggedIn = true;
    } catch (err) {
      console.error(err);
    }
  }
}

//드롭다운 닫기
function closeDropdown() {
  const logoutBtn = document.querySelector("#logoutBtn");
  const dropdown = document.querySelector("#dropdown");
  if (logoutBtn) logoutBtn.removeEventListener("click", logout);
  dropdown.remove();
  isDropdownOpen = false;
}

//드롭다운 열기
function openDropdown() {
  const dropdown = `
      <div class="dropdown__container" id="dropdown">
        <ul>
        ${
          !isLoggedIn
            ? `<li>
              <a href="/login">로그인</a>
            </li>
            <li>
              <a href="/register">회원가입</a>
            </li>`
            : `<li>
              <a href="/info">마이페이지</a>
            </li>
            <li>
              <a href="/myorder">주문내역</a>
            </li>
            <li>
              <a href="#" id="logoutBtn">로그아웃</a>
            </li>`
        }
        </ul>
      </div>
    `;
  const headerEl = document.querySelector("header");
  headerEl.insertAdjacentHTML("beforeend", dropdown);

  //로그아웃 기능 활성화
  const logoutBtn = document.querySelector("#logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  isDropdownOpen = true;
}

//header의 유저 아이콘 클릭시 드롭다운 열기/닫기
function setDropdown(e) {
  e.preventDefault();
  !isDropdownOpen ? openDropdown() : closeDropdown();
}

//header 생성
function createHeader() {
  const params = new URL(document.location).searchParams;
  const category = params.get("category");
  const template = `
    <div class="header__container">
      <header>
        <h1>
          <a href="/">
            <img
              src="https://github.com/Returndusk/CodingTest/blob/main/logo.png?raw=true"
              alt="공간맛집 로고"
            />
          </a>
        </h1>
        <ul id="gnb__category">
          <li ${category === "furniture" ? 'class="on"' : ""}>
            <a href="/?category=furniture">가구</a>
          </li>
          <li ${category === "fabric" ? 'class="on"' : ""}>
            <a href="/?category=fabric">패브릭</a>
          </li>
          <li ${category === "electronics" ? 'class="on"' : ""}>
            <a href="/?category=electronics">가전</a>
          </li>
          <li ${category === "cooking" ? 'class="on"' : ""}>
            <a href="/?category=cooking">주방용품</a>
          </li>
          <li ${category === "lightings" ? 'class="on"' : ""}>
            <a href="/?category=lightings">조명</a>
          </li>
        </ul>
        <nav>
          <ul id="gnb__user">
            <li>
              <a href="#" id="userBtn">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="48" viewBox="0 96 960 960" width="48">
                  <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="/cart">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="48" viewBox="0 96 960 960" width="48"
                >
                  <path d="M220 976q-24 0-42-18t-18-42V396q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480 176q63 0 106.5 43.5T630 326v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520V396H630v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T570 486v-90H390v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T330 486v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220 916V396v520Z"/>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", template);

  const userBtn = document.querySelector("#userBtn");
  checkLogin();
  userBtn.addEventListener("click", setDropdown);
}

//footer 생성
function createFooter() {
  const template = `
    <div class="footer__container">
      <footer>
        <p>
          This website is a portfolio site and made for non-commercial purposes.
        </p>
      </footer>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", template);
}

function renderDefault() {
  const pathNames = window.location.pathname.split("/");
  const path = pathNames[pathNames.length - 1].replace(".html", "");
  if (path !== "login" && path !== "register") {
    createHeader();
    createFooter();
  }
}

window.addEventListener("DOMContentLoaded", renderDefault);
