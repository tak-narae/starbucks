import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from "App";
import useQueryParams from 'hooks/useQueryParams';

import "./Main.css";

import PrdList from 'components/product/PrdList';
import "components/product/PrdList.css";


const Main = () => {
  const { product } = useContext(DataContext);
  const { selectedCate, selectedDepth, pathName } = useQueryParams();

  const [prdSeason, setPrdSeason] = useState([]); // 홀리데이 상품

  useEffect(() => {
    const seasonAll = product.flatMap((el) => {
      const seasonCate = el.products.filter((prd) => prd.name.includes("홀리데이"));
      return seasonCate;
    });
    setPrdSeason(seasonAll); // "홀리데이" 제품만 추출
  }, [product]);

  return (
    <>
      <main id="main">
        <section className="main__visual">
          <div className="layout_fix">
            <div className="swiper-visual">SWIPER</div>

          </div>
          <div className="split">STARBUCKS</div>
        </section>
        <section className="main__banner"></section>
        <section className="main__prd">
          <div className="layout_fix">
            <div className="heading">
              <span className="sub">Season</span>
              <h2 className="tit-em">홀리데이 상품</h2>
            </div>
            <PrdList
              selectedCate={selectedCate}
              selectedDepth={selectedDepth}
              currentData={product} // 현재 데이터 전달
              pathName={pathName}
              prdSeason={prdSeason} // 시즌 상품 (홀리데이 제품) 전달
            />
          </div>
        </section>
        <section className="main__res_mz">
          <div className="layout_fix">
            <div className="heading">
              <span className="sub">Reserve Magazine</span>
              <h2 className="tit">리저브 매거진</h2>
              <p className="desc-light">다채로운, 그리고 향기로운 커피 이야기</p>
            </div>
          </div>
        </section>
        <section className="main__res_store">
          <div className="layout_fix">
            <div className="heading">
              <span className="sub-light">Starbucks</span>
              <h2 className="tit">리저브 매장</h2>
              <p className="desc-light">
                내 취향이 머무는 곳,<br />
                취향을 채우는 STARBUCKS RESERVE™ 매장
              </p>
            </div>
          </div>
        </section>
        <section className="main__event">
          <div className="layout_fix">
            <div className="heading">
              <h2 className="tit">이벤트</h2>
            </div>
          </div>
        </section>
        <section className="main__promo"></section>
      </main>
    </>
  );
};

export default Main;