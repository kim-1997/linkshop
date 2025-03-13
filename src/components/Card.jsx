import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

const MainStyle = {
  top: 0,
  right: 0,
};

export default function Card({ data }) {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/link/${id}`);
  };

  return (
    <>
      {data.map((it) => (
        <li
          className="card__item"
          key={it.id}
          onClick={() => handleCardClick(it.id)}
        >
          <div className="card__profile">
            <div className="card__profileImage">
              <img src={it.shop.imageUrl} alt={it.shop.urlName} />
            </div>
            <div>
              <h2 className="card__name">{it.name}</h2>
              <p className="card__id">@{it.userId}</p>
            </div>
            <LikeButton
              heartStyle={MainStyle}
              cardId={it.id}
              initialLikes={it.likes}
            />
          </div>

          <span className="card__feature">대표 상품 {it.productsCount}</span>
          <ul className="card__products">
            {it.products.slice(0, 3).map((product) => (
              <li key={product.id} className="card__product-item">
                <div className="card__image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </>
  );
}
