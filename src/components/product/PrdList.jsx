import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ===
  title : 한글대분류
  pathName : 영문대분류
  cateKo : 한글중분류
  selectedCate : 중분류카테고리번호
  selectedDepth : 한글소분류(커피)
  currentData : 해당리스트정보
  prdSeason : 홀리데이정보(메인)
=== */

const PrdList = ({ title, cateKo, pathName, selectedCate, selectedDepth, currentData, prdSeason = [], prdSeasonMatch,seasonData, search }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!currentData || currentData.length === 0) return;

    const categoryData = currentData[selectedCate];
    if (!categoryData) return;

    let filtered = categoryData.products;

    if (selectedDepth) { //소분류 필터
      filtered = filtered.filter((product) => product.label === selectedDepth);
    }

    if (search) { //검색어 필터
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) // 대소문자 무시 검색
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCate, selectedDepth, currentData, search]);


  return (
    <>
      <ul className="prd_list">

        {/* selectedCate와 selectedDepth가 있을 때 필터링된 제품 목록 렌더링 */}
        {selectedCate || selectedDepth ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id}>
                <div className="item">
                  {/* <Link to={`/menu/${pathName}?cate=${selectedCate}&id=${product.id}`} className="thumbnail"> */}
                  <Link className="thumbnail"
                    to={{
                      pathname: `/menu/${pathName === "beverage" || pathName === "food" ? "info" : "detail"}/${pathName}`,
                      search: `?cate=${selectedCate}&id=${product.id}`,
                    }}
                    state={{ title, cateKo }}
                    // state={{ title, cateKo, product }} origin
                  >
                    <div className="image">
                      <img
                        src={`${process.env.PUBLIC_URL}/${product.img}`}
                        alt={product.name}
                      />
                    </div>
                  </Link>
                  <div className="desc">
                    <div className="name">{product.name}</div>
                    <div className="price">{typeof product.price === "number" ? `${product.price.toLocaleString()}원` : product.price}</div>
                    {/* <div className="review">4.9</div> */}
                    {/* <div className="price">{product.price}</div> */}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="empty">검색 결과가 없습니다</li>
          )
        ) : (
          // selectedCate나 selectedDepth가 없을 때 "홀리데이" 제품 목록 렌더링
          prdSeason.map((product) => {
            const matchedItem = seasonData.find((item) => Object.values(item)[0] === product.name);
            const matchedKey = matchedItem ? Object.keys(matchedItem)[0] : null;

            return (
              <li key={product.key}>
              <div className="item">
                <Link className="thumbnail"
                  to={{
                    pathname: `/menu/detail/product`,
                    search: `?cate=${matchedKey}&id=${product.id}`,
                    // pathname: `/menu/detail/${pathName}`,
                    // search: `?cate=${selectedCate}&id=${product.id}`,
                  }}
                  state={{ title, cateKo }}
                  // state={{ title, cateKo, product }} origin
                >
                  <div className="image">
                    <img src={product.img} alt={product.name} />
                  </div>
                </Link>
                <div className="desc">
                  <div className="name">{product.name}</div>
                  {/* <div className="review">4.9</div> */}
                  <div className="price">{product.price.toLocaleString()}원</div>
                </div>
              </div>
            </li>
            )
          })
        )
        }
      </ul >
    </>
  );
};

export default PrdList;
