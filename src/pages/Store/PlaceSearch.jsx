// import { useState } from "react";

// const PlaceSearch = ({ onPlaceSelect }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+스타벅스&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
//     );
//     const data = await response.json();
//     if (data.results.length > 0) {
//       onPlaceSelect(data.results[0].geometry.location);
//     } else {
//       alert("매장을 찾을 수 없습니다.");
//     }
//   };

//   return (
//     <form onSubmit={handleSearch}>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="매장 검색"
//       />
//       <button type="submit">검색</button>
//     </form>
//   );
// };

// export default PlaceSearch;

import { useState } from "react";

const PlaceSearch = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    console.log("검색: ", query);

    if (!query.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+스타벅스&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      console.log("API 응답:", data); // 응답 데이터 확인

      // Google API 응답 상태가 OK인 경우만 처리
      if (data.status === "OK" && data.results.length > 0) {
        // 첫 번째 검색 결과를 onPlaceSelect로 전달
        onPlaceSelect(data.results[0].geometry.location);
      } else {
        alert("매장을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("매장 검색 중 오류가 발생했습니다.", error);
      alert("매장 검색에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="매장 검색"
      />
    </form>
  );
};

export default PlaceSearch;
