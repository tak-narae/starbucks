import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "App";

import "App.css";
import "../guide/guide.css";
import "../Main.css";
import PrdList from "components/product/PrdList";


const Beverage = () => {
  const { beverage, setBeverage } = useContext(DataContext); 
  console.log(beverage);
  // const [category, setCategory] = useState([]);
  // const [categoryList, setCategoryList] = useState([]);

  // const getdata = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/beverage`);
  //     response.data.map((cate) => {
  //       setCategory(prevCate => [...prevCate,cate.category]);
  //       // console.log(setCategory);
  //       setCategoryList(cate.products);
  //       console.log(cate.products);
  //     });
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };
  // useEffect(() => {
  //   getdata();
  // }, []);

  return (
    <>
      <div className="category">
        <ul>
            {/* {
              category.map((el, idx)=>(
                <li key={idx}><Link to={`/beverage/${idx}`}>{el}</Link></li>
              ))
            } */}
        </ul>
      </div>
      <div className="guideItem layout_fix">
        <p className="guideTitle"></p>
        <ul className="prd_list">
          <li>
            <div className="item">
              <div className="thumbnail">
                <Link to="javascript: ;">
                  {/* <img src={`categoryList.img`} /> */}
                </Link>
              </div>
              <div className="desc">
                <div className="name">상품이름</div>
                <div className="price">39,000원</div>
                <div className="review">4.9</div>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="thumbnail">
                <Link to="javascript: ;">
                  <img src="https://placehold.co/600" />
                </Link>
              </div>
              <div className="desc">
                <div className="name">상품이름</div>
                <div className="price">39,000원</div>
                <div className="review">4.9</div>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="thumbnail">
                <Link to="javascript: ;">
                  <img src="https://placehold.co/600" />
                </Link>
              </div>
              <div className="desc">
                <div className="name">상품이름</div>
                <div className="price">39,000원</div>
                <div className="review">4.9</div>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="thumbnail">
                <Link to="javascript: ;">
                  <img src="https://placehold.co/600" />
                </Link>
              </div>
              <div className="desc">
                <div className="name">상품이름</div>
                <div className="price">39,000원</div>
                <div className="review">4.9</div>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="thumbnail">
                <Link to="javascript: ;">
                  <img src="https://placehold.co/600" />
                </Link>
              </div>
              <div className="desc">
                <div className="name">상품이름</div>
                <div className="price">39,000원</div>
                <div className="review">4.9</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Beverage;
