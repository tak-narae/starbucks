import React, { useContext, useEffect, useState, useMemo } from "react";
import { Outlet, Link } from "react-router-dom";
import { DataContext } from "App";
import PrdList from "components/product/PrdList";
import useQueryParams from 'hooks/useQueryParams';

import "./Menu.css";

const Menu = () => {
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
              const isActive = selectedCate === String(idx); // 선택된 cate 확인
              return (
                <li key={idx} className={isActive ? "active" : ""}>
                  <Link to={`/menu/${pathName}?cate=${idx}`}>{category}</Link>
                </li>
              );
            })}
          </ul>
          {title === "커피" && (
            <div className="menu_category depth">
              <ul className="cate_list layout_fix">
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
          )}
        </div>
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

