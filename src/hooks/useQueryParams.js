import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/").pop();
  const queryParams = new URLSearchParams(location.search); // 쿼리 문자열 파싱
  const selectedCate = queryParams.get("cate"); // 현재 선택된 cate 값
  const selectedDepth = queryParams.get("depth"); // 현재 선택된 depth 값

  return { selectedCate, selectedDepth, pathName };
};

export default useQueryParams;


// import { useLocation } from "react-router-dom";

// const useQueryParams = () => {
//   const location = useLocation();
//   const pathName = location.pathname.split("/").pop();
//   const queryParams = new URLSearchParams(location.search); // 쿼리 문자열 파싱
//   const selectedCate = queryParams.get("cate"); // 현재 선택된 cate 값
//   const selectedDepth = queryParams.get("depth"); // 현재 선택된 depth 값

//   return { selectedCate, selectedDepth, pathName };
// };

// export default useQueryParams;

