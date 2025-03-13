import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.scss";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPage = location.pathname.startsWith("/linkpost");

  const handleLogoClick = () => {
    window.location.href = "/list";
  };
  const handleButtonClick = () => {
    if (isPostPage) {
      navigate("/list");
    } else {
      navigate("/linkpost");
    }
  };

  return (
    <div className="header">
      <div className="header__wrap">
        <div className="header__logo" onClick={handleLogoClick}>
          <h1 className="blind">LinkShop</h1>
        </div>

        <div className="header__button">
          <div className="button button--primary" onClick={handleButtonClick}>
            <span className="button__text">
              {location.pathname.startsWith("/linkpost")
                ? "돌아가기"
                : "생성하기"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
