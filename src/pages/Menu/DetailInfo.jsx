import React from 'react';
import useProductMatch from "hooks/ProductMatch.js";
import { Link } from "react-router-dom";

import "./Detail.css";

const DetailInfo = () => {
  const { productMatch, title, cateKo } = useProductMatch(); // 커스텀 훅 호출
  if (!productMatch) {
    return <div>Loading!</div>;
  }

  return (
    <div id="container" className="prd__detail_info">
      <div className="layout_fix">
        <div className="heading">
          <ul className="path">
            <li className="home">
              <Link to="/">홈</Link>
            </li>
            <li>{title}</li>
            <li>{cateKo}</li>
          </ul>
        </div>

        <div className="prd_panel">
          <img src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name} />
            <div className="prd_item">
            <div className="info_cont">
              <h3 className="name-en">{productMatch.nameEn}</h3>
              <h2 className="name">{productMatch.name}</h2>
              <h4 className="desc">{productMatch.desc}</h4>
              <h4 className="price">{productMatch.price}</h4>
            </div>
          </div>
        </div>
        <div className="fact_cont">
          <div className="tb_heading">
            <h3 className="tit">제품 영양 정보</h3>
            <p className="txt">{productMatch.facts}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>1회 제공량 (kcal)</th>
                <th>포화지방 (g)</th>
                <th>단백질 (g)</th>
                <th>나트륨 (mg)</th>
                <th>당류 (g)</th>
                <th>카페인 (mg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80</td>
                <td>2</td>
                <td>1</td>
                <td>40</td>
                <td>10</td>
                <td>232</td>
              </tr>
            </tbody>
          </table>
          {productMatch.factor && ( <p className="help_factor">알레르기 유발요인 : {productMatch.factor}</p> )}
        </div>
      </div> {/* .layoutfix */}
    </div>
  );
};

export default DetailInfo;