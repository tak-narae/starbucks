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
import { MainPrd } from "./MainGsap.js";

import SplitEffect from "./MainSplit.js";
import PrdList from "components/product/PrdList";
import "components/product/PrdList.css";

const Main = () => {
  const { loading, visual, product, resMz } = useContext(DataContext);
  const { selectedCate, selectedDepth, pathName } = useQueryParams();

  const { datefilteredNotice, datefilteredEvents } = useUtilContext();

  const [prdSeason, setPrdSeason] = useState([]); // 홀리데이 상품
  const [prdSeasonMatch, setPrdSeasonMatch] = useState([]); //홀리데이 display 상품
  const [prdSeasonCateIdx, setPrdSeasonCateIdx] = useState([]); //홀리데이 display 부모카테고리 인덱스
  const [seasonData, setSeasonData] = useState([]);

  // console.log("holiday", prdSeasonMatch,  prdSeasonCateIdx,  seasonData);

  useEffect(() => {
    const seasonAll = product.flatMap((el) => {
      const seasonCate = el.products.filter((prd) =>
        prd.name.includes("홀리데이")
      );
      setTimeout(() => { //display 상품 active추가하고 배열 담기
        if (seasonCate.length > 0) {
          document.querySelectorAll('.prd_list > li').forEach(li => {
            if (getComputedStyle(li).display !== 'none' && !li.classList.contains("active")) {
              li.classList.add("active");
              const itemName = li.querySelector(".name").innerText;
              setPrdSeasonMatch(el => [...el, itemName]);
            }
          });
        }
      }, 500);

      return seasonCate;
    });
    setPrdSeason(seasonAll); // "홀리데이" 제품만 추출

    product.forEach((category, categoryIndex) => {
      category.products.forEach((el) => {
        if (prdSeasonMatch.includes(el.name)) { //display 상품 찾아서 부모 idx값 담기
          setPrdSeasonCateIdx(item => [...item, categoryIndex]);
          if (prdSeasonMatch.length){
            setSeasonData(data => {
              if(data.length < prdSeasonMatch.length){ //새로고침시 배열 쌓이는 이슈때문에 prdSeasonMatch.length 체크
                return [...data, { [categoryIndex]:prdSeasonMatch[data.length] } ];
              }
              return data;
            })
          }
        }
      });
    });
    // console.log(prdSeasonMatch, prdSeasonCateIdx,seasonData);

    // const seasonMerge = prdSeasonCateIdx.map((el,idx) => { //배열 합치기
    //   return { [el] : prdSeasonMatch[idx] };
    // })
    // setSeasonData(seasonMerge);

    console.log("visual==",visual)

  }, [product, prdSeasonMatch, seasonData]);

  useEffect(() => {
    MainPrd();
  }, []);
  
  useEffect(()=>{
    if(!loading){
      SplitEffect(); //.split
    }
  },[loading])


  return (
    <>
      <main id="main">
        <section className="main__visual">
          <div className="layout_fix">
            <div className="visual_cont" rel="js-main-visual">
              <Swiper className="swiper_visual"
                modules={[Autoplay, Navigation]}
                loop={true}
                slidesPerView={2}
                speed={850}
                allowTouchMove={false}
                navigation={{ prevEl:'.swiper-prev', nextEl:'.swiper-next' }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
              >
                { visual.map(el => (
                  <SwiperSlide key={el.key}>
                      <div className="item">
                        <div className="smooth">
                          <div className="info">
                            <span className="badge">{el.nameEn}</span>
                            <h3 className="name">{el.name}</h3>
                            <h4 className="desc">{el.desc}</h4>
                            <Link to={`/menu/detail/promotion?cate=0&id=${el.id}`}>MORE</Link>
                            {/* <Link to="/event/5?cate=상품출시">READ MORE</Link> */}
                          </div>
                          <div className="thumb">
                            <img src={el.img} alt={el.name}/>
                            <span className="idx">0{el.id}</span>
                          </div>
                        </div>
                      </div>                      
                  </SwiperSlide>
                )) }
              </Swiper>
              <div className="swiper-arrow">
                <span className="swiper-prev">이전</span>
                <span className="swiper-next">다음</span>
              </div>
            </div>
          </div>
          <div className="split">STARBUCKS</div>
        </section>
        <section className="main__banner">
          <Link to="/menu/detail/coffee?cate=0&id=15">
            {/* <img src={require("../images/main_banner.png")} alt="main_banner" /> */}
          </Link>
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
              prdSeasonMatch={prdSeasonMatch}
              seasonData={seasonData}
            />
            {/* selectedCate 확인하기 */}
            <Link to="/menu/product?cate=0" className="btn_link">
              MORE
            </Link>
          </div>
        </section>
        <section className="main__res_mz">
          <div className="layout_fix">
            <div className="reserve_star_img">
              <img src={require("../images/reserve_star.png")} alt="" />
            </div>
            <div className="heading">
              <span className="sub">Reserve Magazine</span>
              <h2 className="tit">리저브 매거진</h2>
              <p className="desc-light">
                다채로운, 그리고 향기로운 커피 이야기
              </p>
            </div>
          </div>
          <div className="res_mz">
            <ul className="megazine">
              {resMz.slice(0, 6).map((item) => (
                <li className="mzImg" key={item.key}>
                  <Link to="#">
                    <img src={item.img} alt={item.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="displaynone main__res_store">
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
              { !loading && (
                <Swiper className="swiper_event"
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
                  delay: 0,
                  disableOnInteraction: false,
                }}
              >
                {datefilteredEvents.slice(0, 8).map((event, idx) => (
                  <SwiperSlide key={idx}>
                    <Link to={`/event/${idx}?cate=${event.category}`}>
                      <div className="thumb">
                        <img
                          src={event.img}
                          alt={event.title}
                          style={{ width: "100%", borderRadius: "8px" }}
                        />
                      </div>
                      <div className="info">
                        <p className="tit">{event.title}</p>
                        <span className="date">
                          {event.startDate} ~ {event.endDate}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              ) }
            </ul>
          </div>
        </section>
        <section className="main__promo">
          <div className="layout_fix">
            <ul className="banner">
              <li>
                <Link to={`/event/3?cate="카드출시"`}>
                  <img
                    src={require("../images/main_promo_banner3.png")}
                    alt=""
                  />
                </Link>
              </li>
              <li>
                <Link to={`/event/4?cate="전체"`}>
                  <img
                    src={require("../images/main_promo_banner4.png")}
                    alt=""
                  />
                </Link>
              </li>
            </ul>
            <div className="notice">
              <b>공지</b>
              { !loading && (
                <>
                  <Swiper
                    className="swiper_notice"
                    modules={[Autoplay, Pagination]}
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
                    { datefilteredNotice && datefilteredNotice.length > 0 ? (
                      datefilteredNotice.slice(0, 10).map((noticeItem, idx) => (
                        <SwiperSlide key={idx}>
                          <Link to={`/notice/${idx}?cate=${noticeItem.category}`}>
                            <p className="tit">{noticeItem.subject}</p>
                            <span className="date">{noticeItem.date}</span>
                          </Link>
                        </SwiperSlide>
                      ))
                    ) : (
                      <p>공지사항이 없습니다.</p>
                    )}
                  </Swiper>
                  <Link to="/notice" className="btn_link">
                    더보기 +
                  </Link>
                </>
              ) }
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;
