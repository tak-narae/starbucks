import React from 'react';
import useProductMatch from "hooks/ProductMatch.js";
import { Link } from "react-router-dom";

import "./Detail.css";

const DetailInfo = () => {
  const productMatch = useProductMatch(); // 커스텀 훅 호출
  if (!productMatch) {
    return <div>Loading...</div>;
  }

 return (
  <div id="container" className="prd__detail_info">
    <div className="layout_fix">
      DetailInfo.jsx

      <div className="heading">
        <ul className="path">
          <li className="home">
            <Link to="/">홈</Link>
          </li>
          <li>title</li>
          <li>cate</li>
        </ul>
        <h2 className="tit">title</h2>
      </div>

      <div>
        <img src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name}/>
        <p>상품명: {productMatch.name}</p>
      </div>
    </div>
  </div>
 );
};

export default DetailInfo;