import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "App";
import PrdList from "components/product/PrdList";
import useQueryParams from 'hooks/useQueryParams';

import "./Menu.css";

/* ===
  title : 한글대분류
  pathName : 영문대분류
  cateKo : 한글중분류
  selectedCate : 중분류카테고리번호
  selectedDepth : 한글소분류(커피)
  currentData : 해당리스트정보
=== */

const Menu = () => {
  const { coffee, beverage, product, food } = useContext(DataContext);
  const { selectedCate, selectedDepth, pathName } = useQueryParams(); //소분류(selectedDepth)

  const titleMap = useMemo(
    () => ({
      coffee: "커피",
      beverage: "음료",
      product: "상품",
      food: "푸드",
    }),
    []
  );

  const dataMap = useMemo(
    () => ({
      coffee,
      beverage,
      product,
      food,
    }),
    [coffee, beverage, product, food]
  );

  const title = titleMap[pathName]; //대분류
  const currentData = useMemo(() => dataMap[pathName] || [], [dataMap, pathName]);
  // const currentData = dataMap[pathName] || {};
  const categories = useMemo(() => currentData.map((item) => item.category || ""), [currentData]);
  // const categories = currentData.map((item) => item.category || "");
  const [labels, setLabels] = useState([]);

  const getLabels = (data) => {
    const newLabels = [];
    data.forEach((item) => {
      item.products.forEach((product) => {
        if (!newLabels.includes(product.label)) {
          newLabels.push(product.label);
        }
      });
    });
    return newLabels;
  };


  useEffect(() => {
    window.scrollTo({ top: 0 }); //메인진입
    const newLabels = getLabels(currentData);
    setLabels(newLabels);
  }, [currentData]);


  //중분류
  // cate번호확인(new URLSearchParams(location.search).get('cate');)
  const [cateKo, setCateKo] = useState();
  useEffect(() => {
    categories.map((el, idx) => {
      if (selectedCate === String(idx)) setCateKo(el);
    })
    // console.log(title,cateKo,selectedDepth);
  })

  //=== btn_search .active
  const [search, setSearch] = useState("");
  const searchAction = (e) => {
    if ((search !== "") && (e.target.closest(".search_prd.active"))) {
      return false;
    }
    e.target.closest(".search_prd").classList.toggle("active");
    document.querySelector(".menu_category input").focus();
  }

  return (
    <>
      <div id="container" className="prd__list">
        <div className="layout_fix">
          <div className="heading">
            <ul className="path">
              <li className="home"><Link to="/">홈</Link></li>
              <li>{title}</li>
            </ul>
            <h2 className="tit">{title}</h2>
          </div>
        </div>
        <div className="menu_category">
          <div className="layout_fix">
            <ul className="cate_list">
              {categories.map((category, idx) => {
                const isActive = selectedCate === String(idx); // 선택된 cate 확인
                return (
                  <li key={idx} className={isActive ? "active" : ""}>
                    <Link to={`/menu/${pathName}?cate=${idx}`}>{category}</Link>
                  </li>
                );
              })}
            </ul>
            <div className="search_prd">
              <input value={search} onChange={(e) => { setSearch(e.target.value); }}
                type="text" placeholder="검색어 입력" />
              <button className="btn_search" onClick={(e) => searchAction(e)}>Search</button>
            </div>
          </div>
        </div>
        {title === "커피" && (
          <div className="menu_category depth">
            <div className="layout_fix">
              <ul className="cate_list">
                <li className={!selectedDepth ? "active" : ""}>
                  <Link to={`/menu/coffee?cate=${selectedCate}`}>전체</Link>
                </li>
                {labels.map((label, idx) => {
                  const isActive = selectedDepth === label; // 선택된 depth 확인
                  return (
                    <li key={idx} className={isActive ? "active" : ""}>
                      <Link to={`/menu/${pathName}?cate=${selectedCate}&depth=${label}`}>
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
        <div className="layout_fix">
          <PrdList
            title={title}
            cateKo={cateKo}
            pathName={pathName}
            selectedCate={selectedCate}
            selectedDepth={selectedDepth}
            currentData={currentData}
            search={search} //검색필터
          />
        </div>
        {/* <Outlet/> */}
      </div>
    </>
  );
};

export default Menu;

// http://localhost:3000/menu/coffee/0/?cate=블론드로스트/035464

