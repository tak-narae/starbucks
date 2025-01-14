import React, { useEffect, useState,useRef } from "react";
import useProductMatch from "hooks/ProductMatch.js";
import { Link } from "react-router-dom";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./Detail.css";

import QtyCalc from "./../../hooks/QtyCalc.js";

/* ===
  categoryLabel : 한글대분류
  category : 영문대분류
  data : 모든 데이터
  categoryData : 중분류 데이터 전체
  matchingCategory : 매치된 중분류 데이터
  foundProduct : 일치 정보 전달(setProductMatch)
  productMatch : 최종 정보(productMatch)

  productMatch : 최종 정보(productMatch)
  title : 한글대분류
  cateKo : 한글중분류
  cateList : 중분류 전체 리스트
=== */

const Detail = () => {
  const { productMatch, title, cateKo, cateList } = useProductMatch(); // 커스텀 훅 호출
  // const handleAddToCart = () => {
  //   const qty = document.querySelector(".btn_qty .qty").value;
  //   const cartItem = { productId: productMatch.id, qty: parseInt(qty) };
  //   localStorage.setItem("cartQty", JSON.stringify(cartItem));
  // };

  useEffect(() => {
    setTimeout(() => {
      QtyCalc();
    }, 1000);
  },[])

  const refDetail = useRef();
  const refDelv = useRef();
  const refRecommended = useRef();
  const [tabActive, setTabActive] = useState("detail");
  
  const tabScrollTo = (e, tabClick)=>{
    window.scrollTo({ top: e.current.offsetTop + 118});
    setTabActive(tabClick);
  }

  useEffect(() => {
    if (productMatch && productMatch.imgDetail) {
      const handleScroll = () => { 
        const pinPosition = window.scrollY;
        // pinPosition >= refDelv.current.offsetTop + 118 ? setTabActive("delv") : setTabActive("detail");
        pinPosition < refDelv.current.offsetTop + 117 ? setTabActive("detail")
         : pinPosition > refDelv.current.offsetTop + refDelv.current.offsetHeight + 117 ? setTabActive("recommended") : setTabActive("delv");
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  //tab2 이상 및 정보 리렌더링 확인하기

  if (!productMatch) {
    return <div>Loading!</div>;
  }
  return (
    <>
      <div id="container" className="prd__detail">
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
          <div className="prd_item">
            <div className="thumb_cont">
              <img className="thumb_img" src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name}/>
              <div className="contents">
                <ul className="tab_underline">
                  {
                    productMatch.imgDetail && (
                      <li className={tabActive === "detail" ? "active" : ""} onClick={()=> tabScrollTo(refDetail, "detail") }>상세정보</li>
                    )
                  }
                  <li className={tabActive === "delv" || !productMatch.imgDetail ? "active" : ""} onClick={()=> tabScrollTo(refDelv, "delv") }>배송/교환/반품</li>
                  <li className={tabActive === "recommended" ? "active" : ""} onClick={()=> tabScrollTo(refRecommended, "recommended") }>추천상품</li>
                </ul>
                { productMatch.imgDetail && ( <div className="detail_img" ref={refDetail}><img src={`${process.env.PUBLIC_URL}/${productMatch.imgDetail}`} alt={productMatch.name}/></div>) }
                <div className="detail_delv" ref={refDelv}>
                  <img src={require("../../images/prd_detail_delv.jpg")} alt="배송/교환/반품 안내"/>
                </div>
                <div className="detail_recommended" ref={refRecommended}>
                  <div className="heading">
                    <h4 className="tit">추천상품</h4>
                    <h5 className="desc-light">다른 컬러 & 디자인을 골라 담아 구매해 보세요!</h5>
                  </div>
                  <Swiper className="swiper_recommended prd_list"
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    slidesPerView={2}
                    slidesPerGroup={2}
                    spaceBetween={20}
                    onDestroy={(e)=>{ console.log(e,"???") }}
                    pagination={{ type:'bullets', clickable: true }}
                  >
                    { cateList.sort(()=>Math.random()-0.5).slice(0, 10).map((el,idx)=> (
                      <SwiperSlide key={idx}>
                        <div className="item">
                          <Link to="/" className="thumbnail">
                            <div className="image">
                              <img src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name}/>
                            </div>
                          </Link>
                          <div className="desc">
                            <div className="name">{el.name}</div>
                            <div className="price">{el.price.toLocaleString(1)}원</div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              </div>
            </div>
            <div className="info_cont">
              <ul className="action">
                <li className="like"><button>찜</button></li>
                <li className="share"><button>공유</button></li>
              </ul>
              <h2 className="name">{productMatch.name}</h2>
              {title === "커피" && (
                <h3 className="desc">{productMatch.desc}</h3>
              )}
              <h3 className="price">{productMatch.price.toLocaleString(1)}원</h3>
              {/* <h3 className="price">{productMatch.price}원</h3> */}
              <ul className="shipping">
                <li>
                  <span>배송정보</span>
                  <div>택배 3,000원</div>
                </li>
                <li>
                  <span>혜택</span>
                  <div>
                    신규 가입시, 1만원 쿠폰증정
                    <br />
                    리뷰 작성시, 최대 3천원 적립금 지급
                    <br />
                    회원 구매시, 등급별 최대 10% 즉시할인
                  </div>
                </li>
              </ul>
              <div className="total_item">
                <div className="btn_qty">
                  <button className="minus">-</button>
                  <input type="tel" className="qty" value="1" readOnly />
                  <button className="plus">+</button>
                </div>
                <h3 className="total_price">{productMatch.price.toLocaleString(1)}원</h3>
                {/* <h3 className="total_price">{productMatch.price}원</h3> */}
              </div>
              <div className="btn_primary">
                <Link to="/order/cart" className="btn_normal">장바구니</Link>
                <Link to="/" className="btn_dark">구매하기</Link>
              </div>
            </div>
          </div>
        </div> {/*.layout_fix*/}
      </div>
    </>
  );
};

export default Detail;
