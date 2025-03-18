const BASE_URL = "https://linkshop-api.vercel.app/9908/linkshops";

// 처음 렌더링 리스트 불러오기
export async function getShop({ orderBy = "recent", cursor = "" }) {
  let query = `orderBy=${orderBy}`;
  if (cursor) {
    query += `&cursor=${cursor}`;
  }
  const response = await fetch(`${BASE_URL}?${query}`);
  const body = await response.json();

  console.log(response);
  return body;
}

// 상세페이지
export async function detailShop(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const body = await response.json();
  return body;
}

// 생성하기
export async function createShop(shopData) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopData),
  });

  return response;
}

// 수정하기
export const updateShop = async (id, currentPassword, updatedData) => {
  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/9908/linkshops/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          shop: updatedData.shop,
          products: updatedData.products,
          userId: updatedData.userId,
          name: updatedData.name,
        }),
      }
    );

    const data = await response.json();
    console.log("서버 응답 데이터:", data);
    console.log("서버 응답 상태:", response.status);

    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  } catch (error) {
    console.error("수정 요청 실패:", error);
    throw error;
  }
};

// 좋아요
export async function likeShop(cardId, likesCount) {
  try {
    const response = await fetch(`${BASE_URL}/${cardId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likesCount,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Error");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// 좋아요 취소
export async function unlikeShop(cardId) {
  try {
    const response = await fetch(`${BASE_URL}/${cardId}/like`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// 이미지 업로드 (질문 코드)
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://linkshop-api.vercel.app/images/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("서버 응답 데이터:", data);

    if (!response.ok) {
      throw new Error("Error");
    }

    return data.url;
  } catch (error) {
    throw new Error("Error", error);
  }
}
