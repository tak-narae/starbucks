// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProductLinkMatch = () => {
//   // const useProductLinkMatch = () => {
//   const [productLink, setProductLink] = useState();

//   // const [ productArr, setProductArr ] = useState([]);
//   // setProductArr(el => [...el, ...coffee, ...beverage, ...product, ...food])

//   // const [coffeeData, setCoffeeData] = useState([]);
//   // const [beverageData, setBeverageData] = useState([]);
//   // const [productData, setProductData] = useState([]);
//   // const [foodData, setFoodData] = useState([]);

//   const [data, setData] = useState({
//     dataCoffee: [],
//     dataBeverage: [],
//     dataProduct: [],
//     dataFood: [],
//   });

//   useEffect(() => {
//     const fetchData = () => {
//       axios.get("https://raw.githubusercontent.com/deliondane/db/main/db.json")
//         .then((res) => {
//           const { coffee, beverage, product, food } = res.data; //객체 구조 분해 할당
//           setData({
//             dataCoffee: coffee.map((el, idx) => ({
//               categoryEn: "coffee",
//               cateNum: idx,
//               ...el,
//             })),
//             dataBeverage: beverage.map((el, idx) => ({
//               categoryEn: "beverage",
//               cateNum: idx,
//               ...el,
//             })),
//             dataProduct: product.map((el, idx) => ({
//               categoryEn: "product",
//               cateNum: idx,
//               ...el,
//             })),
//             dataFood: food.map((el, idx) => ({
//               categoryEn: "food",
//               cateNum: idx,
//               ...el,
//             })),
//           });
//         })
//         .catch((err) => console.error(err));
//     };

//     fetchData();
//   }, []);

//   const newLinks = {};

  

//   useEffect(() => {
//     if (document.querySelector(".prd_data")) {
//       document.querySelectorAll(".prd_data .name").forEach((nameEl) => {
//         const prdName = nameEl.textContent;
//         // console.log(prdName);

//         const allData = [...data.dataCoffee,...data.dataBeverage,...data.dataProduct,...data.dataFood,];
//         // console.log(allData);
//         const itemMatch = allData.flatMap(el => el.products.map(data => ({
//           categoryEn: el.categoryEn,
//           cateNum: el.cateNum,
//           ...data,
//         }))).find(item => item.name === prdName);
      
//         nameEl.closest("a").setAttribute("to",`/menu/detail/${itemMatch.categoryEn}?cate=${itemMatch.cateNum}&id=${itemMatch.id}`);
//         nameEl.closest("a").addEventListener("click",function(){
//           console.log("click");
//         })

  
//       });
//     }
//   }, [data]);

//   return links;
//   // return { productLink };
// };

// export default ProductLinkMatch;
// // export default useProductLinkMatch;










// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProductLinkMatch = () => {
//   const [data, setData] = useState({
//     dataCoffee: [],
//     dataBeverage: [],
//     dataProduct: [],
//     dataFood: [],
//   });

//   const [links, setLinks] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("https://raw.githubusercontent.com/deliondane/db/main/db.json");
//         const { coffee, beverage, product, food } = res.data;
        
//         const allData = {
//           dataCoffee: coffee.map((el, idx) => ({ categoryEn: "coffee", cateNum: idx, ...el })),
//           dataBeverage: beverage.map((el, idx) => ({ categoryEn: "beverage", cateNum: idx, ...el })),
//           dataProduct: product.map((el, idx) => ({ categoryEn: "product", cateNum: idx, ...el })),
//           dataFood: food.map((el, idx) => ({ categoryEn: "food", cateNum: idx, ...el })),
//         };
        
//         setData(allData);

//         const newLinks = {};

//         Object.values(allData).forEach(category => {
//           category.forEach(el => {
//             el.products.forEach(product => {
//               newLinks[product.name] = `/menu/detail/${el.categoryEn}?cate=${el.cateNum}&id=${product.id}`;
//             });
//           });
//         });

//         setLinks(newLinks);

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return links;
// };

// export default ProductLinkMatch;







import React, { useEffect, useState } from "react"; 
import axios from "axios";

const ProductLinkMatch = () => {
  useEffect(() => {
    const fetchDataAndSetLinks = async () => {
      try {
        const res = await axios.get("https://raw.githubusercontent.com/deliondane/db/main/db.json");
        const { coffee, beverage, product, food } = res.data;
        const allData = { coffee, beverage, product, food };

        document.querySelectorAll(".prd_data .name").forEach(nameEl => {
          const prdName = nameEl.textContent;
          
          const itemMatch = Object.values(allData).flatMap(category => 
            category.flatMap((el, idx) => 
              el.products.map(product => ({
                categoryEn: category === coffee ? "coffee" : 
                            category === beverage ? "beverage" : 
                            category === product ? "product" : "food",
                cateNum: idx,
                ...product,
              }))
            )
          ).find(item => item.name === prdName);

          if (itemMatch) {
            const link = `/menu/detail/${itemMatch.categoryEn}?cate=${itemMatch.cateNum}&id=${itemMatch.id}`;
            nameEl.closest("a").setAttribute("href", link);
            console.log("Link set to:", link); // 디버깅용 로그
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndSetLinks();
  }, []);

  return null; // DOM 조작만 수행하고, 별도로 데이터를 반환하지 않음
};

export default ProductLinkMatch;
