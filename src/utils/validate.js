export const validateForm = (shopData) => {
  const { shop, password, userId, name, products } = shopData;

  // 상점 URL과 이미지 URL 검사
  const urlRegEx = /^https:\/\//;
  if (!shop.shopUrl || !urlRegEx.test(shop.shopUrl)) {
    alert("상점 URL은 https://로 시작해야 합니다.");
    return false;
  }

  if (!shop.imageUrl || !shop.shopUrl) {
    alert("상점의 이미지 URL과 상점 URL을 입력해주세요.");
    return false;
  }

  // 상품의 가격, 이미지 URL, 이름 검사
  for (let product of products) {
    if (!product.price || !product.imageUrl || !product.name) {
      alert("모든 상품의 가격, 이미지 URL, 이름을 입력해주세요.");
      return false;
    }
  }

  // 비밀번호 유효성 검사 (영문+숫자, 최소 6자)
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegEx.test(password)) {
    alert("비밀번호는 영문과 숫자를 포함하여 6자 이상이어야 합니다.");
    return false;
  }

  // 유저 ID 유효성 검사 (띄어쓰기, 특수기호 불가)
  const userIdRegEx = /^[A-Za-z0-9]+$/;
  if (!userIdRegEx.test(userId)) {
    alert("유저 ID는 특수기호나 띄어쓰기를 포함할 수 없습니다.");
    return false;
  }

  // 이름 유효성 검사
  if (!name) {
    alert("상점 이름을 입력해주세요.");
    return false;
  }

  return true;
};
