import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useProductMatch from "hooks/ProductMatch.js";

const Cart = () => {
  const { productMatch } = useProductMatch(); // 커스텀 훅 호출

  console.log(productMatch)

  const [cartQty, setCartQty] = useState(1);
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartQty"));
    if (cartData) {
      setCartQty(cartData.qty);
    }
  }, []);

  return (
    <>
      <div id="container" className="cart">
        <div className="layout_fix">
          <div className="heading">
            <h2 className="tit">장바구니</h2>
          </div>
          <table className="tb_prd">
            <caption>장바구니</caption>
            <thead>
              <tr>
                <th>선택 chk</th>
                <th>상품정보</th>
                <th>수량</th>
                <th>상품금액</th>
                <th>진행상태</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="chk">chk</td>
                <td>
                  <Link onClick={e => e.preventDefault()}
                    style={{ display: "inline-flex", alignItems: "center", gap: "20px", }}>
                    <div style={{ width: "80px", height: "80px", background: "#222", }}></div>
                    <span>홀리데이 프렌즈 플레이트 커트러리 세트</span>
                  </Link>
                </td>
                <td>
                  <div className="btn_qty">
                    <button className="minus">-</button>
                    <input type="tel" className="qty" value={cartQty} maxLength="4" readOnly />
                    <button className="plus">+</button>
                  </div>
                </td>
                <td>
                  {/* <div className="total_price">{productMatch}</div> */}
                </td>
                <td>
                  <b>상품준비중</b>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cart;