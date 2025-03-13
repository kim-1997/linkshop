import React, { useState, useEffect } from "react";
import "../styles/ShopForm.scss";
import ShopInfoForm from "../components/ShopInfoForm";
import ProductForm from "../components/ProductForm";
import { getShop, updateShop, uploadImage } from "../service/api"; // 수정할 때 사용하는 API 함수
import { useNavigate, useParams } from "react-router-dom";
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

export default function ShopEditPage() {
  const { id } = useParams(); // URL 파라미터에서 id 추출
  const [shopData, setShopData] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  // 페이지 로드 시 상점 데이터를 불러오기
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await getShop(id); // 기존 데이터 가져오기
        setShopData(response); // 가져온 데이터로 상태 업데이트
        console.log(response, "데이터 확인용");
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchShopData();
  }, [id]);

  if (!shopData) {
    return <div>로딩 중...</div>; // 데이터가 로드되기 전 로딩 상태 표시
  }

  // 인풋 창 다 입력하면 수정하기 버튼 활성화
  const allFieldsFilled = () => {
    const { shop, name, userId, products } = shopData;
    const shopFieldsFilled = shop.imageUrl && shop.shopUrl;
    const productsFieldsFilled = products.every(
      (product) => product.price && product.imageUrl && product.name
    );
    const filled = shopFieldsFilled && name && userId && productsFieldsFilled;
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
    setFileName(file.name);
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

    const imageUrl = await uploadImage(file); // 이미지 업로드 함수 호출
    setShopData((prev) => ({
      ...prev,
      products: prev.products.map((product, i) =>
        i === index ? { ...product, imageUrl } : product
      ), // 해당 index 상품의 imageUrl만 업데이트
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

  // 수정하기 버튼 클릭 시 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!validateForm(shopData)) {
      return;
    }

    // 요청 데이터 구조 맞추기
    const requestData = {
      currentPassword: shopData.password,
      shop: {
        imageUrl: shopData.shop.imageUrl,
        urlName: shopData.shop.urlName,
        shopUrl: shopData.shop.shopUrl,
      },
      products: shopData.products.map((product) => ({
        price: product.price,
        imageUrl: product.imageUrl,
        name: product.name,
      })),
      userId: shopData.userId,
      name: shopData.name,
    };

    try {
      const data = await updateShop(
        id,
        requestData.currentPassword,
        requestData
      );
      setModalMessage("수정이 완료되었습니다.");
      setIsModalOpen(true);
      setFileName("");
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
      navigate(`/link`);
    }
  };

  // 수정 후 확인 버튼
  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate(`/link/${id}`);
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
            <span>수정하기</span>
          </button>
        </form>
      </div>
      <FormModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </div>
  );
}
