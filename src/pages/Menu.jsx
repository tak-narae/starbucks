import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DataContext } from "App";
import PrdList from "components/product/PrdList";

const Menu = () => {
  const { coffee, setCoffee } = useContext(DataContext);
  const { beverage, setBeverage } = useContext(DataContext);
  const { product, setProduct } = useContext(DataContext);
  const { food, setFood } = useContext(DataContext);

  const location = useLocation(); // 현재 URL 경로 가져오기
  const pathName = location.pathname.split("/").pop(); // 마지막 경로 추출
  const titleMap = {
    coffee: "커피",
    beverage: "음료",
    product: "제품",
    food: "푸드",
  };
  const title = titleMap[pathName];

  useEffect(() => {});
  return (
    <>
      <div id="container" className="layout_fix">
        <div className="heading">
          <span className="sub">{title}</span>
          <h2 className="tit-em">{title}</h2>
        </div>
      </div>
      <div className="">

      </div>
      <div className="layout_fix">
        <PrdList />
      </div>
      <Outlet />
    </>
  );
};

export default Menu;
