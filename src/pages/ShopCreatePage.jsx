import React, { useState } from "react";
import "../styles/ShopForm.scss";
import ShopInfoForm from "../components/ShopInfoForm";
import ProductForm from "../components/ProductForm";
import { createShop, uploadImage } from "../service/api";
import { useNavigate } from "react-router-dom";
import FormModal from "../components/FormModal";
import { validateForm } from "../utils/validate";

const initialState = {
  shop: {
    imageUrl: "",
    urlName: "",
    shopUrl: "",
  },
  products: [
    {
      price: "",
      imageUrl: "",
      name: "",
    },
  ],
  password: "",
  userId: "",
  name: "",
};

export default function ShopCreatePage() {
  const [shopData, setShopData] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  // 인풋 창 다 입력하면 생성하기 버튼 활성화
  const allFieldsFilled = () => {
    const { shop, name, userId, password, products } = shopData;
    const shopFieldsFilled = shop.imageUrl && shop.shopUrl;
    const productsFieldsFilled = products.every(
      (product) => product.price && product.imageUrl && product.name
    );
    const filled =
      shopFieldsFilled && name && userId && password && productsFieldsFilled;
    setIsButtonActive(filled);
  };

  // 상점 파일 업로드
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("파일이 선택 x");
      return;
    }
    console.log("파일 선택:", file);
    const imageUrl = await uploadImage(file);
    setShopData((prev) => ({
      ...prev,
      shop: {
        ...prev.shop,
        imageUrl: imageUrl,
      },
    }));
    console.log("이미지 url", imageUrl);
    allFieldsFilled();
  };

  // 상품 이미지 업로드
  const handleProductFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    const imageUrl = await uploadImage(file);
    setShopData((prev) => ({
      ...prev,
      products: prev.products.map((product, i) =>
        i === index ? { ...product, imageUrl } : product
      ),
    }));
    console.log("이미지 URL:", imageUrl);
    allFieldsFilled();
  };

  // 상점 관리
  const handleShopChange = (e) => {
    const { name, value } = e.target;

    setShopData((prev) => ({
      ...prev,
      shop: {
        ...prev.shop,
        [name]: value,
      },
    }));
    allFieldsFilled();
  };

  // 상점 이름, 유저ID, 비밀번호 관리
  const handleOtherShopChange = (e) => {
    const { name, value } = e.target;

    setShopData((prev) => ({
      ...prev,
      [name]: value,
    }));
    allFieldsFilled();
  };

  // 제품 관리
  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const newProduct = [...shopData.products];
    newProduct[index] = {
      ...newProduct[index],
      [name]: value,
    };
    setShopData((prev) => ({
      ...prev,
      products: newProduct,
    }));
    allFieldsFilled();
  };

  // 제품 추가
  const handleAddProduct = () => {
    const newProduct = {
      price: "",
      imageUrl: "",
      name: "",
    };

    setShopData((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
    allFieldsFilled();
  };

  // 제품 등록하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!validateForm(shopData)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await createShop(shopData);
      if (response.ok) {
        setModalMessage("등록이 완료되었습니다.");
        setIsModalOpen(true);
        setFileName("");
        setIsLoading(false);
      } else {
        alert("서버 오류가 발생했습니다.");
        navigate("/list");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("요청 중 문제가 발생했습니다.");
    }
    setShopData(initialState);
  };

  // 제품 등록 후 확인 버튼
  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/list");
  };

  return (
    <div className="info">
      <div className="info__wrap">
        <form className="info__form" onSubmit={handleSubmit}>
          <ProductForm
            shopData={shopData}
            allFieldsFilled={allFieldsFilled}
            handleProductChange={handleProductChange}
            handleAddProduct={handleAddProduct}
            handleProductFileChange={handleProductFileChange}
          />
          <ShopInfoForm
            shopData={shopData}
            allFieldsFilled={allFieldsFilled}
            handleShopChange={handleShopChange}
            handleOtherShopChange={handleOtherShopChange}
            handleFileChange={handleFileChange}
            fileName={fileName}
          />
          <button
            className="info__createBtn"
            type="submit"
            disabled={!isButtonActive} // 버튼 활성화 여부 결정
            style={{
              backgroundColor: isButtonActive ? "#3e45ec" : "gray",
              cursor: isButtonActive ? "pointer" : "auto",
            }}
          >
            <span>생성하기</span>
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="loading-view">
          <p>생성 중..</p>
        </div>
      ) : (
        <FormModal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
