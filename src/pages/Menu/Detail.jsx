import React from "react";
import useProductMatch from "hooks/ProductMatch.js";
import { Link } from "react-router-dom";

import "./Detail.css";

  /* ===
    categoryLabel : 한글대분류
    category : 영문대분류
    data : 모든 데이터
    categoryData : 중분류 데이터 전체
    matchingCategory : 매치된 중분류 데이터
    foundProduct : 일치 정보 전달(setProductMatch)
    productMatch : 최종 정보(productMatch)

    productMatch : 최종 정보(productMatch)
    title : 한글대분류
    cateKo : 한글중분류
  === */

const Detail = () => {
  const { productMatch, title, cateKo } = useProductMatch(); // 커스텀 훅 호출
  if (!productMatch) {
    return <div>Loading!</div>;
  }

  return (
    <>
      <div id="container" className="prd__detail">
        <div className="layout_fix">
          Detail.jsx
          <div className="heading">
            <ul className="path">
              <li className="home">
                <Link to="/">홈</Link>
              </li>
              <li>{title}</li>
              <li>{cateKo}</li>
            </ul>
          </div>
          <div className="prd_item">
            <div className="thumb_cont">
              <img src={`${process.env.PUBLIC_URL}/${productMatch.img}`} alt={productMatch.name}/>
            </div>
            <div className="info_cont">
              <ul className="action">
                <li className="like"><button>찜</button></li>
                <li className="share"><button>공유</button></li>
              </ul>
              <h2 className="name">{productMatch.name}</h2>
              <h3 className="price">{productMatch.price.toLocaleString(1)}원</h3>
              <ul className="shipping">
                <li>
                  <span><b>배송방법</b></span>
                  <div>택배 3,000원</div>
                </li>
                <li>
                  <span><b>혜택</b></span>
                  <div>
                    신규 가입시, 1만원 쿠폰증정
                    <br />
                    리뷰 작성시, 최대 3천원 적립금 지급
                    <br />
                    회원 구매시, 등급별 최대 10% 즉시할인
                  </div>
                </li>
              </ul>
              <div className="total_price">
                <b>총 상품 금액</b>
                <h3>800,000</h3>
              </div>
              <div className="btn_primary">
                <Link to="/" className="btn_normal">장바구니</Link>
                <Link to="/" className="btn_dark">구매하기</Link>
              </div>
            </div>
          </div>
        </div> {/*.layout_fix*/} 
      </div>
    </>
  );
};

export default Detail;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// import "./Detail.css";

// const Detail = () => {
//   //=== URL
//   // const cate = searchParams.get("cate");
//   // const id = searchParams.get("id");

//   const location = useLocation();
//   const { title, cateKo, product } = location.state || {};
//   console.log(title, cateKo, product);
//   if(!product){
//     return <div id="container" className="prd__detail" style={{textAlign:"center"}}>상품 정보가 없습니다</div>;
//   }

//   return (
//     <>
//       <div id="container" className="prd__detail">
//         <div className="layout_fix">
//           <div className="heading">
//             <ul className="path">
//               <li className="home"><Link to="/">홈</Link></li>
//               <li>{title}</li>
//               <li>{cateKo}</li>
//             </ul>
//             <h2 className="tit">{title}</h2>
//           </div>
//           <div className="prd_item">
//             <div className="thumb_cont">
//               <img src={`${process.env.PUBLIC_URL}/${product.img}`} alt={product.name}/>
//             </div>
//             <div className="info_cont">
//               <h2 className="name">{product.name}</h2>
//               {/* <h3 className="price">{product.price}</h3> */}
//               <dl className="benefit">
//                   <dt>혜택</dt>
//                   <dd>
//                     신규 가입시, 1만원 쿠폰증정<br/>
//                     리뷰 작성시, 최대 3천원 적립금 지급<br/>
//                     회원 구매시, 등급별 최대 10% 즉시할인
//                   </dd>
//                 </dl>
//               <ul className="action">
//                 <li>찜</li>
//                 <li>공유</li>
//               </ul>
//               <div className="price"></div>
//               <div className="btn_primary">
//                 <Link to="/">장바구니</Link>
//                 <Link to="/">구매하기</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Detail;
