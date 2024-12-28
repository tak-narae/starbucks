import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PrdList = ({ selectedCate, selectedDepth, currentData, pathName }) => {
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

  // const [products, setProducts] = useState([]); //전체상품
  // const [prdSeason, setPrdSeason] = useState([]); //시즌상품

  // useEffect(() => {
  //   setProducts(productData);
  //   const seasonAll = productData.flatMap((el) => {
  //     const seasonCate = el.products.filter((prd) => prd.name.includes("홀리데이"));
  //     console.log("시즌리스트==", seasonCate);
  //     return seasonCate;
  //   })
  //   setPrdSeason(seasonAll);
  //   console.log("상품리스트==", seasonAll);
  // }, []);

  return (
    <>
      <ul className="prd_list">
        {
          filteredProducts.map((product) => (
            <li key={`product-${product.id}`}>
              <Link to={`/menu/${pathName}?cate=${selectedCate}&id=${product.id}`}>
                {/* <img src={require(`${product.img}`)} alt={product.name} /> */}
                {/* <img src={getImagePath(product.img)} alt={product.name} /> */}
                <img
                  src={`${process.env.PUBLIC_URL}/${product.img}`}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
      {/* <ul className="prd_list">
        {products.map((el, idx) => (
          <li key={idx}>
            <h2>{el.category}</h2>
            <ul>
              {el.products.map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.key}`}>
                    <img src={product.img} alt={product.name} />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default PrdList;