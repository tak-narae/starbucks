import React, { useContext ,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from "App";

// import productData from 'json/product/product.json';



const PrdList = () => {
  
  const [products, setProducts] = useState([]); //전체상품
  const [prdSeason, setPrdSeason] = useState([]); //시즌상품

  // const { coffee, setCoffee } = useContext(DataContext);
  // const { beverage, setBeverage } = useContext(DataContext);
  // const { product, setProduct } = useContext(DataContext);
  // const { food, setFood } = useContext(DataContext);

  // useEffect(() => {
  //   setProducts(productData);
  //   const seasonAll = productData.flatMap((el)=>{
  //     const seasonCate = el.products.filter((prd) => prd.name.includes("홀리데이") );
  //     console.log("시즌리스트==", seasonCate);
  //     return seasonCate;
  //   })
  //   setPrdSeason(seasonAll);
  //   console.log("상품리스트==", seasonAll);
  // }, []);



  return (
    <>
      <ul className="prd_list">
        {/* {products.map((el,idx) => (
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
        ))} */}
      </ul>
    </>
  );
};

export default PrdList;