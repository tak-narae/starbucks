import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { DataContext } from "App";
import PrdList from "components/product/PrdList";

import "Menu.css";

const Menu = () => {
  const { coffee, beverage, product, food } = useContext(DataContext);
  const location = useLocation(); // 현재 URL 경로 가져오기
  const pathName = location.pathname.split("/").pop(); // 마지막 경로 추출

  const titleMap = {
    coffee: "커피",
    beverage: "음료",
    product: "제품",
    food: "푸드",
  };

  const dataMap = {
    coffee,
    beverage,
    product,
    food,
  };

  const title = titleMap[pathName];
  const currentData = dataMap[pathName] || {};
  const categories = currentData.map((item) => item.category || "");
  const [labels, setLabels] = useState([]);

  const getLabels = (currentData) => {
    const newLabels = [];
    currentData.forEach((item) => {
      item.products.forEach((product) => {
        if (!newLabels.includes(product.label)) {
          newLabels.push(product.label);
        }
      });
    });
    setLabels(newLabels);
  };

  useEffect(() => {
    // console.log("Current Path:", pathName);
    // console.log("Current Data:", currentData);
    // console.log("Categories:", categories);
    // console.log("Products:", labels);
    getLabels(currentData);
  }, [currentData]);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      <div id="container">
        <div className="heading layout_fix">
          <span className="sub">{title}</span>
          <h2 className="tit-em">{title}</h2>
        </div>
        <div className="menu_category">
          <ul className="cate_list layout_fix">
            {categories.map((category, idx) => {
              const categoryPath = `/menu/${pathName}?cate=${idx}`;
              return (
                <li key={idx} className={isActive(categoryPath) ? "active" : ""}>
                  <Link to={categoryPath}>{category}</Link>
                </li>
              );
            })}
          </ul>
          {title === "커피" && (
            <div className="menu_category depth">
              <ul className="cate_list layout_fix">
                <li className={location.pathname === `/menu/coffee` ? "active" : ""}>
                  <Link to={`/menu/coffee?cate=${categories.idx}&depth=전체`}>
                    전체
                  </Link>
                </li>
                {labels.map((label, idx) => {
                  const isActive = location.pathname.includes(`/menu/coffee/${label}`);
                  return (
                    <li key={idx}>
                      <Link to={`/menu/${pathName}?cate=${categories.idx}&depth=${label}`}>
                        {label}
                      </Link>
                    </li>
                  )})}
              </ul>
            </div>
          )}
        </div>
        <div className="layout_fix">
          <PrdList />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Menu;

// http://localhost:3000/menu/coffee/0/?cate=블론드로스트/035464
