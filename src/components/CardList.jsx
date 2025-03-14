import React from "react";
import Card from "./Card";
import "../styles/CardList.scss";

export default function CardList({ data, loading }) {
  return (
    <div className="card">
      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <ul className="card__list">
          <Card data={data} />
        </ul>
      )}
    </div>
  );
}
