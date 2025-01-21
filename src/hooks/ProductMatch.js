import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

  /* ===
    categoryLabel : 한글대분류
    category : 영문대분류
    data : 모든 데이터
    categoryData : 중분류 데이터 전체
    matchingCategory : 매치된 중분류 데이터
    foundProduct : 일치 정보 전달(setProductMatch)

    productMatch : 최종 정보(productMatch)
    title : 한글대분류
    cateKo : 한글중분류
    cateList : 중분류 전체 리스트
  === */ 

const useProductMatch = () => {
  const { category } = useParams(); // URL에서 category 추출
  const [ searchParams ] = useSearchParams(); // URL 쿼리 파라미터 추출

  const [productMatch, setProductMatch] = useState(null); // 선택된 상품 데이터 저장
  const [title,setTitle] = useState(""); //대분류
  const [cateKo,setCateKo] = useState(""); //중분류
  const [cateList, setCateList] = useState([]); //중분류리스트(추천상품 사용)

  const cateIndex = searchParams.get("cate"); // cate 값
  const productId = searchParams.get("id"); // id 값

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://raw.githubusercontent.com/deliondane/db/main/db.json")
        .then((res) => {
          const data = res.data; // 서버에서 가져온 전체 데이터
          console.log("전체상품==", data);
          let categoryData = []; // category에 따라 데이터 선택
          let categoryLabel = ""; // 카테고리 레이블
          switch (category) {
            case "coffee":
              categoryData = data.coffee;
              categoryLabel = "커피";
              break;
            case "beverage":
              categoryData = data.beverage;
              categoryLabel = "음료";
              break;
            case "product":
              categoryData = data.product;
              categoryLabel = "상품";
              break;
            case "food":
              categoryData = data.food;
              categoryLabel = "푸드";
              break;
            default:
              console.log("err==", category); // 잘못된 카테고리 로그
              return;
          }
          setTitle(categoryLabel);
          console.log(`${categoryLabel} ${category}`);
          console.log("중분류전체==", categoryData);

          // cate, id에 해당하는 상품 필터
          const matchingCategory = categoryData[cateIndex];
          console.log("중분류==", matchingCategory);
          setCateKo(matchingCategory.category);
          setCateList(matchingCategory.products);

          if (matchingCategory) {
            const foundProduct = matchingCategory.products.find(
              (item) => item.id.toString() === productId
            );
            // console.log("매치==", foundProduct);
            setProductMatch(foundProduct);
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    };

    fetchData();
  }, [category, cateIndex, productId]);
  // category, cateIndex, productId

  console.log("매치==", productMatch);


  // prev,next 찾기
  if(!productMatch){
    return { prev:null, next:null };
  }
  const itemIdx = cateList.findIndex((el)=> el.id === productMatch.id);
  const itemPrev = cateList[itemIdx - 1] !== undefined ? cateList[itemIdx - 1] : null;
  const itemNext = cateList[itemIdx + 1] !== undefined ? cateList[itemIdx + 1] : null;


  return { productMatch, title, cateKo, cateList, itemPrev, itemNext };
};

export default useProductMatch;