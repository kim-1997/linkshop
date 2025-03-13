import React from "react";
import "../styles/Search.scss";
import search from "../assets/images/search.png";

export default function SearchBar({
  keyword,
  handleSearchChange,
  handleSearchSubmit,
}) {
  return (
    <form className="search" onSubmit={handleSearchSubmit}>
      <button className="search__image">
        <img src={search} alt="검색" />
      </button>
      <input
        type="text"
        className="search__input"
        placeholder="샵 이름으로 검색해 보세요."
        value={keyword}
        onChange={handleSearchChange}
      />
    </form>
  );
}
