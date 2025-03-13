import React from "react";

export default function ShopInfoForm({
  shopData,
  handleShopChange,
  handleOtherShopChange,
  allFieldsFilled,
  handleFileChange,
  fileName,
}) {
  console.log(shopData);
  return (
    <div className="info__box">
      <div className="info__top">
        <div className="info__feature">내 쇼핑몰</div>
      </div>
      <div className="info__shop">
        <div className="info__formBox">
          <div className="info__input">
            <label>상점 대표 이미지</label>
            <input
              type="text"
              name="imageUrl"
              value={shopData.shop.imageUrl.split("/").pop() || ""}
              placeholder="상점 대표 이미지를 첨부해주세요."
              onChange={(e) => {
                handleShopChange(e);
                allFieldsFilled();
              }}
            />
            <div className="info__file">
              <button
                type="button"
                onClick={() => document.getElementById("ShopFileInput").click()}
              >
                파일 첨부
              </button>
              <input
                id="ShopFileInput"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="info__input">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={shopData.name || ""}
              placeholder="표시하고 싶은 이름을 적어 주세요."
              onChange={(e) => {
                handleOtherShopChange(e);
                allFieldsFilled();
              }}
            />
          </div>
          <div className="info__input">
            <label>Url</label>
            <input
              type="text"
              name="shopUrl"
              value={shopData.shop.shopUrl || ""}
              placeholder="Url을 입력해주세요."
              onChange={(e) => {
                handleShopChange(e);
                allFieldsFilled();
              }}
            />
          </div>
          <div className="info__input">
            <label>유저 ID</label>
            <input
              type="text"
              name="userId"
              value={shopData.userId || ""}
              placeholder="유저 ID를 입력해주세요."
              onChange={(e) => {
                handleOtherShopChange(e);
                allFieldsFilled();
              }}
            />
          </div>
          <div className="info__input">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={shopData.password || ""}
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => {
                handleOtherShopChange(e);
                allFieldsFilled();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
