import React, { useState } from "react";

export default function ProductForm({
  shopData,
  handleProductChange,
  handleAddProduct,
  allFieldsFilled,
  handleProductFileChange,
}) {
  return (
    <div className="info__box">
      <div className="info__top">
        <div className="info__feature">대표 상품</div>
        <div className="info__add" onClick={handleAddProduct}>
          추가
        </div>
      </div>
      <div className="info__products">
        {shopData.products.map((product, index) => (
          <div className="info__formBox" key={index}>
            <div className="info__input">
              <label>상품 대표 이미지</label>
              <input
                type="text"
                name="imageUrl"
                placeholder="상품 이미지를 첨부해주세요."
                value={
                  product.imageUrl ? product.imageUrl.split("/").pop() : ""
                }
                readOnly
              />
              <div className="info__file">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`ProductFileInput${index}`).click()
                  }
                >
                  파일 첨부
                </button>
                <input
                  id={`ProductFileInput${index}`}
                  type="file"
                  onChange={(e) => handleProductFileChange(e, index)} // 각 상품별로 파일 업로드
                />
              </div>
            </div>
            <div className="info__input">
              <label>상품 이름</label>
              <input
                type="text"
                name="name"
                placeholder="상품 이름을 입력해 주세요."
                value={product.name}
                onChange={(e) => {
                  handleProductChange(e, index);
                  allFieldsFilled();
                }}
              />
            </div>
            <div className="info__input">
              <label>상품 가격</label>
              <input
                type="text"
                name="price"
                placeholder="원화로 표기해 주세요."
                value={product.price}
                onChange={(e) => {
                  handleProductChange(e, index);
                  allFieldsFilled();
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
