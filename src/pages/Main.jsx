import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "App";
import useQueryParams from "hooks/useQueryParams";
import { useUtilContext } from "hooks/UtilContext";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// css/js
import "./Main.scss";

// components
// import MainGsap from "./MainGsap.js";
import { MainPrd } from "./MainGsap.js"

import SplitEffect from "./MainSplit.js";
import PrdList from "components/product/PrdList";
import "components/product/PrdList.css";

const Main = () => {
  const { product } = useContext(DataContext);
  const { selectedCate, selectedDepth, pathName } = useQueryParams();

  const { datefilteredNotice, datefilteredEvents } = useUtilContext();

  const [prdSeason, setPrdSeason] = useState([]); // 홀리데이 상품
  useEffect(() => {
    const seasonAll = product.flatMap((el) => {
      const seasonCate = el.products.filter((prd) =>
        prd.name.includes("홀리데이")
      );
      return seasonCate;
    });
    setPrdSeason(seasonAll); // "홀리데이" 제품만 추출
  }, [product]);

  useEffect(() => {
    MainPrd();
    SplitEffect(); //.split
  }, []);

  return (
    <>
      <main id="main">
        <section className="main__visual">
          <div className="layout_fix">
            <div className="swiper-visual">swiper-visual</div>
          </div>
          <div className="split">STARBUCKS</div>
        </section>
        <section className="main__banner">
          <img src={`${process.env.PUBLIC_URL}/db/images/2025_january_pick_bg.jpg`} alt="" />
        </section>
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
            {/* selectedCate 확인하기 */}
            <Link to="/menu/product?cate=0" className="btn_link">
              MORE
            </Link>
          </div>
        </section>
        <section className="main__res_mz">
          <div className="layout_fix">
            <div className="heading">
              <span className="sub">Reserve Magazine</span>
              <h2 className="tit">리저브 매거진</h2>
              <p className="desc-light">
                다채로운, 그리고 향기로운 커피 이야기
              </p>
            </div>
          </div>
        </section>
        <section className="main__res_store">
          <div className="layout_fix">
            <div className="heading">
              <span className="sub-light">Starbucks</span>
              <h2 className="tit">리저브 매장</h2>
              <p className="desc-light">
                내 취향이 머무는 곳,
                <br />
                취향을 채우는 STARBUCKS RESERVE™ 매장
              </p>
            </div>
          </div>
        </section>
        <section className="main__event">
        <div className="heading">
              <div className="layout_fix">
                <h2 className="tit">이벤트</h2>
              </div>
            </div>
            <div className="loop_event">
              <ul className="event_list">
                <Swiper
                  className="swiper_event"
                  modules={[Autoplay]}
                  observer={true}
                  observeParents={true}
                  loop={true}
                  slidesPerView="auto"
                  spaceBetween={40}
                  freeMode={true}
                  touchRatio={0}
                  allowTouchMove={false}
                  speed={4000}
                  autoplay={{
                    delay: 1,
                    disableOnInteraction: false,
                  }}
                >
                  {datefilteredEvents.slice(0, 10).map((event, idx) => (
                    <SwiperSlide>
                      <Link to={`/event/${idx}?cate=${event.category}`}>
                        <div className="thumb">
                          <img
                            src={event.img}
                            alt={event.title}
                            style={{ width: "100%", borderRadius: "8px" }}
                          />
                        </div>
                        <div className="info">
                          <p className="tit">
                            {event.title}
                          </p>
                          <span className="date">{event.startDate} ~ {event.endDate}</span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ul>
            </div>
        </section>
        <section className="main__promo">
          <div className="layout_fix">
            <ul className="banner">
              <li>
                <Link to={`/event/15?cate=카드출시`}>
                  <img src={require("../images/main_promo_banner1.png")} alt="" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={require("../images/main_promo_banner2.png")} alt="" />
                </Link>
              </li>
            </ul>
            <div className="notice">
              <b>공지</b>
              <Swiper
                className="swiper_notice"
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                touchRatio={0}
                direction={"vertical"}
                autoHeight={true}
                loop
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
              >
                {
                  datefilteredNotice && datefilteredNotice.length > 0 ? (
                    datefilteredNotice.slice(0, 10).map((noticeItem, idx) => (
                      <SwiperSlide key={idx} >
                        <Link to={`/notice/${idx}?cate=${noticeItem.category}`}>
                          {console.log(idx)}
                          <p className="tit">{noticeItem.subject}</p>
                          <span className="date">{noticeItem.date}</span>
                        </Link>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>공지사항이 없습니다.</p>
                  )
                }
              </Swiper>
              <Link to="/notice" className="btn_link">
                더보기 +
              </Link>
            </div>
          </div>
        </section>
      </main >
    </>
  );
};

export default Main;
