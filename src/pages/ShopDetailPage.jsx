import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ShopDetail.scss";
import { detailShop, updateShop } from "../service/api.js";
import LikeButton from "../components/LikeButton.jsx";
import PasswordModal from "../components/PasswordModal.jsx";

const DetailStyle = {
  top: "20px",
  left: "24px",
};

function DetailItem({ detailData }) {
  return detailData.products.map((it) => (
    <li key={it.id} className="detail__item">
      <div className="detail__productImage">
        <img src={it.imageUrl} alt={it.name} />
      </div>
      <div className="detail__info">
        <div className="detail__productName">{it.name}</div>
        <div className="detail__productPrice">
          ￦{it.price.toLocaleString()}원
        </div>
      </div>
    </li>
  ));
}

export default function ShopDetailPage() {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.location.href = "/list";
  };

  // 비밀번호 검증 후 수정 페이지로 이동
  const handlePasswordSubmit = async (password) => {
    setLoading(true);
    try {
      const updatedData = {
        shop: {
          imageUrl: detailData.shop.imageUrl,
          urlName: detailData.shop.urlName || "string",
          shopUrl: detailData.shop.shopUrl,
        },
        products: detailData.products.map((product) => ({
          price: product.price,
          imageUrl: product.imageUrl,
          name: product.name,
        })),
        userId: detailData.userId,
        name: detailData.name,
      };
      const response = await updateShop(id, password, updatedData);
      console.log(response);

      if (response && response.id) {
        setShowPasswordModal(false);
        navigate(`/linkpost/${id}/edit`);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      if (error.message === "Bad Request") {
        alert("비밀번호를 확인해 주세요");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await detailShop(id);
      setDetailData(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  if (!detailData) {
    return <div className="loading">로딩 중...</div>;
  }
  return (
    <div className="detail">
      <div className="detail__back" onClick={handleBackClick}>
        &lt; 돌아가기
      </div>

      <div className="detail__kv">
        <LikeButton
          heartStyle={DetailStyle}
          cardId={detailData.id}
          initialLikes={detailData.likes}
        />
        <div className="detail__profile">
          <div className="detail__profileImage">
            <img src={detailData.shop.imageUrl} alt={detailData.shop.urlName} />
          </div>
          <h2 className="detail__shopName">{detailData.name}</h2>
          <div className="detail__shopId">@{detailData.userId}</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "inline-block",
            border: "1px solid #000",
            cursor: "pointer",
          }}
          onClick={() => setShowPasswordModal(true)}
        >
          수정하기{id}
        </div>
      </div>

      <div className="detail__feature">대표 상품</div>
      <div className="detail__products">
        <ul className="detail__list">
          <DetailItem detailData={detailData} />
        </ul>
      </div>
      {showPasswordModal && (
        <PasswordModal
          onSubmit={handlePasswordSubmit}
          onClose={setShowPasswordModal}
        />
      )}
      {loading && (
        <div className="loading-spinner">
          <p>비밀번호 확인 중...</p>
        </div>
      )}
    </div>
  );
}
