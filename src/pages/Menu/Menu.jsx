import React, { useContext, useEffect, useState, useMemo } from "react";
import { Outlet, Link } from "react-router-dom";
import { DataContext } from "App";
import PrdList from "components/product/PrdList";
import useQueryParams from 'hooks/useQueryParams';

import "./Menu.css";

const Menu = () => {
  //=== URL + PrdList
  const { coffee, beverage, product, food } = useContext(DataContext);
  const { selectedCate, selectedDepth, pathName } = useQueryParams();

  const titleMap = useMemo(
    () => ({
      coffee: "커피",
      beverage: "음료",
      product: "제품",
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

  const title = titleMap[pathName];
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
    const newLabels = getLabels(currentData);
    setLabels(newLabels);
  }, [currentData]);


  //=== btn_search .active
  const [search,setSearch] = useState("");
  useEffect(() => {
    document.querySelector(".menu_category .btn_search").addEventListener("click", (e) => {
      e.target.closest(".search").classList.toggle("active");
      // if (search !== null && e.target.closest(".search").classList.contains("active")) { }
      document.querySelector(".menu_category input").focus();
    });
  }, [search]);

  return (
    <>
      <div id="container" className="prd__list">
        <div className="heading layout_fix">
          <ul className="path">
            <li><Link to="/">홈</Link></li>
            <li><Link to="/">text</Link></li>
          </ul>
          <h2 className="tit">{title}</h2>
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
            <div className="search">
              <input value={search} onChange={(e)=>{ setSearch(e.target.value); }}
              type="text" placeholder="검색어 입력"/>
              <button className="btn_search">Search</button>
            </div>
          </div>
        </div>
        {title === "커피" && (
          <div className="menu_category depth">
            <div className="layout_fix">
              <ul className="cate_list">
                  <li className={!selectedDepth ? "active" : ""}>
                    <Link to={`/menu/coffee?cate=전체`}>전체</Link>
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
            selectedCate={selectedCate}
            selectedDepth={selectedDepth}
            currentData={currentData}
            pathName={pathName}
          />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Menu;

// http://localhost:3000/menu/coffee/0/?cate=블론드로스트/035464

