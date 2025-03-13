import React, { useState } from "react";

export default function PasswordModal({ onSubmit }) {
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

    // 비밀번호를 부모 컴포넌트로 전달
    onSubmit(password);
  };

  const handleClose = () => {
    setError("");
    setPassword("");
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
          <button type="submit">확인</button>
        </form>
        <button onClick={handleClose}>취소</button>
      </div>
    </div>
  );
}
