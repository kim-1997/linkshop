import React, { useEffect, useState } from "react";
import fillHeart from "../assets/images/filled-heart.png";
import emptyHeart from "../assets/images/empty-heart.png";
import { likeShop, unlikeShop } from "../service/api";

export default function LikeButton({ cardId, initialLikes, heartStyle }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  useEffect(() => {
    const savedLikeStatus = localStorage.getItem(`liked_${cardId}`);
    const savedLikeCount = localStorage.getItem(`likesCount_${cardId}`);

    if (savedLikeStatus) {
      setLiked(JSON.parse(savedLikeStatus));
    }
    if (savedLikeCount) {
      setLikesCount(parseInt(savedLikeCount));
    }
  }, [cardId]);

  const toggleLike = async (e) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);

    localStorage.setItem(`liked_${cardId}`, JSON.stringify(newLiked));

    let newLikesCount = likesCount;
    if (newLiked) {
      newLikesCount = likesCount + 1;
    } else {
      newLikesCount = likesCount - 1;
    }

    setLikesCount(newLikesCount);

    localStorage.setItem(`likesCount_${cardId}`, newLikesCount);

    try {
      let response;

      if (newLiked) {
        await likeShop(cardId, newLiked, newLikesCount);
      } else {
        await unlikeShop(cardId);
      }
    } catch (error) {
      console.error("좋아요 API 요청 오류:", error);
    }
  };
  return (
    <div className="card__favoriteButton" style={heartStyle}>
      <button onClick={toggleLike}>
        <img src={liked ? fillHeart : emptyHeart} alt="like button" />
      </button>
      <span>{likesCount}</span>
    </div>
  );
}
