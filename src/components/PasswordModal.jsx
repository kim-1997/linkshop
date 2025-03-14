import React, { useState } from "react";
import "../styles/PasswordModal.scss";

export default function PasswordModal({ onSubmit, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "") {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    onSubmit(password);
  };

  const handleClose = () => {
    setError("");
    setPassword("");
    onClose(false);
  };

  return (
    <div className="password-modal">
      <div className="password-modal__overlay" onClick={handleClose}></div>
      <div className="password-modal__content">
        <h2>비밀번호를 입력해주세요</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="password-modal__button">
            <button type="submit">확인</button>
            <button onClick={handleClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}
