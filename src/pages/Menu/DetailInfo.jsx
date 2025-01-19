import React from 'react';
import useProductMatch from "hooks/ProductMatch.js";
import { Link } from "react-router-dom";

import { useEffect } from 'react';

import "./Detail.css";

const DetailInfo = () => {
  const { productMatch, title, cateKo } = useProductMatch(); // 커스텀 훅 호출

  useEffect(() => {
    const zoomImg = document.querySelector('.zoom_img');
    const zoomOver = document.querySelector('.zoom_over');
    const zoomView = document.querySelector('.zoom_view');
    
    if (zoomImg && zoomOver && zoomView) {
      const imageSrc = zoomImg.src;
      zoomView.style.backgroundImage = `url(${imageSrc})`;
  
      const handleMouseMove = (event) => {
        // 커서 위치 계산
        const { left, top } = zoomImg.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        // .zoomLens limit
        let lensX = Math.min(Math.max(x - 85, 0), 220);
        let lensY = Math.min(Math.max(y - 85, 0), 220);
        zoomOver.style.left = `${lensX}px`;
        zoomOver.style.top = `${lensY}px`;
  
        // 배경 위치 계산
        const bgX = (lensX * 100) / 220;
        const bgY = (lensY * 100) / 236;
  
        zoomView.style.backgroundPosition = `${Math.max(bgX, 0)}% ${bgY}%`; // 0% 이하로 가지 않도록 제한
      };
  
      zoomImg.addEventListener('mousemove', handleMouseMove);
      return () => zoomImg.removeEventListener('mousemove', handleMouseMove);
    }
  }, [productMatch]);

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
          <div className="zoomContainer">
            <img className="zoom_img" src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name}/>
            <div className="zoom_over"></div>
            <div className="zoom_view"></div>
          </div>
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
                <th>1회 제공량(kcal)</th>
                <th>포화지방(g)</th>
                <th>단백질(g)</th>
                <th>나트륨(mg)</th>
                <th>당류(g)</th>
                <th>카페인(mg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                { console.log("영양",productMatch.facts_tb) }
                { productMatch.facts_tb.map((el,idx) => (
                  <td key={idx}>{Object.values(el)[0]}</td>
                )) }
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