import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PrdList = ({ selectedCate, selectedDepth, currentData, pathName, prdSeason, search }) => {
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
                  <Link to={`/menu/${pathName}?cate=${selectedCate}&id=${product.id}`} className="thumbnail">
                    <div className="image">
                        <img
                          src={`${process.env.PUBLIC_URL}/${product.img}`}
                          alt={product.name}
                        />
                    </div>
                  </Link>
                  <div className="desc">
                    <div className="name">{product.name}</div>
                    {/* <div className="review">4.9</div> */}
                    <div className="price">39,000원</div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="empty">검색 결과가 없습니다</li>
          )
        ) : (
          // selectedCate나 selectedDepth가 없을 때 "홀리데이" 제품 목록 렌더링
          prdSeason.map((el) => (
            <li key={el.key}>
              <div className="item">
                <Link to={`/menu/${pathName}?cate=${selectedCate}&id=${el.id}`} className="thumbnail">
                  <div className="image">
                      <img src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name} />
                  </div>
                </Link>
                <div className="desc">
                  <div className="name">{el.name}</div>
                  {/* <div className="review">4.9</div> */}
                  <div className="price">39,000원</div>
                </div>
              </div>

            </li>
          ))
        )
        }
      </ul >
    </>
  );
};

export default PrdList;
