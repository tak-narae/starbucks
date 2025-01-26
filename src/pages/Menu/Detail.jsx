import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

//##### import ProductLinkMatch from "hooks/ProductLinkMatch.js";
import useProductMatch from "hooks/ProductMatch.js";
import QtyCalc from "./../../hooks/QtyCalc.js";
import usePathMatch from "../../hooks/pathMatch.js";

import "./Detail.css";

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
  const { itemPath } = usePathMatch(); // 패스 훅 호출
  

  const refDetail = useRef(null);
  const refDelv = useRef(null);
  const refRecommended = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      QtyCalc();
      
      const handleScroll = () => { //scroll 위치찾아서 적용
        const pinY = window.scrollY - 117;
        // console.log("pin--", pinY, "Delv--", refDelv.current.offsetTop);

        if (!refDelv.current) return;

        document.querySelectorAll(".tab_underline > li").forEach(el => el.classList.remove("active"));
        
        if (pinY >= refDelv.current.offsetTop && pinY < refDelv.current.offsetTop + refDelv.current.offsetHeight) {
          // console.log("교환/반품");
          document.querySelector("[data-ref='tabDelv']").classList.add("active");
        } else if(!refDetail.current && pinY < refDelv.current.offsetTop){
          // console.log("상세정보없음");
          document.querySelector("[data-ref='tabDelv']").classList.add("active");
        } else if (refDetail.current && pinY < refDelv.current.offsetTop) {
          // console.log("상세정보");
          document.querySelector("[data-ref='tabDetail']").classList.add("active");
        } else if (pinY >= refDelv.current.offsetTop + refDelv.current.offsetHeight) {
          // console.log("추천상품");
          document.querySelector("[data-ref='tabRecommended']").classList.add("active");
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);

    }, 600);
  }, [])
  const handleTabScroll = (e) => { //scroll 위치찾기
    const tabRef = e.target.getAttribute("data-ref");
    const refs = {
      tabDetail: refDetail,
      tabDelv: refDelv,
      tabRecommended: refRecommended,
    }
    const targetRef = refs[tabRef];
    if (targetRef && targetRef.current) {
      window.scrollTo({ top: targetRef.current.offsetTop + 118 });
    }
  }

  
  
  const [randomList, setRandomList] = useState([]);
  useEffect(()=>{
    if(Array.isArray(cateList) && cateList.length > 0){
      const recommendedList = [...cateList].sort(() => Math.random() - 0.5).slice(0, 10);
      setRandomList(recommendedList);
    }
  },[cateList])
  // console.log(randomList);


  //#####c ProductLinkMatch();
  


  const navigate = useNavigate(); //장바구니 담기
  const addToCart = ()=>{ 
    const itemQty = parseInt(document.querySelector("input.qty").value); //숫자변환
    const addItem = { ...productMatch, qty:itemQty, group:title };
    console.log("담긴qty확인++", itemQty);
    
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const addCover = cartData.findIndex(el => el.key === addItem.key); //기존상품 찾기

    if (addCover !== -1) { //기존상품 업데이트
      cartData[addCover].qty += addItem.qty;
    } else { //추가상품
      cartData = [...cartData, addItem];
    }

    localStorage.setItem("cartData", JSON.stringify(cartData));
    navigate("/order/cart");
  }
  

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
    <>
      <div id="container" className="prd__detail">
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
            <div className="thumb_cont">
              <img className="thumb_img" src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name} />
              <div className="contents">

                <ul className="tab_underline">
                  {productMatch.imgDetail && (<li className="active" data-ref="tabDetail" onClick={handleTabScroll}>상세정보</li>)}
                  <li className={!productMatch.imgDetail ? "active" : ""} data-ref="tabDelv" onClick={handleTabScroll}>배송/교환/반품</li>
                  <li data-ref="tabRecommended" onClick={handleTabScroll}>추천상품</li>
                </ul>

                {productMatch.imgDetail && (<div className="detail_img" ref={refDetail}><img src={`${process.env.PUBLIC_URL}/${productMatch.imgDetail}`} alt={productMatch.name} /></div>)}
                <div className="detail_delv" ref={refDelv}>
                  <img src={require("../../images/prd_detail_delv.jpg")} alt="배송/교환/반품 안내" />
                </div>
                <div className="detail_recommended" ref={refRecommended}>
                  <div className="heading">
                    <h4 className="tit">추천상품</h4>
                    <h5 className="desc-light">다른 컬러 & 디자인을 골라 담아 구매해 보세요!</h5>
                  </div>
                  <Swiper className="swiper_recommended prd_list"
                      modules={[Autoplay, Pagination]}
                      loop={randomList.length > 2 ? true : false}
                      slidesPerView={2}
                      slidesPerGroup={randomList.length > 3 ? 2 : 1}
                      spaceBetween={20}
                      // onDestroy={(e) => { console.log(e, "???") }}
                      pagination={{ type: 'bullets', clickable: true }}
                    >
                      {randomList.map((el, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="item">
                            <Link className="thumbnail">
                              <div className="image">
                                <img src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name} />
                              </div>
                            </Link>
                            <div className="desc">
                              <div className="name">{el.name}</div>
                              <div className="price">{el.price.toLocaleString()}원</div>
                              {/* <div className="price">{el.price.toLocaleString(1)}원</div> */}
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
              <h2 className="tit">{productMatch.name}</h2>
              {title === "커피" && (
                <h3 className="desc">{productMatch.desc}</h3>
              )}
              <h3 className="price">{productMatch.price.toLocaleString()}원</h3>
              {/* <h3 className="price">{productMatch.price.toLocaleString(1)}원</h3> */}
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
                <h3 className="total_price">{productMatch.price.toLocaleString()}원</h3>
                {/* <h3 className="total_price">{productMatch.price.toLocaleString(1)}원</h3> */}
                {/* <h3 className="total_price">{productMatch.price}원</h3> */}
              </div>
              <div className="btn_primary">
                <button className="btn_normal" onClick={addToCart}>장바구니</button>
                {/* <Link to="/order/cart" className="btn_normal"></Link> */}
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
