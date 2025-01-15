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
        DetailInfo.jsx

        <div className="heading">
          <ul className="path">
            <li className="home">
              <Link to="/">홈</Link>
            </li>
            <li>{title}</li>
            <li>{cateKo}</li>
          </ul>
        </div>

        <div>
          <img src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name} />
          <h2>상품명: {productMatch.name}</h2>
          <h3>Nitro Vanilla Cream</h3>
          <h4>부드러운 목넘김의 나이트로 커피와 바닐라 크림의 매력을 한번에 느껴보세요!</h4>

          <div className="tb_heading">
            <h3 className="tit">제품 영양 정보</h3>
            <p className="txt">Tall(톨) / 355ml</p>
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
          <p className="help_factor">알레르기 유발요인 : 뭐다!</p>
        </div>
      </div> {/* .layoutfix */}
    </div>
  );
};

export default DetailInfo;