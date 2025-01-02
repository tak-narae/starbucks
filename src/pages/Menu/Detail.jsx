import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./Detail.css";

const Detail = () => {
  //=== URL
  // const cate = searchParams.get("cate");
  // const id = searchParams.get("id");

  const location = useLocation();
  const { title, cateKo, product } = location.state || {};
  if(!product){
    return <div id="container" className="prd__detail" style={{textAlign:"center"}}>상품 정보가 없습니다</div>;
  }
  
  return (
    <>
      <div id="container" className="prd__detail">
        <div className="layout_fix">
          <div className="heading">
            <ul className="path">
              <li className="home"><Link to="/">홈</Link></li>
              <li>{title}</li>
              <li>{cateKo}</li>
            </ul>
            <h2 className="tit">{title}</h2>
          </div>
          <div className="prd_item">
            <div className="thumb_cont">
              <img src={`${process.env.PUBLIC_URL}/${product.img}`} alt={product.name}/>
            </div>
            <div className="info_cont">
              <h2 className="name">{product.name}</h2>
              {/* <h3 className="price">{product.price}</h3> */}
              <dl className="benefit">
                  <dt>혜택</dt>
                  <dd>
                    신규 가입시, 1만원 쿠폰증정<br/>
                    리뷰 작성시, 최대 3천원 적립금 지급<br/>
                    회원 구매시, 등급별 최대 10% 즉시할인
                  </dd>
                </dl>
              <ul className="action">
                <li>찜</li>
                <li>공유</li>
              </ul>
              <div className="price"></div>
              <div className="btn_primary">
                <Link to="/">장바구니</Link>
                <Link to="/">구매하기</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;