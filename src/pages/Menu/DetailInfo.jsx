import React from 'react';
import useProductMatch from "hooks/ProductMatch.js";
import { Link, useLocation } from "react-router-dom";

import { useEffect } from 'react';

import usePathMatch from "../../hooks/pathMatch.js";

import "./Detail.css";

const DetailInfo = () => {
  const { productMatch, title, cateKo, itemPrev, itemNext } = useProductMatch(); // 커스텀 훅 호출
  const { itemPath } = usePathMatch(); // 패스 훅 호출

  const location = useLocation();

  useEffect(() => {
    const zoomImg = document.querySelector('.zoom_cont .img');
    const zoomOver = document.querySelector('.zoom_cont .over');
    const zoomView = document.querySelector('.zoom_cont .view');
    if (zoomImg && zoomOver && zoomView) {
      const imageSrc = zoomImg.src;
      zoomView.style.backgroundImage = `url(${imageSrc})`;
  
      const handleMouseMove = (event) => {
        // 커서 위치 계산
        const { left, top } = zoomImg.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        // .over limit
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

  console.log(itemPrev, itemNext);

  if (!productMatch) {
    return (
      <div id="container" className="prd__detail_info">
        <div className="layout_fix">
          <p className="empty">조회 불가능한 상품입니다!</p>
        </div>
      </div>
    );
  }

  return (
    <div id="container" className="prd__detail_info">
      <div className="layout_fix">
        <div className="heading">
          <ul className="path">
            <li className="home">
              <Link to="/">홈</Link>
            </li>
            <li><Link to={itemPath}>{title}</Link></li>
            <li><Link to={itemPath}>{cateKo}</Link></li>
          </ul>
        </div>
        <div className="prd_item">
          <div className="zoom_cont">
            <img className="img" src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name}/>
            <div className="over"></div>
            <div className="view"></div>
          </div>
          <div className="info_cont">
            <h3 className="name-en">{productMatch.nameEn}</h3>
            <h2 className="name">{productMatch.name}</h2>
            <h4 className="desc">{productMatch.desc}</h4>
            <h4 className="price">{typeof productMatch.price === "number" ? `${productMatch.price.toLocaleString()}원` : productMatch.price}</h4>
          </div>

          { productMatch.facts && (
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
                    { console.log("영양==",productMatch.facts_tb) }
                    { productMatch.facts_tb.map((el,idx) => (
                      <td key={idx}>{Object.values(el)[0]}</td>
                    )) }
                  </tr>
                </tbody>
              </table>
              {productMatch.factor && ( <p className="help_factor">알레르기 유발요인 : {productMatch.factor}</p> )}
            </div>
          ) }
        </div>
        <div className="navigate">
          { itemPrev && (
            <div className="prev">
              <Link to={{ pathname: location.pathname, search: location.search.replace(`id=${productMatch.id}`, `id=${itemPrev.id}`) }}>
                <span className="en">{itemPrev.nameEn}</span>
                <p className="tit">{itemPrev.name}</p>
              </Link>
            </div>
          ) }
          { itemNext && (
            <div className="next">
              <Link to={{ pathname: location.pathname, search: location.search.replace(`id=${productMatch.id}`, `id=${itemNext.id}`) }}>
                <span className="en">{itemNext.nameEn}</span>
                <p className="tit">{itemNext.name}</p>
              </Link>
            </div>
          ) }
        </div>
      </div> {/* .layoutfix */}
    </div>
  );
};

export default DetailInfo;