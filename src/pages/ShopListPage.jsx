import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import SearchBar from "../components/SearchBar";
import "../styles/Sort.scss";
import { getShop } from "../service/api.js";
import searchNull from "../assets/images/Img_search_null.png";

export default function ShopListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(8);
  const [orderBy, setOrderBy] = useState("recent");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { list } = await getShop({ orderBy });
      setData(list);
      setFilteredData(list);
      setLoading(false);
    };
    fetchData();
  }, [orderBy]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  console.log(data);

  return (
    <div className="shop">
      <SearchBar
        keyword={keyword}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className="sort">상세필터 ▼</div>
      <button onClick={() => setOrderBy("productsCount")}>
        등록된 상품 순
      </button>
      <button onClick={() => setOrderBy("recent")}>최신순</button>
      <button onClick={() => setOrderBy("likes")}>좋아요순</button>

      {!loading && filteredData.length === 0 ? (
        <div className="card__null">
          <img src={searchNull} alt="검색 결과 없음" />
          <p>
            검색 결과가 없어요
            <br />
            지금 프로필을 만들고 내 상품을 소개해보세요.
          </p>
        </div>
      ) : (
        <CardList data={filteredData} loading={loading} />
      )}
    </div>
  );
}
