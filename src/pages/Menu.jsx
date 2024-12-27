import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { DataContext } from "App";
import PrdList from "components/product/PrdList";

import 'Menu.css';

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
  const firstProducts = currentData.map((item) => item.products[0]?.name || ""); // 첫 번째 제품만 가져오기

  useEffect(() => {
    console.log("Current Path:", pathName);
    console.log("Current Data:", currentData);
    console.log("Categories:", categories);
    console.log("First Products:", firstProducts);
  }, []);

  return (
    <>
      <div id="container" className="layout_fix">
        <div className="heading">
          <span className="sub">{title}</span>
          <h2 className="tit-em">{title}</h2>
        </div>
      </div>
      <div className="menu_category">
        <ul className="cate_list layout_fix">
          {categories.map((category, idx) => (
            <li key={idx}>
              <Link to={`/menu/${pathName}/${idx}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="layout_fix">
        <PrdList />
      </div>
      <Outlet />
    </>
  );
};

export default Menu;
