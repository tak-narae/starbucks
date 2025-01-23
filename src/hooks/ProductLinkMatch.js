import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductLinkMatch = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    dataCoffee: [],
    dataBeverage: [],
    dataProduct: [],
    dataFood: [],
  });

  useEffect(() => {
    const fetchData = () => {
      axios.get("https://raw.githubusercontent.com/deliondane/db/main/db.json")
        .then((res) => {
          // console.log("++res++", res);
          const { coffee, beverage, product, food } = res.data; //객체 구조 분해 할당
          setData({
            dataCoffee: coffee.map((el, idx) => ({
              categoryEn: "coffee",
              cateNum: idx,
              ...el,
            })),
            dataBeverage: beverage.map((el, idx) => ({
              categoryEn: "beverage",
              cateNum: idx,
              ...el,
            })),
            dataProduct: product.map((el, idx) => ({
              categoryEn: "product",
              cateNum: idx,
              ...el,
            })),
            dataFood: food.map((el, idx) => ({
              categoryEn: "food",
              cateNum: idx,
              ...el,
            })),
          });
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (document.querySelector(".prd_data")) {
      document.querySelectorAll(".prd_data .name").forEach((nameEl) => {
        const prdName = nameEl.textContent;
        // console.log(prdName);

        const allData = [...data.dataCoffee,...data.dataBeverage,...data.dataProduct,...data.dataFood,];
        // console.log(allData);
        const itemMatch = allData.flatMap(el => el.products.map(data => ({
          categoryEn: el.categoryEn,
          cateNum: el.cateNum,
          ...data,
        }) )).find(item => item.name === prdName);

        // console.log(nameEl.closest("a"));
        // console.log(itemMatch);
      
        nameEl.closest("a").setAttribute("href",`/menu/detail/${itemMatch.categoryEn}?cate=${itemMatch.cateNum}&id=${itemMatch.id}`);
        nameEl.closest("a").addEventListener("click",function(e){
          e.preventDefault();
          navigate(`/menu/detail/${itemMatch.categoryEn}?cate=${itemMatch.cateNum}&id=${itemMatch.id}`);
        })
      });
    }
  }, [data]);

};

export default ProductLinkMatch;
