function saveLastVisitDate() {
  const now = new Date();
  const visitDate = now.toISOString().slice(0, 10);
  localStorage.setItem('lastVisitDate', visitDate);
}

function shouldShowAnimation() {
  const lastVisitDate = localStorage.getItem('lastVisitDate');
  if (!lastVisitDate) return true;

  const currentDate = new Date();
  const lastVisit = new Date(lastVisitDate);
  const timeDifference = currentDate - lastVisit;
  const oneDay = 1000 * 60 * 60 * 24;

  return timeDifference >= oneDay;
}

// 애니메이션 실행을 위한 돔요소
function addAnimationElements() {
  const animationHTML = `
    <div class="loading">
      <svg class="loading-circle">
        <circle cx="50%" cy="50%" r="25"></circle>
      </svg>
    </div>
    <div class="container">
      <section class="scroll-section" id="scroll-section-0">
        <h1>공간맛집</h1>
        <div class="sticky-elem sticky-elem-canvas">
          <canvas id="video-canvas-0" width="1920" height="1080"></canvas>
        </div>
        <div class="sticky-elem main-message a">
          <p>고급스러운 디자인의<br>프리미엄 세라믹 인테리어</p>
        </div>
        <div class="sticky-elem main-message b">
          <p>감각적인 공간 연출을 위한<br>다양한 색상과 텍스처 선택</p>
        </div>
        <div class="sticky-elem main-message c">
          <p>최적의 편안함을 선사하는<br>맞춤형 가구와 소품</p>
        </div>
        <div class="sticky-elem main-message d">
          <p>아름다움을 더하는<br>혁신적인 인테리어 솔루션</p>
        </div>
      </section>
      <section class="scroll-section" id="scroll-section-1">
        <div class="sticky-elem main-message hero-message a">
          <p>
            <img
              src="https://github.com/Returndusk/CodingTest/blob/main/logo.png?raw=true"
              id="logo"
              alt="Logo"
            />
          </p>
        </div>
      </section>
    </div>
  `;

  const bodyElement = document.querySelector('body');
  bodyElement.insertAdjacentHTML('beforeend', animationHTML);
}

async function playAnimation() {
  if (shouldShowAnimation()) {
    addAnimationElements();
    // 애니메이션 코드 시작
    (() => {
      let yOffset = 0; // window.pageYOffset 대신 쓸 변수
      let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
      let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
      let enterNewScene = false; // 새로운 scene이 시작된 순간 true
      let acc = 0.2;
      let delayedYOffset = 0;
      let rafId;
      let rafState;

      const sceneInfo = [
        {
          // 0
          type: 'sticky',
          heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
          scrollHeight: 0,
          objs: {
            container: document.querySelector('#scroll-section-0'),
            messageA: document.querySelector(
              '#scroll-section-0 .main-message.a'
            ),
            messageB: document.querySelector(
              '#scroll-section-0 .main-message.b'
            ),
            messageC: document.querySelector(
              '#scroll-section-0 .main-message.c'
            ),
            messageD: document.querySelector(
              '#scroll-section-0 .main-message.d'
            ),
            canvas: document.querySelector('#video-canvas-0'),
            context: document.querySelector('#video-canvas-0').getContext('2d'),
            videoImages: [],
          },
          values: {
            videoImageCount: 500,
            imageSequence: [0, 499],
            canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
            messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
            messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
            messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
            messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
            messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
            messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
            messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
            messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
            messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
            messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
            messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
            messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
            messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
            messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
          },
        },
        {
          // 1
          type: 'sticky',
          heightNum: 4,
          scrollHeight: 0,
          objs: {
            container: document.querySelector('#scroll-section-1'),
            messageA: document.querySelector('#scroll-section-1 .a'),
          },
          values: {
            messageA_translateY_in: [20, 0, { start: 0.1, end: 0.15 }],
            messageA_opacity_in: [0, 1, { start: 0.1, end: 0.15 }],
            messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
            messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          },
        },
      ];

      // 이미지 시퀀스 비디오에 쓰이는 이미지
      function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
          imgElem = new Image();
          imgElem.src = `/main/capture/movie.mp4_${i}.jpg`;
          sceneInfo[0].objs.videoImages.push(imgElem);
        }
      }

      function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
          if (sceneInfo[i].type === 'sticky') {
            sceneInfo[i].scrollHeight =
              sceneInfo[i].heightNum * window.innerHeight;
          } else if (sceneInfo[i].type === 'normal') {
            sceneInfo[i].scrollHeight =
              sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
          }
          sceneInfo[
            i
          ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
          totalScrollHeight += sceneInfo[i].scrollHeight;
          if (totalScrollHeight >= yOffset) {
            currentScene = i;
            break;
          }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
      }

      function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
          // start ~ end 사이에 애니메이션 실행
          const partScrollStart = values[2].start * scrollHeight;
          const partScrollEnd = values[2].end * scrollHeight;
          const partScrollHeight = partScrollEnd - partScrollStart;

          if (
            currentYOffset >= partScrollStart &&
            currentYOffset <= partScrollEnd
          ) {
            rv =
              ((currentYOffset - partScrollStart) / partScrollHeight) *
                (values[1] - values[0]) +
              values[0];
          } else if (currentYOffset < partScrollStart) {
            rv = values[0];
          } else if (currentYOffset > partScrollEnd) {
            rv = values[1];
          }
        } else {
          rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
      }

      function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
          case 0:
            objs.canvas.style.opacity = calcValues(
              values.canvas_opacity,
              currentYOffset
            );

            if (scrollRatio <= 0.22) {
              // in
              objs.messageA.style.opacity = calcValues(
                values.messageA_opacity_in,
                currentYOffset
              );
              objs.messageA.style.transform = `translate3d(0, ${calcValues(
                values.messageA_translateY_in,
                currentYOffset
              )}%, 0)`;
            } else {
              // out
              objs.messageA.style.opacity = calcValues(
                values.messageA_opacity_out,
                currentYOffset
              );
              objs.messageA.style.transform = `translate3d(0, ${calcValues(
                values.messageA_translateY_out,
                currentYOffset
              )}%, 0)`;
            }

            if (scrollRatio <= 0.42) {
              // in
              objs.messageB.style.opacity = calcValues(
                values.messageB_opacity_in,
                currentYOffset
              );
              objs.messageB.style.transform = `translate3d(0, ${calcValues(
                values.messageB_translateY_in,
                currentYOffset
              )}%, 0)`;
            } else {
              // out
              objs.messageB.style.opacity = calcValues(
                values.messageB_opacity_out,
                currentYOffset
              );
              objs.messageB.style.transform = `translate3d(0, ${calcValues(
                values.messageB_translateY_out,
                currentYOffset
              )}%, 0)`;
            }

            if (scrollRatio <= 0.62) {
              // in
              objs.messageC.style.opacity = calcValues(
                values.messageC_opacity_in,
                currentYOffset
              );
              objs.messageC.style.transform = `translate3d(0, ${calcValues(
                values.messageC_translateY_in,
                currentYOffset
              )}%, 0)`;
            } else {
              // out
              objs.messageC.style.opacity = calcValues(
                values.messageC_opacity_out,
                currentYOffset
              );
              objs.messageC.style.transform = `translate3d(0, ${calcValues(
                values.messageC_translateY_out,
                currentYOffset
              )}%, 0)`;
            }

            if (scrollRatio <= 0.82) {
              // in
              objs.messageD.style.opacity = calcValues(
                values.messageD_opacity_in,
                currentYOffset
              );
              objs.messageD.style.transform = `translate3d(0, ${calcValues(
                values.messageD_translateY_in,
                currentYOffset
              )}%, 0)`;
            } else {
              // out
              objs.messageD.style.opacity = calcValues(
                values.messageD_opacity_out,
                currentYOffset
              );
              objs.messageD.style.transform = `translate3d(0, ${calcValues(
                values.messageD_translateY_out,
                currentYOffset
              )}%, 0)`;
            }

            break;

          case 1:
            if (scrollRatio <= 0.2) {
              // in
              objs.messageA.style.opacity = calcValues(
                values.messageA_opacity_in,
                currentYOffset
              );
              objs.messageA.style.transform = `translate3d(0, ${calcValues(
                values.messageA_translateY_in,
                currentYOffset
              )}%, 0)`;
            } else {
              // out
              objs.messageA.style.opacity = calcValues(
                values.messageA_opacity_out,
                currentYOffset
              );
              objs.messageA.style.transform = `translate3d(0, ${calcValues(
                values.messageA_translateY_out,
                currentYOffset
              )}%, 0)`;
            }

            if (scrollRatio <= 0.5) {
              // in
              objs.messageB.style.transform = `translate3d(0, ${calcValues(
                values.messageB_translateY_in,
                currentYOffset
              )}%, 0)`;
              objs.messageB.style.opacity = calcValues(
                values.messageB_opacity_in,
                currentYOffset
              );
            } else {
              // out
              objs.messageB.style.transform = `translate3d(0, ${calcValues(
                values.messageB_translateY_out,
                currentYOffset
              )}%, 0)`;
              objs.messageB.style.opacity = calcValues(
                values.messageB_opacity_out,
                currentYOffset
              );
            }

            if (scrollRatio <= 0.7) {
              // in
              objs.messageC.style.transform = `translate3d(0, ${calcValues(
                values.messageC_translateY_in,
                currentYOffset
              )}%, 0)`;
              objs.messageC.style.opacity = calcValues(
                values.messageC_opacity_in,
                currentYOffset
              );
            } else {
              // out
              objs.messageC.style.transform = `translate3d(0, ${calcValues(
                values.messageC_translateY_out,
                currentYOffset
              )}%, 0)`;
              objs.messageC.style.opacity = calcValues(
                values.messageC_opacity_out,
                currentYOffset
              );
            }

            break;
        }
      }

      function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
          prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (
          delayedYOffset <
          prevScrollHeight + sceneInfo[currentScene].scrollHeight
        ) {
          document.body.classList.remove('scroll-effect-end');
        }

        if (
          delayedYOffset >
          prevScrollHeight + sceneInfo[currentScene].scrollHeight
        ) {
          enterNewScene = true;
          if (currentScene === sceneInfo.length - 1) {
            document.body.classList.add('scroll-effect-end');
          }
          if (currentScene < sceneInfo.length - 1) {
            currentScene++;
          }
          document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (delayedYOffset < prevScrollHeight) {
          enterNewScene = true;
          // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
          if (currentScene === 0) return;
          currentScene--;
          document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;

        playAnimation();
      }

      function loop() {
        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if (!enterNewScene) {
          // 이미지 시퀀스 비디오가 포함된 씬만 처리
          if (currentScene === 0) {
            const currentYOffset = delayedYOffset - prevScrollHeight;
            const objs = sceneInfo[currentScene].objs;
            const values = sceneInfo[currentScene].values;
            let sequence = Math.round(
              calcValues(values.imageSequence, currentYOffset)
            );
            if (objs.videoImages[sequence]) {
              objs.context.drawImage(objs.videoImages[sequence], 0, 0);
            }
          }
        }

        if (delayedYOffset < 1) {
          scrollLoop();
          sceneInfo[0].objs.canvas.style.opacity = 1;
          sceneInfo[0].objs.context.drawImage(
            sceneInfo[0].objs.videoImages[0],
            0,
            0
          );
        }
        // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
        if (
          document.body.offsetHeight - window.innerHeight - delayedYOffset <
          1
        ) {
          let tempYOffset = yOffset;
          scrollTo(0, tempYOffset - 1);
        }

        rafId = requestAnimationFrame(loop);

        if (Math.abs(yOffset - delayedYOffset) < 1) {
          cancelAnimationFrame(rafId);
          rafState = false;
        }
      }

      window.addEventListener('load', () => {
        document.body.classList.remove('before-load');
        setLayout();
        sceneInfo[0].objs.context.drawImage(
          sceneInfo[0].objs.videoImages[0],
          0,
          0
        );

        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if (tempYOffset > 0) {
          let siId = setInterval(() => {
            scrollTo(0, tempYOffset);
            tempYOffset += 5;

            if (tempScrollCount > 20) {
              clearInterval(siId);
            }
            tempScrollCount++;
          }, 20);
        }

        window.addEventListener('scroll', () => {
          yOffset = window.pageYOffset;
          scrollLoop();

          if (!rafState) {
            rafId = requestAnimationFrame(loop);
            rafState = true;
          }
        });

        window.addEventListener('resize', () => {
          if (window.innerWidth > 900) {
            setLayout();
          }
        });

        window.addEventListener('orientationchange', () => {
          setTimeout(setLayout, 500);
        });

        document
          .querySelector('.loading')
          .addEventListener('transitionend', (e) => {
            document.body.removeChild(e.currentTarget);
          });
      });

      setCanvasImages();
    })();
    // 애니메이션 코드 종료
    saveLastVisitDate();
    // 애니메이션 종료 감지
    function dispatchAnimationFinishedEvent() {
      const animationFinishedEvent = new CustomEvent('animationFinished');
      document.body.dispatchEvent(animationFinishedEvent);
    }
  }
}

playAnimation();
window.playAnimation = playAnimation;
