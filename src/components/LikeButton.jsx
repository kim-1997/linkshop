import React, { useEffect, useState } from "react";
import fillHeart from "../assets/images/filled-heart.png";
import emptyHeart from "../assets/images/empty-heart.png";
import { likeShop, unlikeShop } from "../service/api";

export default function LikeButton({ cardId, initialLikes, heartStyle }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  // 좋아요 토글 함수
  const handleToggleLike = async (e) => {
    e.stopPropagation();
    const newLiked = !liked; // liked 상태 반전(토글)
    setLiked(newLiked); // liked에 상태 저장

    // 클릭 시 liked_{카드 id} 이름으로 liked 상태를 문자열로 로컬스토리지에 전달
    localStorage.setItem(`liked_${cardId}`, JSON.stringify(newLiked));

    let newLikesCount = likesCount;
    if (newLiked) {
      // true면 기본 0에서 +1 -> newLikesCount에 저장
      newLikesCount = likesCount + 1;
    } else {
      // false면 (클릭 한 경우) -1 -> newLikesCount에 저장
      newLikesCount = likesCount - 1;
    }

    // likesCount 에 해당 값 반영
    setLikesCount(newLikesCount);

    // 클릭 시 liked_{카드 id} 이름으로 newLikesCount를 문자열로 로컬스토리지에 전달
    localStorage.setItem(`likesCount_${cardId}`, JSON.stringify(newLikesCount));

    try {
      if (newLiked) {
        // true 면 좋아요 api 요청
        await likeShop(cardId, newLikesCount);
      } else {
        // false면 좋아요 취소 api 요청
        await unlikeShop(cardId);
      }
    } catch (error) {
      console.error("좋아요 API 요청 오류:", error);
    }
  };

  useEffect(() => {
    // 로컬 스토리지에 각각의 이름을 가져옴
    const savedLikeStatus = localStorage.getItem(`liked_${cardId}`);
    const savedLikeCount = localStorage.getItem(`likesCount_${cardId}`);

    // 해당 이름이 있다면 liked 의 상태를 저장
    if (savedLikeStatus) {
      setLiked(JSON.parse(savedLikeStatus));
    }

    // 해당 이름이 있다면 likeCount 값 저장
    if (savedLikeCount) {
      setLikesCount(parseInt(savedLikeCount));
    }
  }, []);
  return (
    <div className="card__favoriteButton" style={heartStyle}>
      <button onClick={handleToggleLike}>
        <img src={liked ? fillHeart : emptyHeart} alt="likeButton" />
      </button>
      <span>{likesCount}</span>
    </div>
  );
}
