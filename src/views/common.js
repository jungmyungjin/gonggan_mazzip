function createHeader() {
  const template = `
  <div class="header__container">
    <header>
      <h1>
        <a href="#">
          <img
            src="https://github.com/Returndusk/CodingTest/blob/main/logo.png?raw=true"
            alt="공간맛집 로고"
          />
        </a>
      </h1>
      <ul id="gnb__category">
        <li>
          <a href="#">가구</a>
        </li>
        <li>
          <a href="#">패브릭</a>
        </li>
        <li>
          <a href="#">가전</a>
        </li>
        <li>
          <a href="#">주방용품</a>
        </li>
        <li>
          <a href="#">조명</a>
        </li>
      </ul>
      <nav>
        <ul id="gnb__user">
          <li><a href="#">로그인</a></li>
          <li><a href="#">회원가입</a></li>
          <li><a href="#">장바구니</a></li>
        </ul>
      </nav>
    </header>
  </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", template);
}

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

window.addEventListener("load", renderDefault);
