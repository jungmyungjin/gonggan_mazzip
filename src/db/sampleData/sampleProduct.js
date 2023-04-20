import { v4 as uuidv4 } from "uuid";
/*
	- .js 파일로 작성
		- json으로 하려면 fs모듈로 파일을 열고 map으로 일일이 추가해야하는데, 
			fs 모듈로 파일을 열고 map으로 일일이 추가하는 작업이 번거롭기 때문

*/

const products = [
  {
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
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
    productId: uuidv4(),
    productName: "터보 항공기 드라이기 MG1800 PLUS",
    company: "JMW",
    price: 59000,
    stock: 11,
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167842956268248052.jpg?gif=1&w=640&h=640&c=c&webp=1",
    category: "electronics",
    description: "항공기의 심장을 가진 헤어드라이어",
  },
];

module.exports = products;
