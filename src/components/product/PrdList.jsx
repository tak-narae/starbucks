import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PrdList = ({ selectedCate, selectedDepth, currentData, pathName, prdSeason }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!currentData || currentData.length === 0) return;

    const categoryData = currentData[selectedCate];
    if (!categoryData) return;

    let filtered = categoryData.products;

    if (selectedDepth) {
      filtered = filtered.filter((product) => product.label === selectedDepth);
    }
    setFilteredProducts(filtered);
  }, [selectedCate, selectedDepth, currentData]);

  return (
    <>
      <ul className="prd_list">
        {/* selectedCate와 selectedDepth가 있을 때 필터링된 제품 목록 렌더링 */}
        {selectedCate || selectedDepth ? (
          filteredProducts.map((product) => (
            <li key={product.id}>
              <div className="item">
                <div className="thumbnail">
                  <Link to={`/menu/${pathName}?cate=${selectedCate}&id=${product.id}`}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${product.img}`}
                      alt={product.name}
                    />
                  </Link>
                </div>
                <div className="desc">
                  <div className="name">{product.name}</div>
                  <div className="review">4.9</div>
                  <div className="price">39,000원</div>
                </div>
              </div>
            </li>
          ))
        ) : (
          // selectedCate나 selectedDepth가 없을 때 "홀리데이" 제품 목록 렌더링
          prdSeason.map((el) => (
            <li key={el.key}>
              <div className="item">
                <div className="thumbnail">
                  <Link to={`/menu/${pathName}?cate=${selectedCate}&id=${el.id}`}>
                    <img src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name} />
                  </Link>
                </div>
                <div className="desc">
                  <div className="name">{el.name}</div>
                  <div className="review">4.9</div>
                  <div className="price">39,000원</div>
                </div>
              </div>

            </li>
          ))
        )}
      </ul >
    </>
  );
};

export default PrdList;
