/*
	- .js 파일로 작성
		- json으로 하려면 fs모듈로 파일을 열고 map으로 일일이 추가해야하는데, 
			fs 모듈로 파일을 열고 map으로 일일이 추가하는 작업이 번거롭기 때문

*/

const products = [
  {
    productName: "애슐리 원목 전신거울",
    company: "오굿즈",
    price: 33900,
    stock: 0,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167825809918046066.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "감성적인 인테리어의 완성, 모두가 사랑하는 엔틱 전신거울",
  },
  {
    productName: "순수원목 선반장",
    company: "먼데이하우스",
    price: 10900,
    stock: 13,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/159430870818252136.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description:
      "순수원목만을 사용하여 만든 선반장으로 먼데이하우스의 대표모델입니다.",
  },
  {
    productName: "에펠의자",
    company: "프리메이드",
    price: 29900,
    stock: 2,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162748750075449137.jpeg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description:
      "매끈한 라인의 편안한 디자인 체어, 이제 세련된 편안함에 앉아 보세요.",
  },
  {
    productName: "LERSTA 플로어 장스탠드",
    company: "이케아",
    price: 31900,
    stock: 20,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163264002572128567.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "lightings",
    description: "",
  },
  {
    productName:
      "뮤즈 순면 고밀도 바이오워싱 호텔침구 알러지케어 차렵이불세트 ",
    company: "에이트룸",
    price: 69900,
    stock: 19,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164560557905766854.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "fabric",
    description:
      "호텔에서 만났던 쾌적한 그 느낌 그대로 진짜 호텔 침구를 만나보세요.",
  },
  {
    productName: "베가 폴라 투명 접이식의자",
    company: "영가구",
    price: 25600,
    stock: 0,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164325182439107818.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "폴딩체어의 새로운 패러다임 베가 플리아!",
  },
  {
    productName: "링본 사이잘룩 러그 카페트",
    company: "스칸디앤홈",
    price: 7700,
    stock: 5,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166607617620114109.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "fabric",
    description: "먼지없는 헤링본 사이잘룩 러그",
  },
  {
    productName: "뉴오비큠 무선청소기",
    company: "뉴오비큠",
    price: 269000,
    stock: 2,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165456111266108492.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "electronics",
    description: "보여주고 싶은 오브제 청소기 오비큡",
  },
  {
    productName: "전기포트 속이 보이는 깨끗한 하티포트",
    company: "보아르",
    price: 37900,
    stock: 2,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/156557926401443929.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "cooking",
    description: "속이 보이는 깨끗한 하티포트로 산뜻한 하루",
  },
  {
    productName: "노르딕감성 커피머신PCM-NF15",
    company: "플랜잇",
    price: 159000,
    stock: 3,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164316148566056466.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "cooking",
    description: "북유럽 우드포인트 커피머신 노르딕",
  },
  {
    productName: "터보 항공기 드라이기 MG1800 PLUS",
    company: "JMW",
    price: 59000,
    stock: 11,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167842956268248052.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "electronics",
    description: "항공기의 심장을 가진 헤어드라이어",
  },

  // furniture
  {
    productName: "키드니빈즈 접이식 좌식테이블",
    company: "에꼬드에꼬",
    price: 21500,
    stock: 3,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/168232157066846601.png?gif=1&w=480&h=480&c=c&webp=1",
    category: "furniture",
    description: "당신의 공간을 사랑스럽게 만들어주는 힐링 테이블",
  },
  {
    productName: "노프레임 비정형 웨이브 전신거울",
    company: "어그리어블리",
    price: 69500,
    stock: 8,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167213115581394306.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "당신의 공간에 불어넣는 감성 어그리어블리 디자인 거울",
  },
  {
    productName: "페이톤 체어 식탁 카페 인테리어 플라스틱 철재 사출 의자",
    company: "로엠가구",
    price: 30900,
    stock: 15,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162518909273356834.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description:
      "화사한 컬러와 스틸 프레임은 단조로운 집안 분위기에 포인트로 인테리어 및 연출이 가능하며, 어느 장소든 어울리는 심플하고 유니크한 디자인 체어입니다.",
  },
  {
    productName: "MORINOKI 뱀부 2단 수납장",
    company: "하우스레시피",
    price: 38900,
    stock: 8,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162028588166606205.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description:
      "따스한 햇살 한점을 담아 1°C 높아진 감성 온도. 자연 뱀부 소재의 모리노키 수납장을 만나보세요",
  },
  {
    productName: "플로 미니 침대 협탁 소파 사이드 테이블",
    company: "올쏘퍼니처",
    price: 44900,
    stock: 7,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166633258186915730.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "FLOW, MINI SIDE TABLE",
  },
  {
    productName: "못없이 붙이는 무타공 벽선반",
    company: "무타공마켓",
    price: 4500,
    stock: 20,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165059163489267959.webp?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "전월세 임차인도 쉽고 맘 편하게 인테리어 할 수 있는 세상",
  },
  {
    productName: "프라임 와이드 수납 행거",
    company: "프리메이드",
    price: 94000,
    stock: 20,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/158986921606595523.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description:
      "꾸준히 사랑받은 프리메이드 행거 시리즈는 원하는 대로 나만의 드레스룸을 만들 수 있어요",
  },
  {
    productName: "강화유리 모듈선반 미드센추리 협탁 테이블 가구",
    company: "더블에프컬러랩",
    price: 67900,
    stock: 11,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166669122397265713.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "이제, 가구도 패션입니다.",
  },
  {
    productName: "둥실둥실 무소음 11존 매트리스토퍼",
    company: "채우리",
    price: 29900,
    stock: 21,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167151901812336910.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "구름 위에 떠있는 느낌 둥실둥실 무소음 11존 토퍼",
  },
  {
    productName: "더빅 슬라이딩 벙커 빅수납 침대",
    company: "삼익가구",
    price: 199000,
    stock: 5,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167166879964962567.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "좁은 공간 활용에 최적화된 수납침대를 사용해 보세요.",
  },
  {
    productName: "가벽 인테리어 철제 파티션/칸막이",
    company: "타공판닷컴",
    price: 48768,
    stock: 182,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165346406171188930.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description: "평범함 속에서 특별함을 찾다",
  },
  {
    productName: "미드센추리 모던 뉴트로 카우 체어",
    company: "우드띠어리",
    price: 59500,
    stock: 25,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166804700876250356.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "furniture",
    description:
      "소의뿔을 형상화한 등받이와 심플하면서도 미니멀한 디자인의 한스배그너의 CH-88을 오마주한 뉴트로 카우체어로 네츄럴,모던,미드센추리 등 다양한 공간을 연출해 보세요!",
  },

  // fabric
  {
    productName: "100%빛차단 완벽 메이든 3중직 창문형/긴창형 암막커튼",
    company: "스타일링홈",
    price: 29900,
    stock: 22,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162546803477431867.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "1cm 빛도 완벽차단",
  },
  {
    productName: "먼지없는 솔리드 사이잘룩 러그 카페트 4color 8size",
    company: "스칸디앤홈",
    price: 7700,
    stock: 37,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167028599901292176.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description:
      "털 빠짐, 먼지 날림, 관리 걱정 No! 손쉽게 관리하면서 공간에 포근함과 아늑함을 더해보세요~",
  },
  {
    productName: "말랑말랑 디저트 먼지없는 차렵이불",
    company: "마틸다",
    price: 34900,
    stock: 44,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167227469348874125.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description:
      "자연을 모티브로 한 유니크한 디자인, 품질 좋은 국내산 소재를 연구하며 숙면에 가장 적합한 침구와 패브릭 제품을 개발하여 리빙 트렌드를 제안합니다.",
  },
  {
    productName: "내츄럴 콤비블라인드 롤스크린 암막 못없이 설치",
    company: "창안애",
    price: 3500,
    stock: 200,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166495978768753140.JPG?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description:
      "누구나 생각하는 공간이 아닌, 나만의 공간을 만드는 창안애 홈스타일링",
  },
  {
    productName: "인기디자인! 폭신한 마이 버디 발매트/포인트 러그",
    company: "데일리라이크",
    price: 11900,
    stock: 6,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166434681602548999.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "폭신폭신 부드러운 마이 버디 발매트",
  },
  {
    productName: "보들보들 프리미엄 고밀도 마일드 매트리스커버",
    company: "벨로코",
    price: 9900,
    stock: 33,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167081457332347924.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "고된 하루의 끝은 쉼표가 될 수 있도록,",
  },
  {
    productName: "사각사각 알러지케어 호텔 이불커버",
    company: "데코뷰",
    price: 74800,
    stock: 29,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163461838422404971.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "호텔에서 만나던 사각사각 그 느낌 그대로.",
  },
  {
    productName: "푹신한 층간소음 실내화 슬리퍼 라운드거실화",
    company: "젊은이마켓",
    price: 6500,
    stock: 70,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/openapi/1603581/1654240800165.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "층간소음방지 쿠션슬리퍼 라운드 슬리퍼",
  },
  {
    productName: "워셔블 비정형 구름 러그",
    company: "한빛카페트",
    price: 32900,
    stock: 25,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/openapi/796340/1672717513134.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "부드러운 곡선으로 공간을 더 아늑하고 포근하게!",
  },
  {
    productName: "먼지없는 체커보드 평직 러그 워셔블 카페트",
    company: "스칸디앤홈",
    price: 12700,
    stock: 32,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167815011581224713.png?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "먼지없는 체커보드 워셔블 단모 러그",
  },
  {
    productName: "다이아 토퍼 소파패드 소파 커버",
    company: "반디스토어",
    price: 13800,
    stock: 45,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164940251184722551.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "끈적이고 불쾌한 소파는 안녕!",
  },
  {
    productName: "자연 그대로, 미드센추리 쉬폰 패브릭 포스터 커튼",
    company: "믹스앤매치",
    price: 25900,
    stock: 333,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165784831230953158.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "푸르른 자연을 방안에서 만나보세요.",
  },
  {
    productName: "디망쉬스타 펀칭 암막커튼",
    company: "까르데코",
    price: 32900,
    stock: 18,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1590557478_103612_1.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "fabric",
    description: "밤하늘을 바라만 봐도 좋아요",
  },

  // electronics
  {
    productName: "6인용 트윈프레셔 압력밥솥",
    company: "쿠쿠",
    price: 256900,
    stock: 66,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165569879364357460.gif?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "두가지 맛을 담다.",
  },
  {
    productName: "LG 프라이빗 스마트스크린TV 스탠바이미",
    company: "LG전자",
    price: 919000,
    stock: 59,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166453339144738168.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "나를 위한 프라이빗 스크린",
  },
  {
    productName: "미닉스 미니 가정용 빔프로젝터 + 미니삼각대 & 리모콘증정",
    company: "미닉스",
    price: 399000,
    stock: 11,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167419713968942177.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "내 방이 영화관으로 홈신네마",
  },
  {
    productName: "더셰프 10L 에어프라이어오븐",
    company: "보랄",
    price: 76900,
    stock: 60,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164266231878771988.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description:
      "에어프라이어에 오븐 기능을 더해 간편하고 다양한 요리, 맛있는 요리가 가능합니다.",
  },
  {
    productName: "린클프라임 음식물 처리기 건조 미생물 화이트",
    company: "린클",
    price: 698000,
    stock: 40,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/openapi/13921679/1677485464030.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "버리지 말고 린클하세요",
  },
  {
    productName: "LG 퓨리케어 몽블랑 공기청정기",
    company: "LG전자",
    price: 254000,
    stock: 13,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167834619353664270.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "황사, 초미세먼지 빈틈없이 깨끗하게 LG 퓨리케어 공기청정기",
  },
  {
    productName: "협탁 블루투스 스피커/무선충전/사이드테이블",
    company: "라르츠",
    price: 199000,
    stock: 30,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167650780927766661.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "고품격 오브제 눈에 담고 싶은 소리의 울림",
  },
  {
    productName:
      "구글코리아 크롬캐스트 with Google TV HD 스마트폰 미러링 미라캐스트",
    company: "Google",
    price: 54500,
    stock: 10,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166426895634516558.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "좋아하는 엔터테인먼트 시청을 Google로 편리하게.",
  },
  {
    productName: "입체회전 리모컨 샌드베이지 선풍기",
    company: "르젠",
    price: 89900,
    stock: 20,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/168120594853732966.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "간결하고 모던한 디자인",
  },
  {
    productName: "심플 전기포트 주전자 올스텐 이중단열 저스트화이트 1.8L",
    company: "코렐",
    price: 29900,
    stock: 40,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166666027963074082.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "코렐 세카 심플 전기포트 저스트화이트",
  },
  {
    productName: "화이트 리미티드 에디션",
    company: "오디오테크니카",
    price: 299000,
    stock: 8,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167394436343651482.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "업데이트된 아날로그 오디오테크니카",
  },
  {
    productName: "LG 퓨리케어 오브제컬렉션 테이블형공기청정기 에어로퍼니처",
    company: "LG전자",
    price: 494000,
    stock: 13,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167834576783940720.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "electronics",
    description: "가구의 감성에 가전의 편리함을 더하다",
  },

  // cooking
  {
    productName: "완판 세라믹코팅 주방칼 6종세트 + 도마증정",
    company: "슈나츠",
    price: 32900,
    stock: 26,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162255997380538348.jpeg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "슈나츠로 주방을 품격있게",
  },
  {
    productName: "퀴진드마망 순수 4인 수저세트",
    company: "달팽이리빙",
    price: 12900,
    stock: 30,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166200002169429992.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "입모양에 맞춘 둥근사닥 쉐입에 순수하고 단아한 컬러감!",
  },

  {
    productName: "견고한 이중와이어 마감! 모먼트 스텐 식기건조대",
    company: "리빙해피",
    price: 25900,
    stock: 52,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1533262788001_5pgXlLmTr.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "삶의 Story를 판매하는 주방,생활 브랜드",
  },

  {
    productName: "내추럴 주방 우드 선반장",
    company: "아카시아",
    price: 19900,
    stock: 31,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166512984684949355.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description:
      "깔끔한 디자인의 아카시아 우드 선반장입니다. 넉넉한 사이즈로 양념 등 갖은 조미료를 보관하기 좋고, 식탁위에 있는 물건들을 정리하기 편리합니다. 식탁위나 주방을 깔끔하게 정리해복세요",
  },

  {
    productName: "스테인레스 실리콘 조리도구세트 8P + 받침대",
    company: "슈나츠",
    price: 19900,
    stock: 58,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165087116423624101.png?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "요리하고 싶어지는 주방도구",
  },

  {
    productName: "투톤 테이블매트 조약돌타입",
    company: "페니체(FENICE)",
    price: 6660,
    stock: 450,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/159486766178235291.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "항상 설레는 식사시간을 위해. 식탁에 새로움을 더해보세요.",
  },

  {
    productName: "당기면 스르륵! 어반 2단 슬라이딩 주방 선반",
    company: "네이쳐리빙",
    price: 15900,
    stock: 250,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/160212956387503306.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "모던한 홈 인테리어의 시작",
  },

  {
    productName: "주방 접시 정리대 그릇 거치대",
    company: "리브인홈",
    price: 2900,
    stock: 70,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162754154981765748.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "깔끔한 인테리어 심플 접시 거치대",
  },

  {
    productName: "스테인레스 음식물 쓰레기통 2L",
    company: "르메이드",
    price: 26900,
    stock: 31,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/168239951403924867.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "음식물 쓰레기통, 이제 감추지 마세요!",
  },

  {
    productName: "제이테이블 국내제작 스크래치에 강한 달콤수저 4인세트",
    company: "아름다운공간",
    price: 29900,
    stock: 24,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165543803647860289.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "스크래치에 강한 달콤수저세트",
  },

  {
    productName: "프리미엄 ver. 트윙클 자석식 미니 스토브",
    company: "닥터하우스",
    price: 57900,
    stock: 54,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166795117699169259.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "어디에 놓아도 자연스럽게 공간에 녹아드는 일상의 오브제",
  },

  {
    productName: "자주 쓰는 고무장갑 3P_36cm",
    company: "JAJU(자주)",
    price: 8900,
    stock: 124,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164568702829399086.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "쉽게 흘러내리지 않는 은은한 컬러의 고무장갑",
  },

  {
    productName: "프리미엄 아이스볼 메이커 얼음트레이 6구",
    company: "이지앤프리",
    price: 9900,
    stock: 85,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162555656624770190.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "cooking",
    description: "녹지 않고 오래가는 왕 얼음 메이커!",
  },

  // lightings
  {
    productName: "미드센츄리 머쉬룸 단스탠드 버섯 조명 무드등",
    company: "레나에너지",
    price: 29800,
    stock: 20,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165165669966827768.png?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "미드센추리 모던 인테리어의 완성",
  },
  {
    productName: "LED오로라 블루투스 스피커 무드등",
    company: "캥거",
    price: 29800,
    stock: 38,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/166130697017667360.gif?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "내방에 펼쳐지는 아이슬란드의 오로라",
  },
  {
    productName: "충전식 LED 크리스탈 인테리어 무드등 단스탠드 조명",
    company: "캥거",
    price: 500,
    stock: 86,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167402141518239855.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "당신의 시선이 닿는 곳, 더 아름답게 빛날 수 있게",
  },
  {
    productName: "VIANT 단스탠드 E14 KS2304T 글로브형",
    company: "마켓비",
    price: 14400,
    stock: 34,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/sub_images/1589332783_117226_8.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "플리츠와 원목의 앙증맞은 스캔들",
  },
  {
    productName: "람판 단스탠드 무드등",
    company: "이케아",
    price: 69,
    stock: 11500,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163220801269616354.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "IKEA를 담다 삶의 질을 높이다",
  },
  {
    productName: "컬러풀 선셋조명 단스탠드/발리 석양 느낌 무드등",
    company: "루모스",
    price: 26900,
    stock: 31,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/161291891574987927.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "colorful sunset lights",
  },
  {
    productName: "라이트하우스 인테리어 무선 조명 무드등",
    company: "모바일아일랜드",
    price: 35000,
    stock: 21,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/168015714455338079.png?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "뉴욕 현대 미술관이 선택한 디자인 조명, 라이트하우스",
  },
  {
    productName: "젤리곰 무드등 6colors 무선형 타이머기능",
    company: "모노스마일",
    price: 20900,
    stock: 54,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167289770762504041.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "Mini Jelly Gom",
  },
  {
    productName: "LED 버섯 머쉬룸 단스탠드 조명 램프 무드등",
    company: "블레오",
    price: 28900,
    stock: 45,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/openapi/15827269/1675059241983.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "바라보면 편안해지는 은은한 머쉬룸 램프.",
  },
  {
    productName: "린다 깃털 구스 장스탠드 조명",
    company: "잇츠라이팅",
    price: 99000,
    stock: 3,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165397589381860038.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "솜사탕 처럼 포근하고 백조처럼 우아한 깃털 디자인",
  },
  {
    productName:
      "아이방꾸미기 붙이는LED 토끼 무드등 아이방 수유등 침실등 간접조명",
    company: "베르포레",
    price: 21000,
    stock: 37,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/168078858383361072.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "캐릭터 라인으로 분위기를 담은 버니라인 무드등",
  },
  {
    productName: "LED 사각 빔 비트벽등",
    company: "베스트조명",
    price: 15800,
    stock: 32,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/159125172757803602.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description:
      "세련미의 심플 사각라인 스타일과 각도마다 다른 빛으로 공간을 포인트하다",
  },
  {
    productName: "led 미니 캔들 초",
    company: "트렌데코",
    price: 1300,
    stock: 500,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/157534188196173742.jpg?gif=1&w=512&h=512&c=c&webp=1",
    category: "lightings",
    description: "클래식 감성 소품",
  },
];

module.exports = products;
